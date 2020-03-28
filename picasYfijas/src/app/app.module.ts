import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule, MatButtonModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from "./inicio/inicio.component";
import { JuegoComponent } from './juego/juego.component';
import { FinalComponent } from './final/final.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'juego', component: JuegoComponent },
  { path: 'final', component: FinalComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    JuegoComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
