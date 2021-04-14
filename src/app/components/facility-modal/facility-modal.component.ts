import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Facility } from 'src/app/commons/facility';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-facility-modal',
  templateUrl: './facility-modal.component.html',
  styleUrls: ['./facility-modal.component.scss'],
})
export class FacilityModalComponent implements OnInit {

  clients: any;

  constructor(private digService: DigService,
              private modalController: ModalController,
              private toastController: ToastController,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.digService.getAllClients().subscribe(data => {
      this.clients = data;
      this.clients = this.clients.filter(cl => {
        return cl.activeClient === true;
      })
    });
  }

  submitFacility(facilityForm) {
    this.presentLoading();
    var facility = new Facility(facilityForm.value.facilityName, facilityForm.value.facilityStatus, facilityForm.value.client);
    this.digService.createFacility(facility.facilityName, facility.facilityStatus, facility.client).subscribe(data => {
      this.loadingController.dismiss();
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

  closeModal() {
    this.modalController.dismiss();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'creating a new facility...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
