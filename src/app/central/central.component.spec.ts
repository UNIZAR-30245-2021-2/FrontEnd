import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CentralComponent } from './central.component';

describe('CentralComponent', () => {
  let component: CentralComponent;
  let fixture: ComponentFixture<CentralComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
