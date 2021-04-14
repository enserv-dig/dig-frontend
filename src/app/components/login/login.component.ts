import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage: string = null;

  constructor(private authService: AuthService,
              private router: Router,
              private toastController: ToastController,
              private loadingController: LoadingController) { }

  ngOnInit() {}

  submitLogin(form) {

    this.presentLoading();


    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.authService.executeAuthService(form.value.username, form.value.password).subscribe(data => {
      this.authService.loggedInUserEvent.emit(true);

      if (this.authService.userIsLoggedIn) {
          this.loadingController.dismiss();
          this.router.navigateByUrl('home');
      }
    }, error => {
      console.log(error.error);
      this.errorMessage = error.error.message;
      const toast = this.toastController.create({
        color: 'danger',
        message: this.errorMessage,
        duration: 3000,
      }).then(el => {
        el.present();
      });
    }
    );
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Logging in...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
