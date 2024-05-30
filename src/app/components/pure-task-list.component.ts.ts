
import { 
    Component, 
    Input, 
    Output, 
    EventEmitter 
} from '@angular/core';
import { Task } from '../models/task.model';
@Component({
    selector: 'app-pure-task-list',
    template: `
      <div class="list-items">
            <app-task
                *ngFor="let task of tasksInOrder"
                [task]="task"
                (onArchiveTask)="onArchiveTask.emit($event)"
                (onPinTask)="onPinTask.emit($event)">
            </app-task>
            <div *ngIf="tasksInOrder.length === 0 && !loading" class="wrapper-message">
                <span class="icon-check"></span>
                <div class="title-message">You have no tasks</div>
                <div class="subtitle-message">Sit back and relax</div>
            </div>
            <div *ngIf="loading">
                <div *ngFor="let i of [1, 2, 3, 4, 5, 6]" class="loading-item">
                    <span class="glow-checkbox"></span>
                    <span class="glow-text"> <span>Loading</span> <span>cool</span> <span>state</span> </span>
                </div>
            </div>
      </div>
    `,
})
export class PureTaskListComponent {
    /**
    * Propiedad del componente para definir el orden de las tareas.
    */
    public tasksInOrder: Task[] = [];

    /** Comprueba si está en estado de carga */
    @Input() 
    public loading = false;

    /** Evento para cambiar la tarea a anclada */
    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    public onPinTask = new EventEmitter<Event>();

    /** Evento para cambiar la tarea a archivada */
    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    public onArchiveTask = new EventEmitter<Event>();

    @Input()
    set tasks(arr: Task[]) {
        this.tasksInOrder = [
        ...arr.filter(t => t.state === 'TASK_PINNED'),
        ...arr.filter(t => t.state !== 'TASK_PINNED'),
        ];
    }
}