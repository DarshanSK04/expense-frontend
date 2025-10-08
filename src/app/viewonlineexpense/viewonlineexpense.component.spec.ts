import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewonlineexpenseComponent } from './viewonlineexpense.component';

describe('ViewonlineexpenseComponent', () => {
  let component: ViewonlineexpenseComponent;
  let fixture: ComponentFixture<ViewonlineexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewonlineexpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewonlineexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
