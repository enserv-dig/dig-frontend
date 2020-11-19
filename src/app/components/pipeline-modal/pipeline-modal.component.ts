import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Pipeline } from 'src/app/commons/pipeline';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-pipeline-modal',
  templateUrl: './pipeline-modal.component.html',
  styleUrls: ['./pipeline-modal.component.scss'],
})
export class PipelineModalComponent implements OnInit {
  facilities: any;

  constructor(private digService: DigService, private modalController: ModalController, private toastController: ToastController) { }

  ngOnInit() {
    this.digService.getAllFacilities().subscribe(data => {
      this.facilities = data;
      this.facilities = this.facilities.filter(fa => {
        return fa.activeFacility === true;
      })
    })
  }

  submitPipeline(pipelineForm) {
    var pipeline = new Pipeline(pipelineForm.value.pipelineName, pipelineForm.value.pipelineStatus, pipelineForm.value.facility);    
    this.digService.createPipeline(pipeline.pipelineName, pipeline.pipelineStatus, Number(pipeline.facilityId)).subscribe(data => {
      this.modalController.dismiss().then(data => {
        this.presentToast();
      })
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Pipeline created successfuly',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }


}
