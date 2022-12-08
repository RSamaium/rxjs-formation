import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, empty, filter, fromEvent, interval, map, Observable, of, switchMap, throwError, withLatestFrom } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  getAll(): Observable<Message[]> {
    return this.http.get<IMessage[]>(this.url)
      .pipe(
        map((messages: IMessage[]) =>
          messages.map(message => new Message(message)))
      )
  }

  create(payload: { body: string }): Observable<Message> {
    return this.http.post<IMessage>(this.url, payload)
      .pipe(
        map((message: IMessage) => new Message(message))
      )
  }

  intervalFetch(): Observable<Message[]> {
    return interval(1000)
      .pipe(
        switchMap(() => this.getAll())
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
        catchError((err: Error) => {
          console.log(err)
          return throwError(() => err)
        })
      )

    return chatOutput
  }
}
