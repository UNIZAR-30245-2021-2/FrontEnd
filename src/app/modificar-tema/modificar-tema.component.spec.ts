import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTemaComponent } from './modificar-tema.component';

describe('ModificarTemaComponent', () => {
  let component: ModificarTemaComponent;
  let fixture: ComponentFixture<ModificarTemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
