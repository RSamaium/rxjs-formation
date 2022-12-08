import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User { 
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
export interface Address { 
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
export interface Geo { 
  lat: string;
  lng: string;
}
export interface Company { 
  name: string;
  catchPhrase: string;
  bs: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url: string = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id)
  }
}
