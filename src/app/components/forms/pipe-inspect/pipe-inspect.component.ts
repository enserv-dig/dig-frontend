import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatePickerComponent, IDayCalendarConfig } from 'ng2-date-picker';
import { DigService } from 'src/app/services/dig.service';

@Component({
  selector: 'app-pipe-inspect',
  templateUrl: './pipe-inspect.component.html',
  styleUrls: ['./pipe-inspect.component.scss'],
})
export class PipeInspectComponent implements OnInit {
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
    location: new FormControl("New York"),
    inspectionName: new FormControl("INS 112"),
    exposeReason: new FormControl("faulty pipe strut"),
    inspectorQualified: new FormControl("yes"),

    cathodicProtection: new FormControl('yes'),
    pipeReading: new FormControl('1.34'),
    bareOrCoated: new FormControl('coated'),
    coatingType: new FormControl('Type A'),
    coatingCondition: new FormControl('good'),
    pipelineCondition: new FormControl('it looks...'),
    internalPipelineCondition: new FormControl('NA'),
    
    signature: new FormControl('SP'),
    company: new FormControl('Test Company'),
    title: new FormControl('Primary Inspector')

  });
}

submit(form) {
  this.digService.createPipeInspection(form.value, this.digId).subscribe(data => {
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
