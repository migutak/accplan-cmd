import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemedialofferingsComponent } from './remedialofferings.component';

describe('RemedialofferingsComponent', () => {
  let component: RemedialofferingsComponent;
  let fixture: ComponentFixture<RemedialofferingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemedialofferingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemedialofferingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
