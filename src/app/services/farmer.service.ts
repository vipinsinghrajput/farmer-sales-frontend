import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  private baseUrl = environment.apiUrl; // your backend farmer base URL

  constructor(private http: HttpClient) { }

  addProduct(formData: FormData): Observable<any> {   
    return this.http.post(`${this.baseUrl}/products/create`, formData);
  }

  getAllProducts(
   filters: {
    name?: string;
    minPrice?: number | null;
    maxPrice?: number | null;
    category?: string;
    available?: boolean;
    page?:number;
    size?:number;
  }
  ): Observable<any> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<{ message: string; response: any }>(
      `${this.baseUrl}/products/getallfarmer`,
      { params: params }
    ).pipe(
      map(res => res.response) // Returns { products, currentPage, totalPages, totalElements }
    );
  }

  getProductById(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.baseUrl}/products/getbyfarmerid`, { params });
  }

  deleteProduct(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.baseUrl}/products/delete`, { params });
  }

  updateProduct(id: number, updatedProduct:any): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.put(`${this.baseUrl}/products/update`, updatedProduct, { params: params });
  }
  
  getFarmerProfile() {
    return this.http.get(`${this.baseUrl}/farmer/getfarmer`);
  }
  
  updateFarmerProfile(data: any) {
    return this.http.put(`${this.baseUrl}/farmer/update`, data);   
  }

  getFarmerOrders(
    page: number = 0,
    size: number = 10,
    status?: string,
    fromDate?: string ,
    toDate?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (status) {
      params = params.set('status', status);
    }
    if (fromDate) {
      params = params.set('fromDate', fromDate);
    }
    if (toDate) {
      params = params.set('toDate', toDate);
    }

    return this.http.get<{ message: string; response: any }>(
      `${this.baseUrl}/orders/getfarmerorders`,
      { params: params }
    ).pipe(
      map(res => res.response) // returns the full response map: orders + pagination
    );
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    const params = new HttpParams()
      .set('orderId', id.toString())
      .set('status', status);
  
    return this.http.put(`${this.baseUrl}/orders/updatestatus`, null, { params: params });
  }

  getConsumerById(id: number): Observable<any> {
    const params = new HttpParams().set('consumerId', id.toString());
    return this.http.get(`${this.baseUrl}/consumer/getbyid`, { params });
  }

  getAddressById(id: number): Observable<any> {
    const params = new HttpParams().set('addressId', id.toString());
    return this.http.get(`${this.baseUrl}/address/getbyaddressid`, { params });
  }

  getFarmerNotifications(): Observable<any> {
      return this.http.get(`${this.baseUrl}/notifications/farmerall`);
  }

  markAsRead(id :number): Observable<any> {
    const params = new HttpParams().set('notificationId', id.toString());
    return this.http.put(`${this.baseUrl}/notifications/fmarkread`,null , { params:params });
  }

  markAllAsRead(): Observable<any> {
    return this.http.put(`${this.baseUrl}/notifications/fallmarkread`,null);
  }

  getAvailableDeliveryPersons(): Observable<any> {
    return this.http.get(`${this.baseUrl}/delivery/getavailable`);
  }

  getDeliveryPersonById(delivery_person_id: number): Observable<any>{
    const params = new HttpParams().set('Id', delivery_person_id.toString());
    return this.http.get(`${this.baseUrl}/delivery/getbyid`,{ params:params });
  }

  assignDeliveryPerson(orderId: number, personId: number): Observable<any> {
    const params = new HttpParams()
        .set('orderId', orderId.toString())
        .set('deliveryPersonId', personId.toString());

    return this.http.post(`${this.baseUrl}/orders/assign-delivery`, null,{ params: params });
  }

}