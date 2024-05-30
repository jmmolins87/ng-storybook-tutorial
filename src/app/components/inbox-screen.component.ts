
import { Component } from '@angular/core';

import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';

import { TasksState } from './../state/task.state'; // Import the TasksState class

@Component({
    selector: 'app-inbox-screen',
    template: `
        <app-pure-inbox-screen [error]="error$ | async"></app-pure-inbox-screen>
    `,
})
export class InboxScreenComponent {
    @Select(TasksState.getError) error$: Observable<any>; // Add TasksState to the @Select decorator
}