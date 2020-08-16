import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Response } from '../interfaces/response';
import { Todo } from '../interfaces/todo';
@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  getAlltodos(): Observable<Response> {
    return this.http
      .get<Response>('http://localhost:8000/api/fetchTodos', {
        observe: 'response',
      })
      .pipe(map((response) => response.body));
  }

  insertTodo(todoTitle: string): Observable<Response> {
    // return todoTitle;
    return this.http.post<Response>('http://localhost:8000/api/createTodo', {
      title: todoTitle,
    });
  }

  deleteTodo(id) {
    return this.http.get('http://localhost:8000/api/deleteTodo/' + id);
  }

  completeTodo(id: number): Observable<Response> {
    return this.http.post<Response>('http://localhost:8000/api/completeTodo', {
      completed: 1,
      id: id,
    });
  }

  uncompleteTodo(id: number) {
    return this.http.post('http://localhost:8000/api/uncompleteTodo', {
      completed: 0,
      id: id,
    });
  }

  updateTodo(todo: Todo) {
    return this.http.post('http://localhost:8000/api/updateTodo', {
      title: todo.title,
      id: todo.id,
    });
  }
}
