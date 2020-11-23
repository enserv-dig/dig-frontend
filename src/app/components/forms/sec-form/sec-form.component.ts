import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ToastController } from '@ionic/angular';
import { DatePickerComponent, IDayCalendarConfig } from 'ng2-date-picker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-sec-form',
  templateUrl: './sec-form.component.html',
  styleUrls: ['./sec-form.component.scss'],
})
export class SecFormComponent implements OnInit {
  @ViewChild("dateFromDp") public dateFromDp: DatePickerComponent; 
  @ViewChild("dateToDp") public dateToDp: DatePickerComponent; 


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
  
  constructor(private fb: FormBuilder, private digService: DigService, private route: ActivatedRoute, private router: Router, private toastController: ToastController ) { 
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

  openDatePicker() {

  }

  private createForm(): void {
    this.filterForm = this.fb.group({
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
      time: new FormControl(),
      description: new FormControl('test desc'),
      competentPerson: new FormControl('john'),
      siteSupervisor: new FormControl('john'),
      siteForeman: new FormControl('sagar'),
      contractorCompetentPerson: new FormControl('sagar'),
      protectiveSystem: new FormControl('trench'),
      reviewStatus: new FormControl('na'),
      obstructions: new FormControl('none'),
      landOwners: new FormControl('yes'),
      utilites: new FormControl('yes'),
      electrical: new FormControl('yes'),
      water: new FormControl('na'),
      sewer: new FormControl('yes'),
      tools: new FormControl('na'),
      protectiveEquipments: new FormControl('yes'),
      blackHoe: new FormControl('yes'),
      excavator: new FormControl('na'),
      trenchBox: new FormControl('na'),
      trenchShields: new FormControl('na'),
      signs: new FormControl('na'),
      barricades: new FormControl('na'),
      waterRemovalEquipment: new FormControl('na'),
      safetyObserver: new FormControl('yes'),
      excavation4: new FormControl('yes'),
      hazardCondition: new FormControl('yes'),
      excavation20: new FormControl('na'),
      contractorAware: new FormControl('na'),
      checklistPriorProvided: new FormControl('yes'),
      contractorAdvised: new FormControl('na'),
      comments: new FormControl('no comments')

    });

}

submit(form) {
  this.digService.createExcavationWorksheet(form.value, this.digId).subscribe(data => {
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