import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'visualize',
    loadChildren: './visualize/visualize.module#VisualizeModule',
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  { path: 'login', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '', component: HomepageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
