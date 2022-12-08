import { Observable, Subscriber } from 'rxjs'

const obs$ = new Observable((subscriber: Subscriber<string>) => {
    setTimeout(() => {
        subscriber.next('A')
    }, 100)
    setTimeout(() => {
        subscriber.next('B')
    }, 200)
    setTimeout(() => {
        subscriber.next('C')
    }, 300)
    setTimeout(() => {
        subscriber.next('D')
        subscriber.complete()
    }, 3000)
})

const observer = {
    next(letter: string) {
        console.log(letter)
    },
    error(err: Error) {
        console.log(err)
    },
    complete() {
        console.log('finish')
    }
}

obs$.subscribe(observer)