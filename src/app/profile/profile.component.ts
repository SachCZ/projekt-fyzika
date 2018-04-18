import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/auth.service";
import {MatSnackBar} from "@angular/material";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  /**
   * Tries to sign in the user, with google, informs him about result
   *
   */
  googleLogin(): void {
    this.auth.googleLogin()
      .then(
        ignore => {
          this.snackBar.open('Přihlášení proběhlo úspěšně.', 'OK', {
            duration: 2000,
          });
        }
      )
      .catch(err => {
        let message: string = '';
        let failed: boolean = false;

        switch (err.code) {
          case 'auth/network-request-failed':
            message = 'Nepodařilo se navázat spojení se serverem, zkontrolujte připojení k internetu';
            break;
          case 'auth/user-disabled':
            message = 'Nepodařilo se přihlásit, uživatelský účet zablokován.';
            break;
          case 'auth/too-many-requests':
            message = 'Nepodařilo se přihlásit, příliš mnoho pokusů, zkuste to prosím později.';
            break;
          default:
            message = 'Nepodařilo se přihlásit. Pokud problémy přetrvávají kontaktujte admina.';
            failed = true;
        }

        this.snackBar.open(message, 'OK', {
          duration: 2000,
        });

        return Promise.reject(new Error(err));
      })
  }
}
