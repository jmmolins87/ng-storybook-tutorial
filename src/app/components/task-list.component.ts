
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TasksState, ArchiveTask, PinTask } from '../state/task.state';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-task-list',
    template: `
        <app-pure-task-list
            [tasks]="tasks$ | async"
            (onArchiveTask)="archiveTask($event)"
            (onPinTask)="pinTask($event)"
        ></app-pure-task-list>
    `,
})
export class TaskListComponent {
    @Select(TasksState.getAllTasks) tasks$: Observable<Task[]>;

    constructor(private store: Store) {}

    /**
     * Método de componente para activar el evento archiveTask
     */
    archiveTask(id: string) {
        this.store.dispatch(new ArchiveTask(id));
    }

    /**
     * Método de componente para activar el evento pinTask
     */
    pinTask(id: string) {
        this.store.dispatch(new PinTask(id));
    }
}