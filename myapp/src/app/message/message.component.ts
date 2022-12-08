import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { forkJoin, fromEvent, interval, mergeMap, Observable, Subscription, switchMap } from 'rxjs';
import { IMessage, Message, MessageService } from 'src/app/core/services/message.service';
import { User, UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit, OnDestroy {
  // préférer pipe async !
  //messages: Observable<Message[]> = new Observable()
  messages: any
  subscriptionMessage!: Subscription

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
    this.subscriptionMessage = this.messageService.intervalFetch()
      .subscribe((messages) => {
        this.messages = messages
      })
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

  ngOnDestroy() {
    this.subscriptionMessage.unsubscribe()
  }
}