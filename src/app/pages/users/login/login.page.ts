import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonButton,} from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/users/user.service';
import { TranslateService, TranslateModule  } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonButton, CommonModule, FormsModule, ReactiveFormsModule, TranslateModule ]
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  constructor(private userService: UserService, private router: Router, private translate: TranslateService) {
    this.formLogin = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
  }

  // Check de form data to log in and save a jsonwebtoken in local storage
  onSubmit($event: any) {
    if (this.formLogin.valid) {
      const loginData = this.formLogin.value;
      this.userService.loginUser(loginData).subscribe(
        (response) => {
          localStorage.setItem('token_doble_electricidad', response.token);
          this.router.navigate(['/list']);
        },
        (error) => {
          console.error('Error log in user:', error);
        }
      );
    }
  }

}
