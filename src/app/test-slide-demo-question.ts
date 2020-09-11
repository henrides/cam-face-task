import { TestDataSlide } from './test-manager.service';
import { TestSlide } from './test-slide';

export class TestSlideDemoQuestion implements TestSlide {
    public isInstructions = false;
    public isQuestion = true;
    public isDemo = true;
    public isBreak = false;

    public videoSrc: string;
    public choices: Array<string>;
    constructor(public id: string, testDataSlide: TestDataSlide) {
        this.videoSrc = testDataSlide.videoSrc;
        this.choices = [...testDataSlide.choices];
    }
}
