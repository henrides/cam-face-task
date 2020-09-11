import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TestSlide } from '../test-slide';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit, OnChanges {
  @Input() slide: TestSlide;
  @Output() selectAnswer = new EventEmitter<string>();
  @ViewChild('videoPlayer') videoplayer: ElementRef;

  private value: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.value = null;
  }

  public toggleVideo(event: any): void {
    this.videoplayer.nativeElement.play();
  }

  public onChange(event): void {
    this.value = event.value;
    this.selectAnswer.emit(event.value);
  }
}
