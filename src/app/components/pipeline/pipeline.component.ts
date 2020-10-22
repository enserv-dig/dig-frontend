import { Component, OnInit } from '@angular/core';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent implements OnInit {
  pipelines: any;

  constructor(private digService: DigService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.digService.getAllPipelines().subscribe(data => {
      this.pipelines = data;
    })
  }

}
