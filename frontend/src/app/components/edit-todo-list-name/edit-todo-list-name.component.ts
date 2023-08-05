import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-todo-list-name',
  templateUrl: './edit-todo-list-name.component.html',
  styleUrls: ['./edit-todo-list-name.component.css']
})
export class EditTodoListNameComponent {
  @Input() handleEdit: () => void;


}
