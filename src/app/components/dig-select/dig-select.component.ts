import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-dig-select',
  templateUrl: './dig-select.component.html',
  styleUrls: ['./dig-select.component.scss'],
})
export class DigSelectComponent implements OnInit {
  digs: any;
  selectedDigs = [];
  @Output() cre = new EventEmitter();

  constructor(private digService: DigService) { }

  ngOnInit() {
    this.digService.getAllDigs().subscribe(data => {
      this.digs = data;
    })
  }

  ionViewDidEnter() {
    this.digService.getAllDigs().subscribe(data => {
      this.digs = data;
    });
  }

  add(item) {
    this.selectedDigs.push(item);
    this.cre.emit({item});
    console.log(this.selectedDigs);
  }

  searchDigs(event) {
    var key = event.target.value;
    if(key.length > 0) {
    this.digs = this.digs.filter(data => {
      console.log(data.anomalyId);
      console.log(key)
      return data.anomalyId == key;
    })
    key = "";
  } else {
    this.ionViewDidEnter();
  }
}

}
