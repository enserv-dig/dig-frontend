import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/commons/client';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  clients: any;

  constructor(private digService: DigService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.digService.getAllClients().subscribe(data => {
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


}
