import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemResponseViewComponent } from './system-response-view.component';

describe('SystemResponseViewComponent', () => {
  let component: SystemResponseViewComponent;
  let fixture: ComponentFixture<SystemResponseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemResponseViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemResponseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
