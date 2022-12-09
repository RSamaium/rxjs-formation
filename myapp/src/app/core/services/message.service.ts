import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, empty, filter, fromEvent, interval, map, Observable, of, retry, retryWhen, Subject, switchMap, takeUntil, tap, throwError, withLatestFrom } from 'rxjs';

export interface IMessage {
  userId: number
  id: number
  title?: string
  body: string
}

export class Message {
  constructor(private msg: IMessage) { }

  getBody() {
    return this.msg.body
  }
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly url: string = 'https://jsonplaceholder.typicode.com/posts'
  private _search$: BehaviorSubject<string> = new BehaviorSubject('') // state
  private _messages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([])

  get search$(): Observable<string> { // getter or selector
    return this._search$.asObservable()
  }

  get messages$(): Observable<Message[]> {
    return this._messages$.asObservable()
  }

  constructor(private http: HttpClient) { }

  searchMessage(str: string) {
    this._search$.next(str) // mutation
  }

  getAll(): Observable<Message[]> {
    return this.http.get<IMessage[]>(this.url)
      .pipe(
        map((messages: IMessage[]) =>
          messages.map(message => new Message(message))),
        tap((messages: Message[]) => {
          this._messages$.next(messages) // mutation
        })
      )
  }

  create(payload: { body: string }): Observable<Message> {
    return this.http.post<IMessage>(this.url, payload)
      .pipe(
        map((message: IMessage) => new Message(message))
      )
  }

  intervalFetch(notifierMessage$: Subject<void>): Observable<Message[]> {
    return interval(1000)
      .pipe(
        switchMap(() => this.getAll()),
        takeUntil(notifierMessage$)
      )
  }

  messageChanges(chatInputElement: HTMLElement, sendButtonElement: HTMLElement): Observable<Message> {
    const chatInput = fromEvent(chatInputElement, 'keyup')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value)
      )

    const chatOutput = fromEvent(sendButtonElement, 'click')
      .pipe(
        withLatestFrom(chatInput, (_, message) => message),
        filter(message => message.length > 0),
        switchMap(message => this.create({ body: message })),
        //retry(3),
        catchError((err: Error) => {
          console.log(err)
          return throwError(() => err)
        })
      )

    return chatOutput
  }
}
