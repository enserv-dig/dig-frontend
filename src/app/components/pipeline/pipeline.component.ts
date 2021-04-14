import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent implements OnInit {
  pipelines: any;

  constructor(private digService: DigService,
              private loadingController: LoadingController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.presentLoading();
    this.digService.getAllPipelines().subscribe(data => {
      this.loadingController.dismiss();
      this.pipelines = data;
    })
  }

  toggleClicked(event, pipeline) {
    this.digService.updatePipeline(+pipeline.pipelineId).subscribe(data => {
      this.ionViewWillEnter();
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'loading pipelines...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
