import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Client } from 'src/app/commons/client';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss'],
})
export class ClientModalComponent implements OnInit {
  status: any;

  constructor(private modalController: ModalController, private digService: DigService) { }

  ngOnInit() {
  }

  submitClient(clientForm) {
    var client: Client = new Client(clientForm.value.clientName, clientForm.value.clientStatus);
    this.digService.createClient(clientForm.value.clientName, status).subscribe(data => {
    });
  }

  selectOption(option) {
    status = option;
  }

}
