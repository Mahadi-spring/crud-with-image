import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalEditComponent } from './patient_registration/modal-edit/modal-edit.component';
import { PatientEntryComponent } from './patient_registration/patient-entry/patient-entry.component';
import { PatientTableComponent } from './patient_registration/patient-table/patient-table.component';
import { PatientformEditComponent } from './patient_registration/patientform-edit/patientform-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'patient-table', pathMatch: 'full'}, 
  // you must write every component in the { component: }
  {path:'patient-table', component: PatientTableComponent},
  {path:'patient-form', component: PatientEntryComponent},
  {
    path: 'patient-table/patientform-edit/:id',
    component: PatientformEditComponent
  },
  {path:'modal-edit', component: ModalEditComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
