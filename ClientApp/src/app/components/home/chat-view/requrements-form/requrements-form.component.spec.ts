import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequrementsFormComponent } from './requrements-form.component';

describe('RequrementsFormComponent', () => {
  let component: RequrementsFormComponent;
  let fixture: ComponentFixture<RequrementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequrementsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequrementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
