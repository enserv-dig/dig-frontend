import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DigService } from 'src/app/services/dig.service';
import { DigSelectComponent } from '../dig-select/dig-select.component';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit {

  workflows: any;

  constructor(private modalController: ModalController, private digService: DigService) { }

  ngOnInit() {
    this.digService.getAllWorkflows().subscribe(data => {
      this.workflows = data;
    })
  }


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
