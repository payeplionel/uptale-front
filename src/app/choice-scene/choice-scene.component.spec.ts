import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceSceneComponent } from './choice-scene.component';

describe('ChoiceSceneComponent', () => {
  let component: ChoiceSceneComponent;
  let fixture: ComponentFixture<ChoiceSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceSceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
