import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environments';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss',
})
export class AllTodosComponent {
  todos: any = [];
  error = "";
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    try {
      this.todos = await this.loadTodos();
      console.log('das hier', this.todos);
    } catch (e) {
      this.error = 'Fehler beim laden ';
    }
  }
  loadTodos() {
    const url = environment.baseUrl + '/todos/';
    localStorage.getItem('token');  //keine ahung waurm aber das muss mit rein sonst infinity reload hab ticket erstellt  dachte eigentlich intercerpter ubernimmt das 
    
    return lastValueFrom(this.http.get(url,
    
    ));
  }
}
