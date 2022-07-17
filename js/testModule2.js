
import { testClass } from './testModule.js';


export class test2 {
    constructor() {
        setTimeout(() => {
            const test = new testClass();
            test.logSomeThing();
        }, 2000);

    }
}

// new test2();