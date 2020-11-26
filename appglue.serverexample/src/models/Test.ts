interface ITest {
    text: string;
}

export default class Test implements ITest {
    text: string = '';

    constructor(text: string) {
        this.text = text;
    }
}
