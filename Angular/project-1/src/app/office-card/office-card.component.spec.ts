import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeCardComponent } from './office-card.component';

describe('OfficeCardComponent', () => {
  let component: OfficeCardComponent;
  let fixture: ComponentFixture<OfficeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
