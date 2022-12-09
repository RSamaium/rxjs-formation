import { TestScheduler  } from "rxjs/testing";
import assert from "assert";
import { of } from "rxjs";

const testScheduler = new TestScheduler((actual, expected) => {
    assert.deepStrictEqual(actual, expected)
})

testScheduler.run((helpers) => {
    const { expectObservable } = helpers
    const sources$ = of(1, 2, 3)
    const expectMarble = '(abc|)'
    const expectedValues =  { a: 1, b: 2, c: 3 }
    expectObservable(sources$).toBe(expectMarble, expectedValues)
})