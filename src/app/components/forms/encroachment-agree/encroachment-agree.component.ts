import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatePickerComponent, IDayCalendarConfig } from 'ng2-date-picker';
import { DigService } from 'src/app/services/dig.service';
@Component({
  selector: 'app-encroachment-agree',
  templateUrl: './encroachment-agree.component.html',
  styleUrls: ['./encroachment-agree.component.scss'],
})
export class EncroachmentAgreeComponent implements OnInit {
  @ViewChild("dateFromDp") public dateFromDp: DatePickerComponent; 

  public filterForm: FormGroup;
  public displayDate;
  digId: any;

  public dayPickerConfig = <IDayCalendarConfig>{
    locale: "en",
    format: "MM.DD.YYYY",
    monthFormat: "MMMM, YYYY",
    firstDayOfWeek: "mo",
    showNearMonthDays: true,
    enableMonthSelector: true,
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: true,
  };
  
  constructor(private fb: FormBuilder, private digService: DigService, private route: ActivatedRoute, private router: Router, private toastController: ToastController) {
    this.createForm();
   }

   ngOnInit() {
    this.filterForm.get("dateFrom").valueChanges.subscribe(value => {
      this.dayPickerConfig = {
        min: value,
        ...this.dayPickerConfig
      }
    });
  }

  ionViewWillEnter(){
    this.route.paramMap.subscribe(data => {
      if (this.route.snapshot.paramMap.has('id')) {
        this.digId = +this.route.snapshot.paramMap.get('id');
        console.log(this.digId);
  }})
}

private createForm(): void {
  this.filterForm = this.fb.group({
    digId: this.digId,
    dateFrom: new FormControl(),
    companyName: new FormControl('IGT'),
    sectionNumber: new FormControl('11209'),
    legalDescription: new FormControl('desc goes here..'),
    county: new FormControl('Ouchita'),
    state: new FormControl('LA'),
    alignmentSheetNumber: new FormControl('1134'),
    milePost: new FormControl('12'),
    tractNumber: new FormControl('55'),
    encroachmentType: new FormControl('accessRoad'),

    ticketNumber: new FormControl('445'),
    callPerson: new FormControl('Sagar'),
    dispatchPerson: new FormControl('Angel'),
    activity: new FormControl('probedLine'),
    remarks: new FormControl('no remarks'),
    followUpAction: new FormControl('no'),
    explaination: new FormControl('no exp'),

    personMet: new FormControl('contractor'),
    partyName: new FormControl('John Sager'),
    partyTitle: new FormControl('Chief Contractor'),
    partyCompany: new FormControl('Weld n weld cpr'),
    partyAddress: new FormControl('1111 rainbow dr'),
    partyCity: new FormControl('Orlando'),
    partyState: new FormControl('FL'),
    partyZip: new FormControl('223473'),
    partyPhone: new FormControl('3224555673'),

    referencePoint: new FormControl('340 road'),
    referencePointEsn: new FormControl('33 + 7.90'),
    distAndDirFromReference: new FormControl('33 ft North'),
    calcEsnCrossing: new FormControl('Test value'),
    facilitySize: new FormControl('1122 ft'),
    encased: new FormControl('yes'),
    encaseSize: new FormControl('NA'),
    casingType: new FormControl('steel'),
    coatingType: new FormControl('coatingType'),

    pipelineCoatingType: new FormControl('Copper'),
    pipelineCoatingCondition: new FormControl('well'),
    psGround: new FormControl('11.11'),
    psDitch: new FormControl('32.22'),
    pipelineCondition: new FormControl('likeNew'),

    companyContact: new FormControl('1123 NE Plea Street'),
    emergency: new FormControl('222 986 6751'),
    companyRep: new FormControl('RT'),
    phoneNumber: new FormControl('260 764 2101'),
    encroachingPartyRep: new FormControl('WALT MIC'),
    personMetRep: new FormControl('John Edwards')
  });
}

submit(form) {
  this.digService.createEncroachmentAgree(form.value, this.digId).subscribe(data => {
    this.presentToast("Form filled successfully", 'success').then(data => this.router.navigateByUrl('/workspace/'+this.digId));
  })  
}

async presentToast(text, col: string) {
  const toast = await this.toastController.create({
    message: text,
    duration: 2000,
    color: col
  });
  toast.present();
}





}
