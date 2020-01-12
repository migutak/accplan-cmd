import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemdefinitionComponent } from './problemdefinition.component';

describe('ProblemdefinitionComponent', () => {
  let component: ProblemdefinitionComponent;
  let fixture: ComponentFixture<ProblemdefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemdefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemdefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
