import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Facility } from 'src/app/commons/facility';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-facility-modal',
  templateUrl: './facility-modal.component.html',
  styleUrls: ['./facility-modal.component.scss'],
})
export class FacilityModalComponent implements OnInit {

  clients: any;

  constructor(private digService: DigService, private modalController: ModalController, private toastController: ToastController) { }

  ngOnInit() {
    this.digService.getAllClients().subscribe(data => {
      this.clients = data;
      this.clients = this.clients.filter(cl => {
        return cl.activeClient === true;
      })
    });
  }

  submitFacility(facilityForm) {
    var facility = new Facility(facilityForm.value.facilityName, facilityForm.value.facilityStatus, facilityForm.value.client);
    this.digService.createFacility(facility.facilityName, facility.facilityStatus, facility.client).subscribe(data => {
      this.modalController.dismiss().then(data => {
          this.presentToast();
      });
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Facility created successfuly',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

}
