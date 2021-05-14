import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTemaComponent } from './ver-tema.component';

describe('VerTemaComponent', () => {
  let component: VerTemaComponent;
  let fixture: ComponentFixture<VerTemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
