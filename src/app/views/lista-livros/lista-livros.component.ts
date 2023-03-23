import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { Book } from 'src/app/models/Book.interface';
import { BooksResult } from 'src/app/models/BooksResult.interface';
import { BookVolumeInfo } from 'src/app/models/BookVolumeInfo';
import { Item } from 'src/app/models/Item.interface';
import { BookService } from 'src/app/service/book.service';

const STOP_TIME = 700;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  books: Book[];
  search = new FormControl();
  errorMessage: string = '';
  booksResult: BooksResult;

  constructor(private service: BookService) {}

  booksSearched$ = this.search.valueChanges.pipe(
    debounceTime(STOP_TIME),
    filter((value) => value.length >= 3),
    switchMap((value) => this.service.findAll(value)),
    map((result) => (this.booksResult = result)),
    map((response) => response.items ?? []),
    map((items) => this.mapResultToModelBook(items)),
    catchError(() => {
      return throwError(
        () =>
          new Error(
            (this.errorMessage =
              'Ocorreu um erro. Por favor, recarregue a aplicação!')
          )
      );
    })
  );

  mapResultToModelBook(items: Item[]): BookVolumeInfo[] {
    return items.map((item) => {
      return new BookVolumeInfo(item);
    });
  }
}
