import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideComponent } from './slide/slide.component';
import { TestSelectionComponent } from './test-selection/test-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { TestSlidesComponent } from './test-slides/test-slides.component';
import { TestCompleteComponent } from './test-complete/test-complete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TestTranslatePipe } from './test-translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SlideComponent,
    TestSelectionComponent,
    TestSlidesComponent,
    TestCompleteComponent,
    TestTranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
