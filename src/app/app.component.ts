import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule] 
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.initializeTranslation();
  }

  initializeTranslation() {
    this.translate.addLangs(['en', 'es']);
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|es/) ? browserLang : 'es'); // Default language
  }
}
