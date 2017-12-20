import 'zone.js';
import 'reflect-metadata';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';


import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notauth.guard';

import { PostComponent } from './components/post/post.component';
import { UsersComponent } from './components/users/users.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AdminGuard } from './guards/admin.guard';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate: [NotAuthGuard] },
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [NotAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'posts/:title', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'post/create', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'users/manage', component: ManageUsersComponent, pathMatch: 'full', canActivate: [AdminGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    PostComponent,
    UsersComponent,
    CreatePostComponent,
    ManageUsersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ValidateService,
    FlashMessagesService,
    AuthService,
    AuthGuard,
    NotAuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
