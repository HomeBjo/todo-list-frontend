import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environments';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss'
})
export class AllTodosComponent {

  todos:any = [];
  constructor(private http: HttpClient){}

  async ngOnInit() {
    this.todos = await this.loadTodos();
    console.log('das hier',this.todos)

  }
  loadTodos(){
    const url = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get(url))

  }

}
