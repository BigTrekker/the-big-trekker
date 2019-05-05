import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from './../environments/environment'
import { AuthGuard } from './auth/guards/auth.guard';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'login',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PostEditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: !environment.production })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
