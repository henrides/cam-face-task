import { TestSlidesComponent } from './test-slides/test-slides.component';
import { TestSelectionComponent } from './test-selection/test-selection.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestCompleteComponent } from './test-complete/test-complete.component';

const routes: Routes = [
  { path: '', redirectTo: '/test-selection', pathMatch: 'full' },
  { path: 'test-selection', component: TestSelectionComponent },
  { path: 'test-slides', component: TestSlidesComponent },
  { path: 'test-complete', component: TestCompleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
