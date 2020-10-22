import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DigSelectComponent } from '../dig-select/dig-select.component';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}


  async openDigSelectModal() {
    const modal = await this.modalController.create({
      component: DigSelectComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();   
 }

 cre(data) {
  console.log(data);
 }

}
