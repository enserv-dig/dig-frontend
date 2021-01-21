import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss'],
})
export class ResetFormComponent implements OnInit {

  validPW = false;
  token = "";
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private toastController: ToastController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.route.paramMap.subscribe(data => {
      if (this.route.snapshot.paramMap.has('token')) {
        this.token = this.route.snapshot.paramMap.get('token');
        console.log(this.token);
  }})
  }


  confirmPW(form, form1) {
    this.validPW = form.value == form1.value;
    return this.validPW;
  }

  submitPw(form){
    console.log(form.value.password);
    this.authService.reset_pw_confirm(form.value.password, this.token).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('login');
      this.presentToast();
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Password reset successfully',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

}
