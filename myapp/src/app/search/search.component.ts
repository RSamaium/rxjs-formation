import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MessageService } from '../core/services/message.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: FormControl = new FormControl()

  constructor(private messageService: MessageService) {}

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