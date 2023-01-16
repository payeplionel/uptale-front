import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSceneComponent } from './time-scene.component';

describe('TimeSceneComponent', () => {
  let component: TimeSceneComponent;
  let fixture: ComponentFixture<TimeSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
