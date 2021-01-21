import { Component, OnInit } from '@angular/core';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss'],
})
export class FacilityComponent implements OnInit {
  facilities: any;

  constructor(private digService: DigService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.digService.getAllFacilities().subscribe(data => {
      this.facilities = data;
      console.log(data);
    })
  }

  toggleClicked(event, facility) {
      this.digService.updateFacility(+facility.facilityId).subscribe(data => {
        this.ionViewWillEnter();
      });
  }

}
