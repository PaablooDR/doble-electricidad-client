import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = 'http://localhost:3333/invoices';
  constructor(private http: HttpClient) { }

  getAllInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
