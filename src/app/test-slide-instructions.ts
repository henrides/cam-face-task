import { TestSlide } from './test-slide';

export class TestSlideInstructions implements TestSlide {
    public isInstructions = true;
    public isQuestion = false;
    public isDemo = false;
    public isBreak = false;
    constructor(public id: string, public instructions: Array<string>) {}
}
