import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMarbleGraphComponent } from './ui-marble-graph.component';

describe('UiMarbleGraphComponent', () => {
  let component: UiMarbleGraphComponent;
  let fixture: ComponentFixture<UiMarbleGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UiMarbleGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiMarbleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
