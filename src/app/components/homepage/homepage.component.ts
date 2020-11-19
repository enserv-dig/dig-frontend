import { Component, OnInit } from '@angular/core';
import { Dig } from 'src/app/commons/dig';
import { DigService } from 'src/app/services/dig.service';
import {IonicSafeString, ModalController, ToastController} from '@ionic/angular';
import { ClientModalComponent } from './client-modal/client-modal.component';
import { FacilityModalComponent } from '../facility-modal/facility-modal.component';
import { PipelineModalComponent } from '../pipeline-modal/pipeline-modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  constructor(private digService: DigService, private modalController: ModalController, private toastController: ToastController) { }

  ngOnInit() {}

  readCsv(files: FileList) {
  let data: any;
  if(files && files.length > 0) {
     let file : File = files.item(0); 
       let reader: FileReader = new FileReader();
       reader.readAsText(file);
       reader.onload = (e) => {
          let csv: string = reader.result as string;
          let lines = csv.split('\n');
          data = lines.slice(1);
          this.digService.uploadCsv(data).subscribe(res => {
            this.presentToast('CSV parsing complete', 'success');
          },error => {
            this.presentToast('CSV parsing failed', 'danger');
          } );
        }
      
       }
    }

    async openClientModal() {
      const modal = await this.modalController.create({
        component: ClientModalComponent,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });
      return await modal.present();    
    }

    async openFacilityModal() {
      const modal = await this.modalController.create({
        component: FacilityModalComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });
      return await modal.present();   
   }

   async openPipelineModal() {
    const modal = await this.modalController.create({
      component: PipelineModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();   
 }

 async presentToast(text, col: string) {
  const toast = await this.toastController.create({
    message: text,
    duration: 2000,
    color: col
  });
  toast.present();
}



}
