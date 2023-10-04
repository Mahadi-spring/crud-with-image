import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { patientIface } from './patientregistration';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
private api = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getpatinetList(): Observable<patientIface[]>{
    return this.http.get<patientIface[]>(`${this.api}/patient/patient-table`);
  }

  private _refreshNeeds = new Subject<void>();

  get refreshNeeds(){
    return this._refreshNeeds;
  }

  public addPatient(patientRegistration: patientIface, image:File): Observable<patientIface>{
    
    const dataInof = {
          patInfo: patientRegistration
        }
    const formData = new FormData();
    formData.append("patInfo",'{}');
    formData.append('image', image);

    const formData1 = new FormData();
    formData1.set('reqobj', JSON.stringify(patientRegistration));
    formData1.append('file', image);
    console.log("*******formData", formData1);
    
    // return this.http.post(`${this.api}/patient/create`, formData).pipe(
    //   tap( () => {
    //     this._refreshNeeds.next();
    //   }
    //   )
    // );

    const data = {};


     return this.http.post(`${this.api}/patient/create-with-image`, formData1).pipe(
        map((data: any) => data
        ));
}
 


//   updateRegistrationWithImage(data: any, image: File) {
//     const formData = new FormData();
//     formData.set('reqobj', JSON.stringify(data));
//     formData.append('file', image);
//     console.log("*******formData", formData);

//     return this.http.put(this.UPDATE_REGISTRATION_WITH_IMAGE, formData).pipe(
//         map((data: any) => data
//         ));
// }


  public updatePatient(patientRegistration: patientIface, image:File): Observable<patientIface>{

    const formData1 = new FormData();
    formData1.set('reqobj', JSON.stringify(patientRegistration));
    formData1.append('file', image);
    console.log("*******formData", formData1);


    return this.http.put(`${this.api}/patient/update-with-image/${patientRegistration.id}`, formData1).pipe(
      map((data: any) => data
      ));

  }
  public editPatientById(id:number){
    return this.http.get<patientIface>(`${this.api}/patient/post/${id}`);
  }
  public deleteById(id: number){
    return this.http.delete(`${this.api}/patient/post/${id}`);
  }

 
}
