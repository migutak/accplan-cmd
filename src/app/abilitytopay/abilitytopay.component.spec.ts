import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitytopayComponent } from './abilitytopay.component';

describe('AbilitytopayComponent', () => {
  let component: AbilitytopayComponent;
  let fixture: ComponentFixture<AbilitytopayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbilitytopayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilitytopayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
