import { Observable, Subject } from "rxjs";
import { io } from 'socket.io'

// cold
const cold$ = new Observable((subscriber) => {
    setTimeout(() => {
        console.log('ok')
        subscriber.next('ok')
    }, 1000)
})

cold$.subscribe()
cold$.subscribe()
cold$.subscribe()
cold$.subscribe()

/*
const hot$ = new Subject()

setTimeout(() => {
    console.log('ok')
    hot$.next('ok')
}, 1000)

//hot$.subscribe(console.log)
*/

const socket = io()

const hot$ = new Observable((subscriber) => {
    socket.on('welcome', (data) => {
        subscriber.next(data)
    })
})

hot$.subscribe((data) => {
    console.log(data)
})
hot$.subscribe((data) => {
    console.log(data)
})
hot$.subscribe((data) => {
    console.log(data)
})
