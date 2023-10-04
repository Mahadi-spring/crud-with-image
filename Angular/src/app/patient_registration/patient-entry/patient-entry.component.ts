import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { PatientServiceService } from './patient-service.service';
import { patientIface } from './patientregistration';

@Component({
  selector: 'app-patient-entry',
  templateUrl: './patient-entry.component.html',
  styleUrls: ['./patient-entry.component.css']
})


export class PatientEntryComponent implements OnInit {
  datapass = 'testing'
  patientForm !: FormGroup;
  // patientList: patientIface[] = [];
  editObject !: patientIface;
  id !: number;
  base64Output !: string;
  //Date formatting
  date = new Date();
  birthDate = new Date().toLocaleString('en-GB', {
    hour12: false,
  });
  pattern = /[0-9\+\-\ ]/;
  submitted = false;

  constructor(private cd: ChangeDetectorRef,private patientService: PatientServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.patientForm = new FormGroup({
      salutation: new FormControl(''),
      patientName: new FormControl(''),
      age: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])),
      patientPhone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.pattern('^[0-9]*$')
      ])),
      patientAddress: new FormControl('', Validators.required),
      gender: new FormControl(''),
      religion: new FormControl(''),
      dateOfBirth: new FormControl(''),
      marritalStatus: new FormControl(''),
      fatherName: new FormControl('', Validators.required),
      motherName: new FormControl('', Validators.required),
      patientImage: new FormControl('')
    });
    
  }

get f(): { [key: string]:AbstractControl }{
  return this.patientForm.controls;
}
   

  createpatient() {
    this.patientForm.value.dateOfBirth = new Date(this.patientForm.value.dateOfBirth); // this is a must
    this.patientForm.value.dateOfBirth = this.patientForm.value.dateOfBirth?.toLocaleDateString();

    console.log("this.patientForm.value", this.patientForm.value);
    console.log(this.currentFile);

    this.patientService.addPatient(this.patientForm.value,  this.currentFile!).subscribe(
      (data: patientIface) => {
        console.log("data", data);
        this.router.navigate(["patient-table"])
      }
    )

    this.submitted = true;
    if (this.patientForm.invalid){
      return;
    }
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


  

  // // Set the date of birth in the patient form value
  // this.patientForm.value.dateOfBirth = dateOfBirth;

  // // Call the toLocaleDateString() method
  // console.log(dateOfBirth.toLocaleDateString());

}

