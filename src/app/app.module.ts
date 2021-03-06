import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HiLoComponent } from './hi-lo/hi-lo.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GenericErrorComponent } from './generic-error/generic-error.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';

const routes: Routes = [
  {
    path: 'hi-lo',
    component: HiLoComponent,
    data: {title: 'Login Redirect'}
  },
  {
    path: 'error-page',
    component: GenericErrorComponent,
    data: {title: 'Error Page'}
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '*',
    component: HomeComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {title: 'Page Not Found'}
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HiLoComponent,
    HomeComponent,
    PageNotFoundComponent,
    GenericErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatSnackBarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
