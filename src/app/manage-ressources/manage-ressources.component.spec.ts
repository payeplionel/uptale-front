import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRessourcesComponent } from './manage-ressources.component';

describe('ManageRessourcesComponent', () => {
  let component: ManageRessourcesComponent;
  let fixture: ComponentFixture<ManageRessourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRessourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
