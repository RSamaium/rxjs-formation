import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { forkJoin, fromEvent, interval, mergeMap, Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
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
  notifierMessage$: Subject<void> = new Subject()
  search$: Observable<string> = this.messageService.search$
  //subscriptionMessage!: Subscription

  @ViewChild('mybutton')
  btn!: ElementRef

  @ViewChild('msg')
  chatInput!: ElementRef

  @ViewChild('send')
  btnSend!: ElementRef

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
    this.messageService.messageChanges(
      this.chatInput.nativeElement,
      this.btnSend.nativeElement
    ).subscribe((message: Message) => {
      console.log('message créé', message)
    })
  }

  ngOnInit(): void {
    /*this.messageService.search$.subscribe((str: string) => {
       console.log(str)
    })*/

    this.messageService.intervalFetch()
      .pipe(
        takeUntil(this.notifierMessage$)
      )
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
   // this.subscriptionMessage.unsubscribe()
   this.notifierMessage$.next()
   this.notifierMessage$.complete()
  }
}