import { TestManagerService } from './test-manager.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testTranslate'
})
export class TestTranslatePipe implements PipeTransform {

  constructor(private testManager: TestManagerService) {}

  transform(value: string): string | Array<string> {
    return this.testManager.translate(value);
  }

}
