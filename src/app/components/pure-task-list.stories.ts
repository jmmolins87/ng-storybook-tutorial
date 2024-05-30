import { CommonModule } from '@angular/common';
import { 
    moduleMetadata, 
    Story, 
    Meta, 
    componentWrapperDecorator 
} from '@storybook/angular';

import { TaskComponent } from './task.component';
import { PureTaskListComponent } from './pure-task-list.component.ts';

import * as TaskStories from './task.stories';

export default {
    component: PureTaskListComponent,
    decorators: [
        moduleMetadata({
            //👇 Importa ambos componentes para permitir la composición de componentes con Storybook
            declarations: [PureTaskListComponent, TaskComponent],
            imports: [CommonModule],
        }),
        //👇 Envuelve nuestras historias con un decorador
        componentWrapperDecorator(story => `<div style="margin: 3em">${story}</div>`),
    ],
    title: 'PureTaskListComponent',
} as Meta;

const Template: Story<PureTaskListComponent> = args => ({
    props: {
        ...args,
        onPinTask: TaskStories.actionsData.onPinTask,
        onArchiveTask: TaskStories.actionsData.onArchiveTask,
    },
});

export const Default = Template.bind({});
Default.args = {
    tasks: [
        { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
        { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
        { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
        { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
        { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
        { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
    ],
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
    // Dar forma a las historias a través de la composición de argumentos.
    // Datos heredados que provienen de la historia predeterminada.
    tasks: [
        ...Default.args.tasks.slice(0, 5),
        { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ],
};

export const Loading = Template.bind({});
Loading.args = {
    tasks: [],
    loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
    // Dar forma a las historias a través de la composición de argumentos.
    // Datos heredados que provienen de la historia de carga.
    ...Loading.args,
    loading: false,
};