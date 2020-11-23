import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatePickerComponent, IDayCalendarConfig } from 'ng2-date-picker';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-work-permit',
  templateUrl: './work-permit.component.html',
  styleUrls: ['./work-permit.component.scss'],
})
export class WorkPermitComponent implements OnInit {

  @ViewChild("dateFromDp") public dateFromDp: DatePickerComponent; 
  @ViewChild("dateToDp") public dateToDp: DatePickerComponent; 


  public filterForm: FormGroup;
  public displayDate;
  digId: any;

  section3=[
    {key:'ventsProtected', val: 'Have drain openings and Vents been properly protected?'},
    {key:'freeFromFlame', val: 'Is the site free and clean of flammable and combustible materials?'},
    {key:'hotGuards', val: 'Have guards been erected to confine the hot work?'},
    {key:'valvesChecked', val: 'Have all flanges/valves in the vicinity been checked, are free from leaks?'},
    {key:'floorProtected', val: 'Are floor and ground properly protected?'},
    {key:'fireWatchAssigned', val: 'Has a properly trained fire watch been assigned?', add: true},
    {key:'fireEquipmentInspected', val: 'Has fire fighting equipment been inspected and ready for use?'},
    {key:'atmosphereSafe', val: 'Has atmosphere been tested and determined safe?'},
    {key:'exchangeInitiated', val: 'Proper air exchange for confined space entry initiated?(2000 cu. ft./ min/welder) '}
  ]

  section4=[
    {key:'lineIdentified', val: 'Line/Equipment positively Identified?'},
    {key:'lineDrained', val: 'Line/Equipment Properly Drained/Depressurized?'},
    {key:'lineCleaned', val: 'Line/Equipment Cleaned/Purged?'},
    {key:'jumperRequired', val: 'Jumper/Grounding/Bonding Required?'},
    {key:'blindsInPlace', val: 'Blinds and/or Block and Bleed in Place?'},
    {key:'outOfServiceNotice', val: 'Have personnel been notified of line/equipment to be closed or taken out of service?'}
  ]



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
      dateTo: new FormControl(),
      time: new FormControl(),
      confinedSpace: new FormControl('demo space'),
      entryPurpose: new FormControl('testing'),

      isolated: new FormControl('yes'),
      atmosphereTested: new FormControl('na'),
      otherPermits: new FormControl('yes'),
      testEquipmentRequired: new FormControl('na'),
      signsUsed: new FormControl('na'),
      meetingDone: new FormControl('yes'),
      ventilationMethod: new FormControl('forced'),
      communicationMethod: new FormControl('radio'),
      retrievalEquipment: new FormControl('harness'),
      airMonitoring: new FormControl('periodic'),
      lightingRequired: new FormControl('120v'),
      
      physicalHazards: new FormControl(['temperature', 'electrical']),
      supervisorName: new FormControl('rob'),
      safetyAttendentName: new FormControl('sagar'),
      safetyAttendentNameAlt: new FormControl('sardul'),
      entrantName: new FormControl('angel'),
      clockIn: new FormControl("11:11"),
      clockOut: new FormControl('6:00'),

      initialOxygen: new FormControl('0'),
      finalOxygen: new FormControl('1'),
      initialFlammability: new FormControl('2'),
      finalFlammability: new FormControl('4'),
      initialH2S: new FormControl('6'),
      finalH2S: new FormControl('9'),
      initialCO: new FormControl('11'),
      finalCO: new FormControl('14'),
      initialBenzene: new FormControl('17'),
      finalBenzene: new FormControl('19'),
      testerInitial: new FormControl('SP'),

      // section III
      workType: new FormControl('sb'),
      ventsProtected: new FormControl('yes'),
      freeFromFlame: new FormControl('yes'),
      hotGuards: new FormControl('yes'),
      valvesChecked: new FormControl('yes'),
      floorProtected: new FormControl('yes'),
      fireWatchAssigned: new FormControl('yes'),
      fireEquipmentInspected: new FormControl('yes'),
      atmosphereSafe: new FormControl('yes'),
      exchangeInitiated: new FormControl('yes'),

      // section IV
      lineIdentified: new FormControl('yes'),
      lineDrained: new FormControl('yes'),
      lineCleaned: new FormControl('yes'),
      jumperRequired: new FormControl('yes'),
      blindsInPlace: new FormControl('yes'),
      outOfServiceNotice: new FormControl('yes'),
      personOfNotice: new FormControl('manager'),
      noticeTime: new FormControl('11:11'),

      equipmentName: new FormControl('test equip'),
      personInitial: new FormControl('AJ'),
      equipmentOutTime: new FormControl('11:11'),
      outAllNotified: new FormControl('yes'),
      removePersonInitial: new FormControl('AJ'),
      equipmentInTime: new FormControl('09:11'),
      inAllNotified: new FormControl('yes'),
    });
}

submit(form) {
  this.digService.createWorkPermit(form.value, this.digId).subscribe(data => {
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
