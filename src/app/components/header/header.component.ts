import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonPopover } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exit, create } from 'ionicons/icons';
import { TranslateService, TranslateModule  } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonPopover, TranslateModule, CommonModule]
})
export class HeaderComponent implements OnInit {
  isPopoverOpen = false;
  popoverEvent: Event | null = null;
  pendingAction: (() => void) | null = null;
  currentLanguage = 'es';

  constructor(private router: Router, private translate: TranslateService) {
    addIcons({ exit, create });
  }

  ngOnInit() {
    this.currentLanguage = this.translate.currentLang || 'es';
  }

  // Function that open the popover
  openPopover(event: Event) {
    this.popoverEvent = event;
    this.isPopoverOpen = true;
  }

  // Function that navigates to the profile page
  onEditProfile() {
    this.pendingAction = () => this.router.navigate(['/profile']);
    this.isPopoverOpen = false;
  }

  // Function that log out the user and redirects to login page
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

  // Function that change the language
  changeLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = language;
  }
}

