import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewofflineexpenseComponent } from './viewofflineexpense.component';

describe('ViewofflineexpenseComponent', () => {
  let component: ViewofflineexpenseComponent;
  let fixture: ComponentFixture<ViewofflineexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewofflineexpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewofflineexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
