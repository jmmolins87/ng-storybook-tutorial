
import { 
    State, 
    Selector, 
    Action, 
    StateContext 
} from '@ngxs/store';

import { Task } from './../models/task.model';

// define las acciones disponibles para la aplicación
export const actions = {
    ARCHIVE_TASK: 'ARCHIVE_TASK',
    PIN_TASK: 'PIN_TASK',
    // Define el nuevo campo de error que necesitamos
    ERROR: 'APP_ERROR',
};

export class ArchiveTask {
    static readonly type = actions.ARCHIVE_TASK;

    constructor(public payload: string) {}
}

export class PinTask {
    static readonly type = actions.PIN_TASK;

    constructor(public payload: string) {}
}
// La definición de clase para nuestro campo de error.
export class AppError {
    static readonly type = actions.ERROR;

    constructor(public payload: boolean) {}
}

// El estado inicial de nuestra tienda cuando se carga la aplicación.
// Por lo general, obtendría esto de un servidor
const defaultTasks = {
    1: { id: '1', title: 'Something', state: 'TASK_INBOX' },
    2: { id: '2', title: 'Something more', state: 'TASK_INBOX' },
    3: { id: '3', title: 'Something else', state: 'TASK_INBOX' },
    4: { id: '4', title: 'Something again', state: 'TASK_INBOX' },
};

export class TaskStateModel {
    entities: { [id: number]: Task };
    error: boolean;
}

// Establece el estado predeterminado
@State<TaskStateModel>({
    name: 'tasks',
    defaults: {
        entities: defaultTasks,
    error: false,
    },
})
export class TasksState {
    @Selector()
    static getAllTasks(state: TaskStateModel) {
        const entities = state.entities;
        return Object.keys(entities).map(id => entities[+id]);
    }

    // Define un nuevo selector para el campo de error.
    @Selector()
    static getError(state: TaskStateModel) {
        const { error } = state;
        return error;
    }

    //
    // Activa la acción PinTask, similar a redux
    @Action(PinTask)
    pinTask({ patchState, getState }: StateContext<TaskStateModel>, { payload }: PinTask) {
        const state = getState().entities;

        const entities = {
            ...state,
            [payload]: { ...state[payload], state: 'TASK_PINNED' },
        };

        patchState({
            entities,
        });
    }

    // Activa la acción PinTask, similar a redux
    @Action(ArchiveTask)
    archiveTask({ patchState, getState }: StateContext<TaskStateModel>, { payload }: ArchiveTask) {
        const state = getState().entities;

        const entities = {
            ...state,
            [payload]: { ...state[payload], state: 'TASK_ARCHIVED' },
        };

        patchState({
            entities,
        });
    }

    // Función para manejar cómo se debe actualizar el estado cuando se activa la acción
    @Action(AppError)
        setAppError({ patchState, getState }: StateContext<TaskStateModel>, { payload }: AppError) {
        const state = getState();
        patchState({
            error: !state.error,
        });
    }
}