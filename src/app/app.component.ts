import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userIsLoggedIn: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
    private authService: AuthService,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.loggedInUserEvent.subscribe(data => {
        this.userIsLoggedIn = data;
      });
      
    });
  }

  close() {
    this.menuController.toggle();
  }

  logout() {
    this.authService.loggedInUserEvent.emit(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.close();
  }
}
