import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/auth/http-interceptor.service';
import { AuthGuard } from './services/auth/auth.guard';
import { FormsModule } from '@angular/forms';
import { ClientModalComponent } from './components/homepage/client-modal/client-modal.component';
import { ClientComponent } from './components/client/client.component';
import { FacilityModalComponent } from './components/facility-modal/facility-modal.component';
import { FacilityComponent } from './components/facility/facility.component';
import { DigComponent } from './components/dig/dig.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipelineModalComponent } from './components/pipeline-modal/pipeline-modal.component';
import { PipelineComponent } from './components/pipeline/pipeline.component';
import { DigSelectComponent } from './components/dig-select/dig-select.component';

@NgModule({
  declarations: [AppComponent, HomepageComponent, LoginComponent, SignupComponent, ClientModalComponent, FacilityModalComponent, PipelineModalComponent, ClientComponent, FacilityComponent, DigComponent, PipelineComponent, DigSelectComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, NgxDatatableModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    StatusBar,
    SplashScreen,
    AuthGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NgxDatatableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
