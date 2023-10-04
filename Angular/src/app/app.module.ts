import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientEntryComponent } from './patient_registration/patient-entry/patient-entry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PatientTableComponent } from './patient_registration/patient-table/patient-table.component';
import { PatientformEditComponent } from './patient_registration/patientform-edit/patientform-edit.component';
import { ModalEditComponent } from './patient_registration/modal-edit/modal-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientEntryComponent,
    PatientTableComponent,
    PatientformEditComponent,
    ModalEditComponent
  ],
  imports: [
    BrowserModule,
    BsDatepickerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
