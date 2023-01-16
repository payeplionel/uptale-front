import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAnswerGroupComponent } from './stats-answer-group.component';

describe('StatsAnswerGroupComponent', () => {
  let component: StatsAnswerGroupComponent;
  let fixture: ComponentFixture<StatsAnswerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsAnswerGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsAnswerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
