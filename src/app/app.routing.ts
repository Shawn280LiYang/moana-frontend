import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PanelComponent } from './panel/panel.component';
import { ProfileComponent } from './panel/profile.component';
import { LoginComponent } from './panel/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'userpanel', component: PanelComponent },
  { path: 'userprofile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
