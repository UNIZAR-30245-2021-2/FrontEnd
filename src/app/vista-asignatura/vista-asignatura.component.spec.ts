import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VistaAsignaturaComponent } from './vista-asignatura.component';

describe('VistaAsignaturaComponent', () => {
  let component: VistaAsignaturaComponent;
  let fixture: ComponentFixture<VistaAsignaturaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaAsignaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
