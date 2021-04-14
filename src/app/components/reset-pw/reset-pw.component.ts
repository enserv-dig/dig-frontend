import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-pw',
  templateUrl: './reset-pw.component.html',
  styleUrls: ['./reset-pw.component.scss'],
})
export class ResetPwComponent implements OnInit {

  constructor(private authService: AuthService, private toastController: ToastController) { }

  ngOnInit() {}

  submitReset(form) {
    console.log(form.value.email);
    let email = form.value.email;
    this.authService.reset_email(email).subscribe(data => {
      console.log(data);
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Password reset link sent',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }



}
