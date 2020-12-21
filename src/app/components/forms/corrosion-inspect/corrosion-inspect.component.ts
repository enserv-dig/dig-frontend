import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatePickerComponent, IDayCalendarConfig } from 'ng2-date-picker';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-corrosion-inspect',
  templateUrl: './corrosion-inspect.component.html',
  styleUrls: ['./corrosion-inspect.component.scss'],
})
export class CorrosionInspectComponent implements OnInit {
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
    segmentName: new FormControl("Seg A1"),
    inspectorQualified: new FormControl("yes"),
    supervisorApproved: new FormControl('yes'),

    removeReason: new FormControl('Defects in prod'),
    location: new FormControl('waterBody'),
    locationName: new FormControl('Murtyl Beach Line'),
    inWayOf: new FormControl('railroad'),
    city: new FormControl('Irving'),
    county: new FormControl('Datuls'),
    state: new FormControl('Texas'),

    cathodicProtection: new FormControl('yes'),
    pipeReading: new FormControl('1.34'),
    bareOrCoated: new FormControl('coated'),
    coatingType: new FormControl('Type A'),
    coatingCondition: new FormControl('good'),
    pipelineCondition: new FormControl('it looks...'),
    outerDiameter: new FormControl('1.11'),
    wallThickness: new FormControl('11.1'),
    from: new FormControl('22.22'),
    to: new FormControl('45.98'),
    grade: new FormControl('C'),
    internalConditionDesc: new FormControl('it looked..'),
    internalCondition: new FormControl('lossOfWallThickness'),
    corrLength: new FormControl('16.887'),
    deepestDefect: new FormControl('55.44'),
    wallThicknessLossPercentage: new FormControl('33'),
    largestCorrPitDiameter: new FormControl('32.22'),
    sentToLab: new FormControl('yes'),
    labName: new FormControl('IDX Diagonostics'),
    labAddress: new FormControl('1000 BTX Driveway'),
    completedBy: new FormControl('Sagar')

  });
}

submit(form) {
  this.digService.createCorrosionInspection(form.value, this.digId).subscribe(data => {
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
