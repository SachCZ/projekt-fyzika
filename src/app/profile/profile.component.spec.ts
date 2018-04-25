import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {AppModule} from "../app.module";
import {APP_BASE_HREF} from "@angular/common";
import {AuthService} from "../core/auth.service";
import {MatSnackBar} from "@angular/material";

//TODO write unit tests for ProfileComponent
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: AuthService;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}, AuthService, MatSnackBar]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.get(AuthService);
    snackBar = TestBed.get(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle valid response and inform the user', fakeAsync(() => {

    spyOn(authService, 'googleLogin').and.returnValue(Promise.resolve());
    spyOn(snackBar, 'open');
    component.googleLogin();
    flush();
    expect(authService.googleLogin).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Přihlášení proběhlo úspěšně.', 'OK', {
      duration: 2000,
    });
  }));

  it('should handle network response failed', fakeAsync(() => {

    spyOn(authService, 'googleLogin').and.returnValue(Promise.reject({code: 'auth/network-request-failed'}));
    spyOn(snackBar, 'open');
    component.googleLogin();
    flush();
    expect(authService.googleLogin).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Nepodařilo se navázat spojení se serverem, zkontrolujte připojení k internetu', 'OK', {
      duration: 2000,
    });
  }));

  it('should handle blocked user', fakeAsync(() => {

    spyOn(authService, 'googleLogin').and.returnValue(Promise.reject({code: 'auth/user-disabled'}));
    spyOn(snackBar, 'open');
    component.googleLogin();
    flush();
    expect(authService.googleLogin).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Nepodařilo se přihlásit, uživatelský účet zablokován.', 'OK', {
      duration: 2000,
    });
  }));

  it('should handle too many requests', fakeAsync(() => {

    spyOn(authService, 'googleLogin').and.returnValue(Promise.reject({code: 'auth/too-many-requests'}));
    spyOn(snackBar, 'open');
    component.googleLogin();
    flush();
    expect(authService.googleLogin).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Nepodařilo se přihlásit, příliš mnoho pokusů, zkuste to prosím později.', 'OK', {
      duration: 2000,
    });
  }));

  it('should throw if no known error is caught', fakeAsync(() => {

    spyOn(authService, 'googleLogin').and.returnValue(Promise.reject({code: 'mock other'}));
    spyOn(snackBar, 'open');
    expect(() => {
      component.googleLogin();
      flush();
    }).toThrow();
    flush();
    expect(authService.googleLogin).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Nepodařilo se přihlásit. Pokud problémy přetrvávají kontaktujte admina.', 'OK', {
      duration: 2000,
    });
  }));


});
