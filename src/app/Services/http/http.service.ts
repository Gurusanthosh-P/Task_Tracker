import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/urls/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http:HttpClient) { }


    private token:any = localStorage.getItem('token')
  

  customHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json', 
    'Authorization':`Bearer ${this.token}`
  }).set('ngrok-skip-browser-warning','true');




  userSignUp(userData:any):Observable<any>{
    return this.http.post(`${apiUrl.userSignUp}`,userData,{headers:this.customHeaders})
  }

  userLogin(postData:any):Observable<any>{
    return this.http.post(`${apiUrl.userLogin}`,postData,{headers:this.customHeaders})
  }
  getStatistics():Observable<any>{
    return this.http.get(`${apiUrl.userStatistics}`,{headers:this.customHeaders})
  }

  getUserTask():Observable<any>{
    return this.http.get(`${apiUrl.userTask}`,{headers:this.customHeaders})
  }

  createTask(taskData:any):Observable<any>{    
    return this.http.post(`${apiUrl.createTask}`,taskData,{headers:this.customHeaders})
  }

  deleteTask(taskid:number):Observable<any>{        
    return this.http.delete(`${apiUrl.deleteTask}/${taskid}`,{headers:this.customHeaders})
  }

  editTask(productData:any,taskid:number):Observable<any>{        
    return this.http.put(`${apiUrl.updateTask}/${taskid}`,productData,{headers:this.customHeaders})
  }

}
