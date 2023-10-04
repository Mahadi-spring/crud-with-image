import { Component, TemplateRef , OnInit } from '@angular/core';
import { PatientServiceService } from '../patient-entry/patient-service.service';
import { patientIface } from '../patient-entry/patientregistration';
import { BsModalService, BsModalRef,ModalOptions } from 'ngx-bootstrap/modal';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.css']
})



export class PatientTableComponent implements OnInit{

  patientList: patientIface[] = []; // the fields from patientIface 

  modalRef?: BsModalRef;
  userId !: number;
  constructor(private service: PatientServiceService, private modalService: BsModalService){
    
  }

  openModal(id: number) {
    this.userId = id;
    console.log(this.userId);
    
    
    let initialState =  {
     id: this.userId
    }
    this.modalRef = this.modalService.show(ModalEditComponent, {initialState});
    this.modalRef.setClass('modal-lg');
    this.modalRef.content.onClose.subscribe(
      (res:any) => {
        if(res) {
          this.showPatientList();
        }
      }
    );
    this.modalRef.content.closeBtnName = 'Close';
  }

  ngOnInit(): void {
    this.service.refreshNeeds.subscribe(
      () => {
        this.showPatientList();
      }
    )
    this.showPatientList();
  }
  
  showPatientList(){
    this.service.getpatinetList().subscribe(
      (data: patientIface[])=>{ //here data: contains all the fields described in patientIface
        this.patientList = data;
        console.log("list: ", this.patientList);
        
      }
    )
  }

  deletelist(id:number){
    this.service.deleteById(id).subscribe( del=>{
      this.showPatientList();
    })
    // this.ngOnInit()....
  }


 
}
