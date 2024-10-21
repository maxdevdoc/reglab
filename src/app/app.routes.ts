import { Routes } from '@angular/router';
import { LoginAndAuthorizationComponent } from './login-and-authorization/login-and-authorization.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GuestGuard } from './login-and-authorization/guard/guest.guard';
import { AuthGuard } from './login-and-authorization/guard/auth.guard';
import { UserPageComponent } from './user-page/user-page.component';

export const routes: Routes = [
  {
    path: 'registration',
    component: LoginAndAuthorizationComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'login',
    component: LoginAndAuthorizationComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'user/:userName',
    component: UserPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
];
