import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../../services/todo-data.service';
import { Todo } from '../../interfaces/todo';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  myTodos: Todo[] = [];
  todoTitle: string;
  beforeEditcache: string;

  constructor(private todoservice: TodoDataService) {}

  ngOnInit() {
    this.beforeEditcache = '';
    this.todoservice.getAlltodos().subscribe((data) => {
      // console.log(data.response);
      if (data.status == 200) {
        // console.log(data.response);
        data.response.forEach(
          (todo: {
            id: number;
            title: string;
            completed: boolean;
            editing: boolean;
          }) => {
            this.myTodos.push({
              id: todo.id,
              title: todo.title,
              completed: todo.completed,
              editing: todo.editing,
            });
          }
        );
      }
    });
    console.log(this.myTodos);
  }

  createTodo() {
    // console.log(this.todoTitle);
    this.todoservice.insertTodo(this.todoTitle).subscribe((data) => {
      console.log(data.response[0]);
      if (data.status == 200) {
        this.myTodos.unshift({
          id: data.response[0].id,
          title: data.response[0].title,
          completed: data.response[0].completed,
          editing: data.response[0].editing,
        });
      }
    });

    this.todoTitle = '';
  }

  deleteTodo(id: number) {
    this.todoservice.deleteTodo(id).subscribe((data) => {
      this.myTodos = this.myTodos.filter((todo) => todo.id != id);
    });
  }

  completeTodo(event, id: number) {
    if (event.target.checked) {
      console.log('checked');
      this.todoservice.completeTodo(id).subscribe((data) => {
        // this.myTodos = this.myTodos.filter()
        console.log(data);
      });
    } else {
      this.todoservice.uncompleteTodo(id).subscribe((data) => {
        // this.myTodos = this.myTodos.filter()
        console.log(data);
      });
    }
  }

  editTodo(todo: Todo) {
    if (todo.completed) {
      return false;
    }

    todo.editing = false;
    this.beforeEditcache = todo.title;
  }

  updateTodo(todo: Todo) {
    // console.log(todo.title);
    if (todo.title.trim().length == 0) {
      todo.title = this.beforeEditcache;
    }

    this.todoservice.updateTodo(todo).subscribe((data) => {});

    todo.editing = true;
  }

  remainingCount() {
    return this.myTodos.filter((todo) => !todo.completed).length;
  }
}
