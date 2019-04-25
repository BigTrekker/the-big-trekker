import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth';

import { AdminComponent } from './admin.component';
import { PostEditorComponent } from './components';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  canActivate: [AuthGuard],
  children: [
    { path: 'post', component: PostEditorComponent },
    { path: '', component: PostEditorComponent }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
