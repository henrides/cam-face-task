import { TestManagerService } from './../test-manager.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-complete',
  templateUrl: './test-complete.component.html',
  styleUrls: ['./test-complete.component.scss']
})
export class TestCompleteComponent implements OnInit {

  constructor(private testManager: TestManagerService, private router: Router) { }

  ngOnInit(): void {
    if (!this.testManager.isInitialized) {
      this.testManager.initilizeFromStorage().subscribe(() => {
        if (this.testManager.currentTestSlide) {
          this.router.navigate(['./test-slides']);
        }
      },
      (error) => {
        console.log('Could not initialize test: ', JSON.stringify(error));
        this.router.navigate(['./test-selection']);
      });
    }
  }

  public save(): void {
    this.testManager.downloadResults();
  }

  public restart(): void {
    this.testManager.reset();
    this.router.navigate(['./test-selection']);
  }
}
