import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environments';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss',
})
export class AllTodosComponent {
  todos: any = [];
  error = "";
  newTodo = {
    title: '',
    my_field: false,
  };
  editingTodo: any = null;
  editingTodoIndex: number | null = null;
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
    localStorage.getItem('token'); //keine ahung waurm aber das muss mit rein sonst infinity reload hab ticket erstellt  dachte eigentlich intercerpter ubernimmt das 
    return lastValueFrom(this.http.get(url,
    
    ));
  }

  async createTodo() {
    const url = environment.baseUrl + '/todos/';
    // const token = localStorage.getItem('token');
    try {
      const newTodo = await lastValueFrom(this.http.post(url, this.newTodo));
      this.todos.push(newTodo); // Füge das neue Todo zur Liste hinzu
      this.newTodo = { title: '', my_field: false }; // Reset des Formulars
    } catch (e) {
      this.error = 'Fehler beim Erstellen des Todo-Elements';
    }
  }

  editTodo(index:any) {
    // this.editingTodo = { ...todo }; // Clone the todo to avoid direct binding
    // console.log('erstes',this.todos ,'zweitens',this.editingTodo )
    this.editingTodoIndex = index;
    this.editingTodo = { ...this.todos[index] }; // Erstelle eine Kopie des zu bearbeitenden Todos
  }

  async deleteTodo(id:any){
    const url = `${environment.baseUrl}/todos/${id}/`;
    try {
      await lastValueFrom(this.http.delete(url));
      this.todos = this.todos.filter((todo: any) => todo.id !== id); // Entferne das Todo aus der Liste
    } catch (e) {
      this.error = 'Fehler beim Löschen des Todo-Elements';
    }
  }


  async updateTodo() {
    if (this.editingTodoIndex !== null) {
      const url = `${environment.baseUrl}/todos/${this.editingTodo.id}/`;
      try {
        const updatedTodo = await lastValueFrom(this.http.patch(url, this.editingTodo));
        this.todos[this.editingTodoIndex] = updatedTodo;
        this.editingTodo = null; // Beende den Bearbeitungsmodus
        this.editingTodoIndex = null;
      } catch (e) {
        this.error = 'Fehler beim Aktualisieren des Todo-Elements';
      }
    }
  }
}