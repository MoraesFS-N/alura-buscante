import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksResult } from '../models/BooksResult.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  findAll(value: string): Observable<BooksResult> {
    const params = new HttpParams().append('q', value);

    return this.http.get<BooksResult>(this.API, { params });
  }
}
