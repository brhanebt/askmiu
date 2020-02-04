import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowtopicsComponent } from './followtopics.component';

describe('FollowtopicsComponent', () => {
  let component: FollowtopicsComponent;
  let fixture: ComponentFixture<FollowtopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowtopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowtopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
