import { Field } from './Field';

export class ValueChange {
    constructor(
        private newValue: any,
        private field: Field
    ) {}

    getNewValue(): any {
        return this.newValue;
    }

    getField(): Field {
        return this.field;
    }
}
  