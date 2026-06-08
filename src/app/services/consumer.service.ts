import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerConsumer(consumer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/consumer/register`, consumer);
  }

  verifyConsumerOtp(otp: string): Observable<any> {
    const params = new HttpParams().set('otp', otp);
    return this.http.post(`${this.baseUrl}/consumer/verify-otp`, null, { params });
  }

  loginConsumer(email: string, password: string): Observable<any> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.post(`${this.baseUrl}/consumer/login`, null, { params });
  }

  forgotPassword(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.baseUrl}/consumer/forgot-password`, null, { params });
  }

  resetPassword(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/consumer/reset-password`, request);
  }

  getAllConsumers(id?: number, name?: string, status?: string, page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (id) params = params.set('id', id.toString());
    if (name) params = params.set('name', name);
    if (status) params = params.set('status', status);

    return this.http.get(`${this.baseUrl}/consumer/getall`, { params });
  }

  getConsumerById(consumerId: number): Observable<any> {
    const params = new HttpParams().set('consumerId', consumerId.toString());
    return this.http.get(`${this.baseUrl}/consumer/getbyid`, { params });
  }

  getConsumer(): Observable<any> {
    return this.http.get(`${this.baseUrl}/consumer/getconsumer`);
  }

  updateConsumer(updatedConsumer: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/consumer/update`, updatedConsumer);
  }

  softDeleteConsumer(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.delete(`${this.baseUrl}/consumer/delete`, { params });
  }

  activateConsumer(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.put(`${this.baseUrl}/consumer/activate`, null, { params });
  }
}