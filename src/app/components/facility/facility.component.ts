import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss'],
})
export class FacilityComponent implements OnInit {
  facilities: any;

  constructor(private digService: DigService, 
              private loadingController: LoadingController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.presentLoading();
    this.digService.getAllFacilities().subscribe(data => {
      this.loadingController.dismiss();
      this.facilities = data;
      console.log(data);
    })
  }

  toggleClicked(event, facility) {
      this.digService.updateFacility(+facility.facilityId).subscribe(data => {
        this.ionViewWillEnter();
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'loading facilities...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
