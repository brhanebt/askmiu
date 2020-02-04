import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtopicComponent } from './addtopic.component';

describe('AddtopicComponent', () => {
  let component: AddtopicComponent;
  let fixture: ComponentFixture<AddtopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
