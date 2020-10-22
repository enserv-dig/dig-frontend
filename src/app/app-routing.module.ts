import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { DigComponent } from './components/dig/dig.component';
import { FacilityComponent } from './components/facility/facility.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { PipelineComponent } from './components/pipeline/pipeline.component';
import { SignupComponent } from './components/signup/signup.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomepageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'facility', component: FacilityComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'pipeline', component: PipelineComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'dig', component: DigComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'workflow', component: WorkflowComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
