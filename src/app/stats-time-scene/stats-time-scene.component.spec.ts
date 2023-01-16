import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTimeSceneComponent } from './stats-time-scene.component';

describe('StatsTimeSceneComponent', () => {
  let component: StatsTimeSceneComponent;
  let fixture: ComponentFixture<StatsTimeSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsTimeSceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTimeSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
