import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiOperatorShowcaseComponent } from './ui-operator-showcase.component';

describe('UiOperatorShowcaseComponent', () => {
  let component: UiOperatorShowcaseComponent;
  let fixture: ComponentFixture<UiOperatorShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiOperatorShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiOperatorShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
