import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonIcon, ModalController  } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { newspaper, person } from 'ionicons/icons';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { InvoiceDetailComponent } from 'src/app/components/invoice-detail/invoice-detail.component';
import generatePDF from 'src/app/lib/pdf';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonIcon, CommonModule, FormsModule, InvoiceDetailComponent]
})
export class ListPage implements OnInit {

  invoices: any[] = [];

  constructor(private invoiceService: InvoiceService, private modalCtrl: ModalController) {
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

  async openInvoiceModal(invoice: any) {
    console.log('Abriendo modal con invoice:', invoice);
    const modal = await this.modalCtrl.create({
      component: InvoiceDetailComponent,
      componentProps: { invoice }
    });
    return await modal.present();
  }

  // Function that generate a PDF of an invoice
  async onGeneratePDF() {
    const products = [
      {
        nombre: 'Laptop',
        cantidad: 1,
        total: 1000
      },
      {
        nombre: 'Mouse',
        cantidad: 3,
        total: 150
      },
      {
        nombre: 'Monitor',
        cantidad: 2,
        total: 400
      }
    ];
    const reciboNo = '123456789';
    const fecha = '05-02-2025';

    await generatePDF(products, reciboNo, fecha);
  }

}
