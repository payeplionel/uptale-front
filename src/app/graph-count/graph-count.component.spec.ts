import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCountComponent } from './graph-count.component';

describe('GraphCountComponent', () => {
  let component: GraphCountComponent;
  let fixture: ComponentFixture<GraphCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
