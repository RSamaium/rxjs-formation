import { combineLatest, combineLatestAll, combineLatestWith, Observable, of, zip } from "rxjs";

const ob$1 = of(1, 2, 3, 4, 5, 6)
const ob$2 = of('A', 'B', 'C', 'D')

const combined$ = ob$1.pipe(
    combineLatestWith(ob$2)
)

combined$.subscribe((array) => {
    console.log(array)
})
