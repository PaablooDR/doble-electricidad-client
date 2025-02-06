import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { newspaper, person } from 'ionicons/icons';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import generatePDF from 'src/app/lib/pdf';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonTitle, CommonModule, FormsModule, HeaderComponent]
})
export class ListPage implements OnInit {

  invoices: any[] = [];

  constructor(private invoiceService: InvoiceService) {
    addIcons({ newspaper, person });
  }

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getAllInvoices().subscribe({
      next: (data) => {
        this.invoices = data;
      },
      error: (err) => {
        console.error('Error loading invoices:', err);
      }
    });
  }

  // Function that generate a PDF of an invoice
  async onGeneratePDF(invoice: any) {
    const reciboNo = invoice._id || 'N/A';
    const fecha = new Date(invoice.date).toLocaleDateString();
    const holderName = invoice.holder_name;
    const amount = invoice.amount;
    const address = invoice.address;
    const userName = invoice.user.name;
    const userEmail = invoice.user.email;
    const userAddress = invoice.user.address;
  
    await generatePDF(reciboNo, fecha, holderName, amount, address, userName, userEmail, userAddress);
  }

}
