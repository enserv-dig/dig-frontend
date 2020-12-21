import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { DigService } from 'src/app/services/dig.service';
import { DigModalComponent } from './dig-modal/dig-modal.component';

@Component({
  selector: 'app-dig',
  templateUrl: './dig.component.html',
  styleUrls: ['./dig.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DigComponent implements OnInit {
  digs = [];
  rows: any;
  columns: any;
  workflows: any;

  constructor(private digService: DigService,
              private toastController: ToastController,
              private modalController: ModalController) {


    this.columns = [
       {name: "select"},
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
    this.digService.getNonAssignedDigs().subscribe(data => {
      this.rows = data;
      console.log(this.rows.length);
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
    this.digs = [];
  }

  checked(dig, event) {
    if(event.target.checked) {
      this.digs.push(dig);
    } else if(!event.target.checked) {
      this.digs = this.digs.filter(item => {
        return item.digId !== dig.digId;
      })
    }

  }

  createWorkflow() {
    this.openDigModal();
  }


  async presentToast(text, col: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: col
    });
    toast.present();
  }

  async openDigModal() {
    const modal = await this.modalController.create({
      component: DigModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N',
        'digs': this.digs
      }
    });
    return await modal.present();    
  }


}
