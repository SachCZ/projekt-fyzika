import {fakeAsync, inject, TestBed} from '@angular/core/testing';
import {AuthService, Credentials, User} from './auth.service';
import {APP_BASE_HREF} from "@angular/common";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Rx";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


const mock_id: string = 'mock id';
const input: User[] = [
  {
    uid: mock_id,
    email: 'mail',
  }
];

const data = Observable.from(input);

const docStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
  set: jasmine.createSpy('set')
};

const angularFirestoreStub = {
  doc: jasmine.createSpy('doc').and.returnValue(docStub)
};


const credentialsMock: Credentials = {
  email: 'abc@123.com',
  password: 'password'
};

const userMock = {
  uid: 'ABC123',
  email: credentialsMock.email,
};

const fakeAuthState = new BehaviorSubject(null);

const fakeEmailSignInHandler = (): Promise<any> => {
  fakeAuthState.next(userMock);
  return Promise.resolve();
};

const fakePopupSignInHandler = (): Promise<any> => {
  fakeAuthState.next(userMock);
  return Promise.resolve(
    {
      user: userMock
    }
  )
};

const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

const angularFireAuthStub = {
  authState: fakeAuthState,
  auth: {
    createUserWithEmailAndPassword: jasmine
      .createSpy('createUserWithEmailAndPassword')
      .and
      .callFake(fakeEmailSignInHandler),
    signInWithEmailAndPassword: jasmine
      .createSpy('signInWithEmailAndPassword')
      .and
      .callFake(fakeEmailSignInHandler),
    signOut: jasmine
      .createSpy('signOut')
      .and
      .callFake(fakeSignOutHandler),
    signInWithPopup: jasmine
      .createSpy('signInWithPopup')
      .and
      .callFake(fakePopupSignInHandler),
  },
};

let router = {
  navigate: jasmine.createSpy('navigate')
};

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [

        {provide: AngularFireAuth, useValue: angularFireAuthStub},
        {provide: AngularFirestore, useValue: angularFirestoreStub},
        {provide: Router, useValue: router},
        AuthService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });
  });

  afterEach(() => {
    fakeAuthState.next(null);
  });

  it('should be created and the user should not be auth', fakeAsync(inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
    expect(service.user).toBeDefined();

    let sub = service.user.subscribe(
      user => {
        expect(user).toBeFalsy();
      }
    );
    sub.unsubscribe();
  })));

  it('it should return return user object from firestore if auth', fakeAsync(inject([AuthService], (service: AuthService) => {

    service.credentialsLogin(credentialsMock);

    let sub = service.user.subscribe(
      user => {
        expect(user.email).toBe('mail');
      }
    );
    sub.unsubscribe();
  })));

  it('it should login with google and update user', fakeAsync(inject([AuthService], (service: AuthService) => {

    service.googleLogin();

    let sub = service.user.subscribe(
      user => {
        expect(user.email).toBe('mail');
      }
    );

    expect(angularFireAuthStub.auth.signInWithPopup).toHaveBeenCalled();
    sub.unsubscribe();
  })));

  it('it should sign out and navigate to root', fakeAsync(inject([AuthService], (service: AuthService) => {

    service.googleLogin();

    service.signOut().then(
      ignore => expect(router.navigate).toHaveBeenCalled()
    );
    let sub = service.user.subscribe(
      user => {
        expect(user).toBeFalsy();
      }
    );

    sub.unsubscribe();
  })));
});

