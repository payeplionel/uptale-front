import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLearnerComponent } from './list-learner.component';

describe('ListLearnerComponent', () => {
  let component: ListLearnerComponent;
  let fixture: ComponentFixture<ListLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLearnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
