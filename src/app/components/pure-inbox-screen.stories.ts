import { CommonModule } from '@angular/common';
import { 
    moduleMetadata, 
    Story, 
    Meta 
} from '@storybook/angular';

import { TaskModule } from './task.module';

import { PureInboxScreenComponent } from './pure-inbox-screen.component';


export default {
    component: PureInboxScreenComponent,
    decorators: [
        moduleMetadata({
        declarations: [PureInboxScreenComponent],
        imports: [CommonModule, TaskModule],
        }),
    ],
    title: 'PureInboxScreen',
} as Meta;

const Template: Story<PureInboxScreenComponent> = args => ({
    props: args,
});

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
    error: true,
};