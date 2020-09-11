import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSelectionComponent } from './test-selection.component';

describe('TestSelectionComponent', () => {
  let component: TestSelectionComponent;
  let fixture: ComponentFixture<TestSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
