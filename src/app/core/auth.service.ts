import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {firebase} from '@firebase/app';

import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

export class Credentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;

  /**
   * Initializes the user observable
   *
   * @param {AngularFireAuth} afAuth
   * @param {AngularFirestore} afs
   * @param {Router} router
   */
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else {
        return Observable.of(null)
      }
    })
  }


  /**
   * Logs the user using google popup. Reruns promise with no catch block defined.
   * @returns {Promise<void>}
   */
  googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  /**
   * Logs the user in with given email and pass. Returns promise with no catch block defined.
   *
   * @param {Credentials} credentials
   * @returns {Promise<any>}
   */
  credentialsLogin(credentials: Credentials): Promise<any> {
    return Promise.resolve(this.afAuth.auth
      .signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      ));

  }

  /**
   * Signs out the user, then navigates to /
   * @returns {Promise<void>}
   */
  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/']);
    });
  }

  /**
   * Given a provider, creates a popup to login and after that updates user data.
   *
   * @param provider
   * @returns {Promise<void>}
   */
  private oAuthLogin(provider): Promise<void> {
    return Promise.resolve(this.afAuth.auth.signInWithPopup(provider))
      .then((credential) => {
        return this.updateUserData(credential.user);
      })
  }

  /**
   * Sets user data to firestore on login
   *
   * @param user should be object, that has property uid
   * @returns {Promise<void>}
   */
  private updateUserData(user): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return Promise.resolve(userRef.set(data, {merge: true}));
  }
}
