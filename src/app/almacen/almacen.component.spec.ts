import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenComponent } from './almacen.component';

describe('AlmacenComponent', () => {
  let component: AlmacenComponent;
  let fixture: ComponentFixture<AlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmacenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
