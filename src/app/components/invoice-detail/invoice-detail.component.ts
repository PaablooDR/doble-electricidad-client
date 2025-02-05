import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonModal } from '@ionic/angular/standalone';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonModal]
})
export class InvoiceDetailComponent {
  @Input() invoice: any;
  isOpen = true;

  ngOnInit() {
    console.log('Invoice recibido en modal:', this.invoice);
  }

  closeModal() {
    this.isOpen = false;
  }
}
