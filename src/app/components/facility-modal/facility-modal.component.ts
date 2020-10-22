import { Component, OnInit } from '@angular/core';
import { Facility } from 'src/app/commons/facility';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-facility-modal',
  templateUrl: './facility-modal.component.html',
  styleUrls: ['./facility-modal.component.scss'],
})
export class FacilityModalComponent implements OnInit {

  clients: any;

  constructor(private digService: DigService) { }

  ngOnInit() {
    this.digService.getAllClients().subscribe(data => {
      this.clients = data;
    });
  }

  submitFacility(facilityForm) {
    var facility = new Facility(facilityForm.value.facilityName, facilityForm.value.facilityStatus, facilityForm.value.client);
    console.log(facility);
    this.digService.createFacility(facility.facilityName, facility.facilityStatus, facility.client).subscribe(data => {
    });
  }

}
