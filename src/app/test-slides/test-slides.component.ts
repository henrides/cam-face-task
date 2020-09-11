import { TestManagerService } from './../test-manager.service';
import { Component, OnInit } from '@angular/core';
import { TestSlide } from '../test-slide';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-slides',
  templateUrl: './test-slides.component.html',
  styleUrls: ['./test-slides.component.scss']
})
export class TestSlidesComponent implements OnInit {
  public slide: TestSlide;
  public answer: string;

  constructor(private testManager: TestManagerService, private router: Router) { }

  ngOnInit(): void {
    if (!this.testManager.isInitialized) {
      this.testManager.initilizeFromStorage().subscribe(() => {
        if (this.testManager.currentTestSlide) {
          this.slide = this.testManager.currentTestSlide;
        } else {
          this.router.navigate(['./test-complete']);
        }
      },
      (error) => {
        console.log('Could not initialize test: ', JSON.stringify(error));
        this.router.navigate(['./test-selection']);
      });
    } else {
      this.slide = this.testManager.currentTestSlide;
    }
  }

  public continue(): void {
    if (this.slide.isQuestion) {
      this.testManager.recordAnswer(this.slide.id, this.answer);
      this.answer = null;
    }
    if (this.testManager.hasNextSlide) {
      this.slide = this.testManager.getNextTestSlide();
    } else {
      this.router.navigate(['./test-complete']);
    }
  }

  public onSelectAnswer(answer): void {
    this.answer = answer;
  }

  public get canContinue(): boolean {
    return this.slide && (!this.slide.isQuestion || !!this.answer);
  }
}
