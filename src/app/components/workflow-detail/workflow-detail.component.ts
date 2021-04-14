import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-workflow-detail',
  templateUrl: './workflow-detail.component.html',
  styleUrls: ['./workflow-detail.component.scss'],
})
export class WorkflowDetailComponent implements OnInit {
  repairValueSet: boolean;
  workflowId: Number;
  workflow: any;
  paperworks: any;
  paperworkTypes: any;
  paperWorkTypeSelected = null;
  ppType;
  step = 1;
  digs: [];
  formsY = ["Composite Type A Sleeve", "Recoating/Wrapping", "Type B Sleeve", "Pipe Replacement / Cutout" ];
  formsN = ["Standard Excavation Checklist"];

  

  constructor(private route: ActivatedRoute, private digService: DigService,
    private renderer: Renderer2, private el: ElementRef, private loadingController: LoadingController) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.presentLoading();
    this.route.paramMap.subscribe(data => {
      if (this.route.snapshot.paramMap.has('id')) {
        this.workflowId = +this.route.snapshot.paramMap.get('id');
        this.digService.getWorkflow(this.workflowId).subscribe(data => {
          console.log(data);
          this.workflow = data;
          this.digs = this.workflow.digs;
          this.step = this.workflow.step;

          this.loadingController.dismiss();

          if(this.step==3){
          this.digService.getPaperworksByType(+this.workflow.paperworkType.paperworkTypeId).subscribe(data => {
            this.paperworks = data;
              
            })
          }

        })
      }
    })

    this.digService.getAllPaperworkTypes().subscribe(data => {
      this.paperworkTypes = data;
      console.log(this.paperworkTypes);
    })

  }

  setRepairY() {
    this.step += 1;

    this.digService.setStepToWorkflow(2, +this.workflowId).subscribe(data => {
      this.digService.setRepairStatus('yes', this.workflowId).subscribe(data => {
        this.paperworkTypes = this.paperworkTypes.filter(data => {
          return data.paperworkTypeRepair == true;
        })
        this.ionViewWillEnter();
      });
    });


  }

  setRepairN() {
    this.step +=1;

    this.digService.setStepToWorkflow(2, +this.workflowId).subscribe(data => {
      this.digService.setRepairStatus('no', this.workflowId).subscribe(data => {
        this.ionViewWillEnter();
        console.log("no");
        
        this.paperworkTypes = this.paperworkTypes.filter(data => {
          return data.paperworkTypeRepair == false;
        })
      });
    });


  }

  paperworkToggled(event, paperwork) {
        if(!event.target.checked) {
          this.digService.assignPaperworkToWorkflow(this.workflow.workflowId, paperwork.paperworkId).subscribe(data => {
            this.digService.setStepToWorkflow(3, +this.workflowId).subscribe(data => {

            });
                  this.ionViewWillEnter();

          })
        } else {
          this.digService.removePaperworkFromWorkflow(this.workflow.workflowId, paperwork.paperworkId).subscribe(data => {
          })
        }
  }

  checkPaperworkIncluded(paperwork) {
    var flag = false;
    this.workflow?.paperworks.map(data => {
      if(data.paperworkId == paperwork.paperworkId) {
        flag = true;
      }
    })
    return flag;
  }

  ppTypeSelected(event) {
    console.log("tetstst");

    this.digService.getPaperworksByType(+this.ppType).subscribe(data => {
      console.log(data);
      this.paperworks = data;
      this.step += 1;

      this.digService.setPPTypeToWorkflow(this.ppType, +this.workflowId).subscribe(data => {
        this.digService.setStepToWorkflow(3, +this.workflowId).subscribe(res => {
        });      
      })
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'loading workflow details...',
    });
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
