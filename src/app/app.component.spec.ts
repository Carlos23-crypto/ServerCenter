import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs'; // Necesario para simular eventos del Router

describe('AppComponent', () => {
  let routerEventsSubject: Subject<any>; // Subject para simular eventos del Router

  beforeEach(async () => {
    routerEventsSubject = new Subject<any>(); // Inicializamos el Subject

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            events: routerEventsSubject.asObservable(), // Mock del Router
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'navegacion' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('navegacion');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, navegacion');
  });

  it('should hide header when URL is "/principal"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Simulamos un evento NavigationEnd
    const mockEvent = new NavigationEnd(
      1, // id
      '/principal', // url
      '/principal', // urlAfterRedirects
    );
    
    // Emitimos el evento mockeado
    routerEventsSubject.next(mockEvent);

    // Verificamos que showHeader sea false si la URL es "/principal"
    expect(app.showHeader).toBeFalse(); // o `toBe(false)`
  });
});