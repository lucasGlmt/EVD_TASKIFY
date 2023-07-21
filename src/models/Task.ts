import { v4 as uuid } from 'uuid';

export class Task {
    constructor(
        public id: string,
        public name: string,
        public done: boolean,
    ) { }

    static create(name: string) {
        return new Task(uuid(), name, false);
    }
}