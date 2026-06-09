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

  getConsumerNotifications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notifications/consumerall`);
  }

  updateQuantity(productId: number, quantity: number): Observable<any> {
    const params = new HttpParams().set('productId', productId).set('quantity', quantity);
    return this.http.put(`${this.baseUrl}/cart/update`, null, { params });
  }

  getProductById(productId: number): Observable<any> {
    const params = new HttpParams().set('id', productId);
    return this.http.get(`${this.baseUrl}/products/getbyid`, { params });
  }

  addToCart(productId: number): Observable<any> {
    const params = new HttpParams().set('productId', productId);
    return this.http.post(`${this.baseUrl}/cart/addtocart`, null, { params });
  }

  incrementQuantity(productId: number): Observable<any> {
    const params = new HttpParams().set('productId', productId);
    return this.http.put(`${this.baseUrl}/cart/increment`, null, { params });
  }

  decrementQuantity(productId: number): Observable<any> {
    const params = new HttpParams().set('productId', productId);
    return this.http.put(`${this.baseUrl}/cart/decrement`, null, { params });
  }

  getProfile(): Observable<any> {
    return this.getConsumer();
  }

  updateProfile(updatedData: any): Observable<any> {
    return this.updateConsumer(updatedData);
  }

  getAllFarmerProducts(filters: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get(`${this.baseUrl}/products/getallfarmerproducts`, { params });
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart/viewcart`);
  }

  fetchAddresses(): Observable<any> { return this.http.get(`${this.baseUrl}/address/getall`); }
  saveNewAddress(address: any): Observable<any> { return this.http.post(`${this.baseUrl}/address/add`, address); }
  removeItem(productId: number): Observable<any> { return this.http.delete(`${this.baseUrl}/cart/remove?productId=${productId}`); }
  deliveryfee(addressId: number, productId: number): Observable<any> { return this.http.get(`${this.baseUrl}/order/deliveryfee?addressId=${addressId}&productId=${productId}`); }
  checkout(addressId: number): Observable<any> { return this.http.post(`${this.baseUrl}/cart/checkout?addressId=${addressId}`, null); }
  getAllFarmers(): Observable<any> { return this.http.get(`${this.baseUrl}/farmer/getall`); }
  markAsRead(notificationId: number): Observable<any> { return this.http.put(`${this.baseUrl}/notifications/cmarkread?notificationId=${notificationId}`, null); }
  markAllAsRead(): Observable<any> { return this.http.put(`${this.baseUrl}/notifications/callmarkread`, null); }
  getConsumerOrders(page: number, size: number, status: string, fromDate?: string, toDate?: string): Observable<any> { 
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    if (fromDate) params = params.set('fromDate', fromDate);
    if (toDate) params = params.set('toDate', toDate);
    return this.http.get(`${this.baseUrl}/order/getconsumerorders`, { params }); 
  }
  getFarmerById(farmerId: number): Observable<any> { return this.http.get(`${this.baseUrl}/farmer/getbyid?id=${farmerId}`); }
  cancelOrder(orderId: number, reason: string): Observable<any> { return this.http.put(`${this.baseUrl}/order/cancel?orderId=${orderId}&reason=${reason}`, null); }
}