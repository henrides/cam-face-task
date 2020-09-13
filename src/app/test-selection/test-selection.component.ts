import { TestManagerService, TestData } from './../test-manager.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AvailableTest {
  title: string;
  description: string;
  credits: string;
  languages: Array<string>;
  source: string;
}
interface AvailableTests {
  tests: Array<AvailableTest>;
}
@Component({
  selector: 'app-test-selection',
  templateUrl: './test-selection.component.html',
  styleUrls: ['./test-selection.component.scss']
})
export class TestSelectionComponent implements OnInit {
  public tests: Array<AvailableTest>;

  public selectedTest: AvailableTest;
  public selectedLanguage: string;

  constructor(public http: HttpClient, public router: Router, public testManager: TestManagerService) { }

  ngOnInit(): void {
    this.http.get('assets/tests.json').subscribe((data: AvailableTests) => {
      this.tests = data.tests;
    });
  }

  public canContinue(): boolean {
    return !!this.selectedTest && !!this.selectedLanguage;
  }

  public continue(): void {
    this.testManager.initializeTest(this.selectedTest.source, this.selectedLanguage).subscribe(() => {
      this.router.navigate(['/test-slides']);
    });
  }
}
