import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface IMessage {
  userId: number
  id: number
  title?: string
  body: string
}

export class Message {
  constructor(private msg: IMessage) {}

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
}
