import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonPopover } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exit, create } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonPopover]
})
export class HeaderComponent implements OnInit {
  isPopoverOpen = false;
  popoverEvent: Event | null = null;
  pendingAction: (() => void) | null = null;

  constructor(private router: Router) {
    addIcons({ exit, create });
  }

  ngOnInit() {}

  openPopover(event: Event) {
    this.popoverEvent = event;
    this.isPopoverOpen = true;
  }

  onEditProfile() {
    this.pendingAction = () => this.router.navigate(['/profile']);
    this.isPopoverOpen = false;
  }

  onLogout() {
    this.pendingAction = () => this.router.navigate(['/login']);
    localStorage.clear();
    this.isPopoverOpen = false;
  }

  handlePopoverDismiss() {
    if (this.pendingAction) {
      this.pendingAction();
      this.pendingAction = null;
    }
  }

  whoIsUser() {
    const jwtoken = localStorage.getItem('doble-electricidad');
    return jwtoken
  }
}

