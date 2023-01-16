import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSelectorComponent } from './information-selector.component';

describe('InformationSelectorComponent', () => {
  let component: InformationSelectorComponent;
  let fixture: ComponentFixture<InformationSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
