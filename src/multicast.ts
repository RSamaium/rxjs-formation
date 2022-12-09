import { connectable, defer, map, Observable, of, share, shareReplay, timer } from "rxjs";

const source$ = of(1).pipe(
    map(_ => Math.random())
)

const connectable$ = connectable(source$)

connectable$.subscribe(console.log)
connectable$.subscribe(console.log)

connectable$.connect()