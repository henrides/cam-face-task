import { TestManagerService, TestData } from './../test-manager.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-selection',
  templateUrl: './test-selection.component.html',
  styleUrls: ['./test-selection.component.scss']
})
export class TestSelectionComponent implements OnInit {
  private data: TestData;

  constructor(public http: HttpClient, public router: Router, public testManager: TestManagerService) { }

  ngOnInit(): void {
    /*
    this.http.get('assets/cam-face-task.json').subscribe((data: TestData) => {
      this.data = data;
    });
    */
  }

  public continue(): void {
    this.testManager.initializeTest('assets/cam-face-task.json', 'fr').subscribe(() => {
      this.router.navigate(['/test-slides']);
    });
  }

}
