import { Component, OnInit } from '@angular/core';
import { Pipeline } from 'src/app/commons/pipeline';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-pipeline-modal',
  templateUrl: './pipeline-modal.component.html',
  styleUrls: ['./pipeline-modal.component.scss'],
})
export class PipelineModalComponent implements OnInit {
  facilities: any;

  constructor(private digService: DigService) { }

  ngOnInit() {
    this.digService.getAllFacilities().subscribe(data => {
      this.facilities = data;
    })
  }

  submitPipeline(pipelineForm) {
    var pipeline = new Pipeline(pipelineForm.value.pipelineName, pipelineForm.value.pipelineStatus, pipelineForm.value.facility);    
    this.digService.createPipeline(pipeline.pipelineName, pipeline.pipelineStatus, Number(pipeline.facilityId)).subscribe(data => {
    });
  }


}
