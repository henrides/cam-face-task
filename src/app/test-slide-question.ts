import { TestSlide } from './test-slide';
import { TestDataSlide } from './test-manager.service';

export class TestSlideQuestion implements TestSlide {
    public isInstructions = false;
    public isQuestion = true;
    public isDemo = false;
    public isBreak = false;

    public videoSrc: string;
    public choices: Array<string>;
    constructor(public id: string, testDataSlide: TestDataSlide) {
        this.videoSrc = testDataSlide.videoSrc;
        this.choices = [...testDataSlide.choices];
    }
}
