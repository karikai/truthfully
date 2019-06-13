import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ProfileComponent } from './components/profile/profile.component';
 
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'search/:keyword', component: SearchResultsComponent },
  { path: 'profile/:username', component: ProfileComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}