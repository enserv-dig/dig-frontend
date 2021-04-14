import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Client } from 'src/app/commons/client';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  clients: any;

  constructor(private digService: DigService, 
              private loadingController: LoadingController) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.presentLoading();
    this.digService.getAllClients().subscribe(data => {
      this.loadingController.dismiss();
      console.log(data);
      this.clients = data;
    })
  }

  toggleClicked(event, client) {
  console.log(client);
    this.digService.updateClient(+client.clientId).subscribe(data => {
      this.ionViewWillEnter();
    });

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'loading clients...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


}
