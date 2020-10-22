import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-dig',
  templateUrl: './dig.component.html',
  styleUrls: ['./dig.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DigComponent implements OnInit {
  digs: any;
  rows: any;
  columns: any;

  constructor(private digService: DigService) {
    // this.columns = [
    //   { name: 'Name' },
    //   { name: 'Company' },
    //   { name: 'Genre' }
    // ];

    this.columns = [
       { name: "anomalyId"},
       { name: "inspectionYear"},
       { name: "feature"},
       { name: "wheelCount"},
       { name: "stationNumber"},
       { name: "depthPct"},
       { name: "wtNom"},
       { name: "asCalledLengthIn"},
       { name: "asCalledWidthIn"},
       { name: "orientation"},
       { name: "erfMod831g"},
       { name: "erfB31g"},
       { name: "erfRstreng"},
       { name: "pctMaxOpPress"},
       { name:"distUsWeld"},
       { name:"distDsWeld"},
       { name:"usAgm"},
       { name:"distUsAgm"},
       { name: "dsAgm"},
       { name:"jointLength"},
       { name:"seamOrientation"},
       { name:"adjacentLongSeam"},
       { name:"longSeamInteraction"},
       { name:"comments"},
       { name: "latitude"},
       { name:"longitude"},
       { name:"altitude"},
       { name:"pprimeMod831g"},
       { name:"pprimeB31g"},
       { name:"pprimeRstreng"},
    ]

   }

  ngOnInit() {}
  
  ionViewWillEnter() {
    this.digService.getAllDigs().subscribe(data => {
      this.rows = data;
    })
    
  }

  filterDigData(form) {
    var attr = form.value.attribute;
    var val = form.value.value;

    this.rows = this.rows.filter(rw => {
      return rw[attr] == val;
    });

  }

  reset() {
    this.ionViewWillEnter();
  }


}
