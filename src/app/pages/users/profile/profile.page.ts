import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonButtons, IonButton, IonBackButton, IonIcon} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create } from 'ionicons/icons';
import { UserService } from 'src/app/services/users/user.service';
import { TranslateService, TranslateModule  } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonButtons, IonButton, IonBackButton, IonIcon, CommonModule, FormsModule, ReactiveFormsModule, TranslateModule]
})
export class ProfilePage implements OnInit {
  user: any = {};
  formUser: FormGroup;
  isEditing = false;

  constructor(private userService: UserService, private translate: TranslateService) {
    addIcons({ create });

    this.formUser = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null),
      address: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
    this.getUser();
  }

  // Initialize the form values
  getUser(): void {
    this.userService.getUser().subscribe(
      (response) => {
        this.formUser.patchValue({
          name: response.name,
          email: response.email,
          password: '',
          address: response.address
        });
      },
      (error) => {
        console.error('Error log in user:', error);
      }
    );
  }

  // Enable or disable the form
  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    // If the edit is canceled, the values ​​return to the initial ones
    if (!this.isEditing) {
      this.getUser();
    }
  }

  // Submit the form values to edit the user data
  onSubmit(): void {
    if (this.formUser.valid) {
      this.userService.editUser(this.formUser.value).subscribe(
        (response) => {
          this.toggleEdit();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

}
