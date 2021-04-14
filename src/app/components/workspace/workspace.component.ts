import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  digs: any;

  constructor(private digService: DigService,
              private loadingController: LoadingController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.presentLoading();
    this.digService.getDigsWithWork().subscribe(data => {
      this.digs = data;
      this.loadingController.dismiss();
      console.log(this.digs);
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'loading workspace...',
    });
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
