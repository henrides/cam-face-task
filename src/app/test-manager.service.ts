import { TestSlideDemoQuestion } from './test-slide-demo-question';
import { TestSlideQuestion } from './test-slide-question';
import { TestSlideInstructions } from './test-slide-instructions';
import { TestSlide } from './test-slide';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TestDataSlide {
  id: string;
  videoSrc: string;
  answer: string;
  choices: Array<string>;
}

export interface TestData {
  instructions: string;
  demoSlides: Array<TestDataSlide>;
  demoCompleteInstructions?: string;
  finishThanks?: string;
  slides: Array<TestDataSlide>;
  dictionary?: any;
  avg: number;
  stddev: number;
}

@Injectable({
  providedIn: 'root'
})
export class TestManagerService {
  public isInitialized = false;
  private testData: TestData;
  private slides: Array<TestSlide> = [];
  private currentSlideIndex = 0;
  private answers: Map<string, string>;
  private language: string;

  constructor(private http: HttpClient) { }

  public initializeTest(testSrc: string, language: string): Observable<boolean> {
    this.language = language;
    return this.http.get(testSrc).pipe(
      map((testData: TestData) => {
        this.testData = testData;
        this.answers = new Map<string, string>();
        if (testData.instructions) {
          this.slides.push(new TestSlideInstructions('instruction1', testData.instructions));
        }
        if (testData.demoSlides && testData.demoSlides.length > 0) {
          testData.demoSlides.forEach(demoSlide => {
            this.slides.push(new TestSlideDemoQuestion(demoSlide.id, demoSlide));
          });
        }
        if (testData.demoCompleteInstructions) {
          this.slides.push(new TestSlideInstructions('instruction2', testData.demoCompleteInstructions));
        }
        if (testData.slides && testData.slides.length > 0) {
          const tmpSlides = [...testData.slides];
          this.shuffleArray(tmpSlides);
          tmpSlides.forEach(slide => {
            this.slides.push(new TestSlideQuestion(slide.id, slide));
          });
        }
        this.isInitialized = true;
        sessionStorage.setItem('testSrc', testSrc);
        sessionStorage.setItem('language', language);
        return true;
      })
    );
  }

  public initilizeFromStorage(): Observable<boolean> {
    if (!this.isInitialized) {
      const language = sessionStorage.getItem('language');
      if (language) {
        this.language = language;
      } else {
        this.language = 'en';
      }
      const testSrc = sessionStorage.getItem('testSrc');
      if (testSrc) {
        this.answers = new Map(JSON.parse(sessionStorage.getItem('answers')));
        return this.http.get(testSrc).pipe(
          map((testData: TestData) => {
            this.testData = testData;
            if (testData.slides && testData.slides.length > 0) {
              const unansweredSlides = [];
              testData.slides.forEach((slide: TestDataSlide) => {
                if (!this.answers.get(slide.id)) {
                  unansweredSlides.push(slide);
                }
              });
              this.shuffleArray(unansweredSlides);
              unansweredSlides.forEach(slide => {
                this.slides.push(new TestSlideQuestion(slide.id, slide));
              });
            }
            this.isInitialized = true;
            return true;
          })
        );
      } else {
        return throwError('no test pending');
      }
    } else {
      return of(true);
    }
  }

  public get currentTestSlide(): TestSlide {
    return this.slides[this.currentSlideIndex];
  }

  public get hasNextSlide(): boolean {
    return this.currentSlideIndex < (this.slides.length - 1);
  }

  public getNextTestSlide(): TestSlide {
    if (!this.hasNextSlide) {
      return null;
    }
    this.currentSlideIndex = this.currentSlideIndex + 1;
    return this.currentTestSlide;
  }

  public recordAnswer(id: string, answer: string): void {
    this.answers.set(id, answer);
    sessionStorage.setItem('answers', JSON.stringify(Array.from(this.answers.entries())));
  }

  public getFinishThanks(): string | Array<string> {
    return this.translate(this.testData.finishThanks);
  }

  private shuffleArray(array: Array<any>): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  public downloadResults(): void {
    let rightAnswers = 0;
    const elem = document.createElement('a');
    const encodedLines = [];
    encodedLines.push('id,right answer,provided answer,score,Z');
    this.testData.slides.forEach((slideQuestion: TestDataSlide) => {
      const rightAnswer = slideQuestion.answer === this.answers.get(slideQuestion.id);
      if (rightAnswer) {
        rightAnswers = rightAnswers + 1;
      }
      encodedLines.push(slideQuestion.id + ',' + slideQuestion.answer + ',' +
          this.answers.get(slideQuestion.id) + ',' +
          (rightAnswer ? '1' : '0') + ',');
    });
    encodedLines.push(',,,' + rightAnswers + ',' +
        ((rightAnswers - this.testData.avg) / this.testData.stddev));
    elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodedLines.join('\n'));
    elem.setAttribute('download', 'results.csv');

    elem.style.display = 'none';
    document.body.appendChild(elem);

    elem.click();

    document.body.removeChild(elem);
  }

  public reset(): void {
    this.answers = null;
    this.slides = [];
    this.testData = null;
    this.currentSlideIndex = 0;
    this.isInitialized = false;
    sessionStorage.removeItem('answer');
    sessionStorage.removeItem('testSrc');
  }

  public translate(key: string): string | Array<string> {
    if (!this.testData.dictionary) {
      return key;
    }
    const entry = this.testData.dictionary[key];
    if (!entry) {
      return key;
    }
    const translatedValue = entry[this.language];
    return translatedValue ? translatedValue : key;
  }
}
