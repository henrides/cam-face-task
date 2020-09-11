import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSlidesComponent } from './test-slides.component';

describe('TestSlidesComponent', () => {
  let component: TestSlidesComponent;
  let fixture: ComponentFixture<TestSlidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSlidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
