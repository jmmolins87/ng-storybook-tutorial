
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { TaskComponent } from './task.component';
import { TaskListComponent } from './task-list.component';
import { PureTaskListComponent } from './pure-task-list.component.ts';

import { TasksState } from '../state/task.state';

@NgModule({
    imports: [
        CommonModule, 
        NgxsModule.forFeature([
            TasksState
        ])],
    exports: [
        TaskComponent, 
        TaskListComponent
    ],
    declarations: [
        TaskComponent, 
        TaskListComponent, 
        PureTaskListComponent
    ],
    providers: [],
})
export class TaskModule {}