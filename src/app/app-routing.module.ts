import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { DigComponent } from './components/dig/dig.component';
import { FacilityComponent } from './components/facility/facility.component';
import { CorrosionInspectComponent } from './components/forms/corrosion-inspect/corrosion-inspect.component';
import { EncroachmentAgreeComponent } from './components/forms/encroachment-agree/encroachment-agree.component';
import { PipeInspectComponent } from './components/forms/pipe-inspect/pipe-inspect.component';
import { SecFormComponent } from './components/forms/sec-form/sec-form.component';
import { WorkPermitComponent } from './components/forms/work-permit/work-permit.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { PipelineComponent } from './components/pipeline/pipeline.component';
import { ResetFormComponent } from './components/reset-form/reset-form.component';
import { ResetPwComponent } from './components/reset-pw/reset-pw.component';
import { SignupComponent } from './components/signup/signup.component';
import { WorkflowDetailComponent } from './components/workflow-detail/workflow-detail.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { WorkspaceDetailComponent } from './components/workspace-detail/workspace-detail.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetPwComponent },
  { path: 'reset-form/:token', component: ResetFormComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomepageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'facility', component: FacilityComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'pipeline', component: PipelineComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'dig', component: DigComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'workflow', component: WorkflowComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'workspace', component: WorkspaceComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'workspace/:id', component: WorkspaceDetailComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'form/sec/:id', component: SecFormComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'form/work-permit/:id', component: WorkPermitComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'form/corrosion-inspect/:id', component: CorrosionInspectComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'form/encroachment-agree/:id', component: EncroachmentAgreeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'workflow/:id', component: WorkflowDetailComponent, pathMatch: 'full', canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
