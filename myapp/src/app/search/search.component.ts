import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap, timer } from 'rxjs';
import { IMessage, Message, MessageService } from '../core/services/message.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: FormControl = new FormControl('', [], [
    (input: AbstractControl): Observable<{ messageExists: boolean } | null> => {
       /*return this.http.get<IMessage>('https://jsonplaceholder.typicode.com/posts/1')
        .pipe(
          map(message => message.title?.includes(input.value) ? { messageExists: true } : null)
        )
        */
       return timer(2000)
          .pipe(
            switchMap(() => this.http.get<IMessage>('https://jsonplaceholder.typicode.com/posts/1')),
            map(message => message.title?.includes(input.value) ? { messageExists: true } : null)
          )
    }
  ])

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
          debounceTime(500),
          distinctUntilChanged()
      )
      .subscribe((str: string) => {
          this.messageService.searchMessage(str) // action
      })
  }
}