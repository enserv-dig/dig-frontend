import { Component, OnInit } from '@angular/core';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  digs: any;

  constructor(private digService: DigService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.digService.getAllDigs().subscribe(data => {
      this.digs = data;
      console.log(this.digs);
    })
    
  }
}
