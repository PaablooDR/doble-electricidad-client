import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = 'http://localhost:3333/invoices';
  constructor(private http: HttpClient) { }

  // Request to get an array of all the invoices
  getAllInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
