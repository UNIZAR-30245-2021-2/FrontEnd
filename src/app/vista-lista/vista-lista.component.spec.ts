import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VistaListaComponent } from './vista-lista.component';

describe('VistaListaComponent', () => {
  let component: VistaListaComponent;
  let fixture: ComponentFixture<VistaListaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
