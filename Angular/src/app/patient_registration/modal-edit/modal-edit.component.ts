import { Component, OnInit, TemplateRef  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientServiceService } from '../patient-entry/patient-service.service';
import { patientIface } from '../patient-entry/patientregistration';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit{
  patientForm !: FormGroup;
  // patientList: patientIface[] = [];
  editObject !: patientIface;
  id !: any;
onClose: Subject<any> = new Subject();
  modalRef !: BsModalRef;
  closeBtnName?: string;
  



constructor(private modalService: BsModalService, public bsModalRef: BsModalRef, private patientService: PatientServiceService, private router: Router, private route: ActivatedRoute) { }




ngOnInit(): void {
  this.patientForm = new FormGroup({
    salutation: new FormControl(),
    patientName: new FormControl(),
    age: new FormControl(),
    patientPhone: new FormControl(),
    patientAddress: new FormControl(),
    gender: new FormControl(),
    religion: new FormControl(),
    dateOfBirth: new FormControl(),
    marritalStatus: new FormControl(),
    fatherName: new FormControl(),
    motherName: new FormControl(),
    patientImage: new FormControl()
  });
  

 this.editPatient(this.id);
  console.log("ID",this.id);
  
  
}

editPatient(id: number) {
  this.patientService.editPatientById(id).subscribe(
    (data) => {
      this.editObject = data;
      console.log(data);

      this.patientForm = new FormGroup({
        salutation: new FormControl(data.salutation),
        patientName: new FormControl(data.patientName),
        age: new FormControl(data.age),
        patientPhone: new FormControl(data.patientPhone),
        patientAddress: new FormControl(data.patientAddress),
        gender: new FormControl(data.gender),
        religion: new FormControl(data.religion),
        dateOfBirth: new FormControl(data.dateOfBirth),
        marritalStatus: new FormControl(data.marritalStatus),
        fatherName: new FormControl(data.fatherName),
        motherName: new FormControl(data.motherName),
        patientImage: new FormControl(data.patientImage)
      });
    }
  )
}


currentFile?: File;
selectFile(event: any){

  let files = event.target.files;
  if (files.length === 0) {
    return;
  }
 this.currentFile = files[0];
  console.log(files[0]);
  
}


updatePatient(){

  this.patientForm.value.dateOfBirth = new Date(this.patientForm.value.dateOfBirth); // this is a must
this.patientForm.value.dateOfBirth = this.patientForm.value.dateOfBirth?.toLocaleDateString();
  this.patientForm.value.id = this.id;
  this.patientService.updatePatient(this.patientForm.value, this.currentFile!).subscribe(res => {
    this.modalRef?.hide();
    this.onClose.next(true);
  })
}

}
