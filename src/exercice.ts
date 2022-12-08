// Créez un Observable qui émet les nombres de 1 à 10, puis se termine

import { Observable, Subscriber } from "rxjs";

const objs$ = new Observable((subscriber: Subscriber<number>) => {
    for (let i=1 ; i <= 10 ; i++) {
        subscriber.next(i)
    }
    subscriber.complete()
})

objs$.subscribe({
    next(nb: number) {
        console.log(nb)
    },
    complete() {
        console.log('fin')
    }
})