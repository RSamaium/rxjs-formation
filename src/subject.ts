import { AsyncSubject, BehaviorSubject, interval, Observable, ReplaySubject, Subject, Subscriber, take, takeUntil, timer } from "rxjs";

// const ob$ = interval(1000)
// const stop$ = timer(5100)
    
// ob$
//     .pipe(
//         takeUntil(stop$)
//     )
//     .subscribe(console.log)


const ob$ = new BehaviorSubject('value')

ob$.next('A')
ob$.next('B')

ob$.subscribe(console.log)