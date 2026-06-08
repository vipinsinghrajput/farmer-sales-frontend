import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerAdmin(admin: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/register`, admin);
  }

  verifyAdminOtp(otp: string): Observable<any> {
    const params = new HttpParams().set('otp', otp);
    return this.http.post(`${this.baseUrl}/admin/verify-otp`, null, { params });
  }

  loginAdmin(email: string, password: string): Observable<any> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.post(`${this.baseUrl}/admin/login`, null, { params });
  }

  forgotPassword(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.baseUrl}/admin/forgot-password`, null, { params });
  }

  resetPassword(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/reset-password`, request);
  }

  getAdminById(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.baseUrl}/admin/getbyid`, { params });
  }

  getAdmin(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/getadmin`);
  }

  getAllAdmins(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/getall`);
  }

  updateAdmin(adminUpdateRequest: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/update`, adminUpdateRequest);
  }

  softDeleteAdmin(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.delete(`${this.baseUrl}/admin/delete`, { params });
  }

  activateAdmin(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.put(`${this.baseUrl}/admin/activate`, null, { params });
  }

  updateFarmerStatus(farmerId: number, status: boolean): Observable<any> {
    const params = new HttpParams()
      .set('farmerId', farmerId.toString())
      .set('status', status.toString());
    return this.http.put(`${this.baseUrl}/admin/updatefarmerstatus`, null, { params });
  }

  updateConsumerStatus(consumerId: number, status: boolean): Observable<any> {
    const params = new HttpParams()
      .set('consumerId', consumerId.toString())
      .set('status', status.toString());
    return this.http.put(`${this.baseUrl}/admin/updateconsumerstatus`, null, { params });
  }
}