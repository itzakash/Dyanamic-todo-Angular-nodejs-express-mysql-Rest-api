import { Component } from '@angular/core';
import { TodoDataService } from './services/todo-data.service';
import { Todo } from './interfaces/todo';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dyanamic-todo';
}
