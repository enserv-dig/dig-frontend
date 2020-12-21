import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-dig-modal',
  templateUrl: './dig-modal.component.html',
  styleUrls: ['./dig-modal.component.scss'],
})
export class DigModalComponent implements OnInit {

  workflows: any;
  @Input() digs: any;
  nameField: any;

  constructor(private digService: DigService, private toastController: ToastController, private modalController: ModalController) { }

  ngOnInit() {
    this.digService.getAllWorkflows().subscribe(data => {
      this. workflows = data;
      console.log(this.workflows);
    })
  }

  ionViewWillEnter() {
    this.digService.getAllWorkflows().subscribe(data => {
      this. workflows = data;
      console.log(this.workflows);
    })
  }

  submitWorkflow(form) {
    console.log(form.controls.workflowName.value);
    if(form.controls.workflowName.value.length != 0 ){
      this.createNewWorkflow(form.controls.workflowName.value);
      form.controls.workflowSelect.disable();
    } 
    else if(form.controls.workflowSelect.value.length != 0 ) {
      this.assignToExistingWorkflow(form.controls.workflowSelect.value);
      form.controls.workflowName.disable();
    }
  }

  // lockForm(form) {
  //   if(form.controls.workflowName.value.length != 0 ){
  //     this.createNewWorkflow(form.controls.workflowName.value);
  //     form.controls.workflowSelect.disable();
  //   } 
  //   else if(form.controls.workflowSelect.value.length != 0 ) {
  //     this.assignToExistingWorkflow();
  //     form.controls.workflowName.disable();
  //   }
  // }

  createNewWorkflow(name) {
    console.log("new create");
    var ids = [];
    this.digs.forEach(dig => {
      ids.push(dig.digId);
    })
    this.digService.createWorkflow(name, ids).subscribe(wfs => {
        this.reset();
        this.presentToast(`workflow ${name} created successfully`,'success');
        this.modalController.dismiss();

    })

  }

  assignToExistingWorkflow(wf) {
    console.log(wf);
    var ids = [];
    this.digs.forEach(dig => {
      ids.push(dig.digId);
    })
    console.log("assign to existing");
    this.digService.assignDigToWorkflow(wf,ids).subscribe(data => {
      this.reset();
      this.presentToast(`workflow ${wf} edited successfully`,'success');
      this.modalController.dismiss();

    })
  }

  async presentToast(text, col: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: col
    });
    toast.present();
  }

  reset() {
    this.ionViewWillEnter();
    this.digs = [];
  }


}
