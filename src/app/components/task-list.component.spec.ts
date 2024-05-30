
import { render } from '@testing-library/angular';

import { TaskComponent } from './task.component';
import { PureTaskListComponent } from './pure-task-list.component.ts';

//👇 Nuestra historia importada aquí
 import { WithPinnedTasks } from './pure-task-list.stories';

describe('TaskList component', () => {
    it('renders pinned tasks at the start of the list', async () => {
        const mockedActions = jest.fn();
        const tree = await render(PureTaskListComponent, {
            declarations: [TaskComponent],
            componentProperties: {
                ...WithPinnedTasks.args,
                onPinTask: {
                    emit: mockedActions,
                } as any,
                onArchiveTask: {
                    emit: mockedActions,
                } as any,
            },
        });
        const component = tree.fixture.componentInstance;
        expect(component.tasksInOrder[0].id).toBe('6');
    });
});