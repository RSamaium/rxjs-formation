import { bufferTime, map, Observable, Subscriber } from 'rxjs'

const obs$ = new Observable((subscriber: Subscriber<string | number>) => {
    const interval = setInterval(() => {
        const rand = Math.random()
        subscriber.next(rand)
        console.log('--', rand)
    }, 1000)
    return () => {
        clearInterval(interval)
    }
})

const observer = {
    next(letter: number) {
        console.log(letter)
    },
    error(err: Error) {
        console.log(err)
    },
    complete() {
        console.log('finish')
    }
}

const subscription = obs$
    .pipe(
        bufferTime(500),
        map(el => el.length)
    )
    .subscribe(observer)

subscription.unsubscribe()