import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Client } from 'src/app/commons/client';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss'],
})
export class ClientModalComponent implements OnInit {
  status: any;

  constructor(private modalController: ModalController,
              private digService: DigService,
              private toastController: ToastController,
              private loadingController: LoadingController) { }

  ngOnInit() {
  }

  submitClient(clientForm) {
    this.presentLoading();
    var client: Client = new Client(clientForm.value.clientName, clientForm.value.clientStatus);
    this.digService.createClient(clientForm.value.clientName, status).subscribe(data => {
      this.loadingController.dismiss();
      this.modalController.dismiss();
      this.presentToast();
    });
  }

  selectOption(option) {
    status = option;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Client created successfuly',
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
      message: 'creating a new client...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
