import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemasComponent } from './sistemas.component';

describe('SistemasComponent', () => {
  let component: SistemasComponent;
  let fixture: ComponentFixture<SistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SistemasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
