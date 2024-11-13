import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject : BehaviorSubject<string>
  public searchObservable : Observable<string>

  constructor() { 
    this.searchSubject = new BehaviorSubject<string>('');
    this.searchObservable = this.searchSubject.asObservable();
  }

  textEmitter(text: string) {
    this.searchSubject.next(text);
  }

}
