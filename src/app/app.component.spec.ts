import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {MyOwnMaterialModule} from "./app.module";
import {BrowserModule} from "@angular/platform-browser";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {APP_BASE_HREF} from "@angular/common";
import {ProfileComponent} from "./profile/profile.component";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DashboardComponent,
        ProfileComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MyOwnMaterialModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should be at least one item in the main menu', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const elementList = compiled.querySelectorAll('.mat-toolbar a.mat-button');


    expect(elementList.length).toBeGreaterThanOrEqual(1);
  }));

  it('should display whole men not display small icon u and not overflow when viewport is bigger than 960', async(() => {

    viewport.set('md');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const menuContainer = compiled.querySelector('.mat-toolbar > div');
    const elementList = compiled.querySelectorAll('.mat-toolbar a.mat-button');
    const icon = compiled.querySelector('.mat-toolbar > mat-icon');

    expect(icon.offsetParent).toBeFalsy();
    expect(menuContainer.offsetParent).toBeTruthy();

    let width = 0;
    elementList.forEach(element => {
      width += element.offsetWidth;
    });
    expect(width).toBeLessThan(960); //lt-md
  }));

  it('should not display whole menu when width is less than 960 and should display small icon', async(() => {
    viewport.set('sm');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;


    const menuContainer = compiled.querySelector('.mat-toolbar > div');
    const icon = compiled.querySelector('.mat-toolbar > mat-icon');

    expect(menuContainer.offsetParent).toBeFalsy();
    expect(icon.offsetParent).toBeTruthy();

  }));
});
