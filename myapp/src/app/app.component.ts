import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, fromEvent, interval, mergeMap, Observable, switchMap } from 'rxjs';
import { IMessage, Message, MessageService } from './core/services/message.service';
import { User, UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  messages: Observable<Message[]> = new Observable()

  @ViewChild('mybutton')
  btn!: ElementRef

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngAfterViewInit() {
    const btn$ = fromEvent(this.btn.nativeElement, 'click')
      .pipe(
          switchMap(event => interval(1000))
      )
      .subscribe((nb) => {
         console.log(nb)
      })
  }

  ngOnInit(): void {
    
    // this.messageService.getAll().subscribe((messages: Message[]) => {
    //   this.messages = messages
    // })
   /* this.userService.getAll()
      .pipe(
        // create witch switchMap function
        switchMap((users: User[]) => {
          // create witch mergeMap function
          return this.messageService.getAll()
        })
      ).subscribe(() => {

      })
      */

      /*forkJoin([ this.userService.getAll(), this.messageService.getAll() ])
        .pipe(

        )
        .subscribe(([ users, messages ]: [User[], Message[]]) => {
           console.log(users, messages)
        })*/
     
  }
}
