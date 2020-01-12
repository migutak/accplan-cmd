import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerproposalComponent } from './customerproposal.component';

describe('CustomerproposalComponent', () => {
  let component: CustomerproposalComponent;
  let fixture: ComponentFixture<CustomerproposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerproposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerproposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
