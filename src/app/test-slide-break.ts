export class TestSlideBreak {
    public isInstructions = false;
    public isQuestion = false;
    public isDemo = false;
    public isBreak = false;

    public breakImageSrc: string;
    public breakText: Array<string>;
    constructor(public id: string) {
    }
}
