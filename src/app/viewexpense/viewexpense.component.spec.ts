import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpenseComponent } from './viewexpense.component';

describe('ViewexpenseComponent', () => {
  let component: ViewExpenseComponent;
  let fixture: ComponentFixture<ViewExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
