import { EntityDefinition } from '../data/EntityDefinition';
import { Field } from '../data/Field';

import { TextFieldComponent } from './text-field/text-field.component';
import { YesnoFieldComponent } from './yesno-field/yesno-field.component';
import { ParagraphFieldComponent } from './paragraph-field/paragraph-field.component';
import { DecimalFieldComponent } from './decimal-field/decimal-field.component';
import { IntegerFieldComponent } from './integer-field/integer-field.component';
import { FileFieldComponent } from './file-field/file-field.component';
import { EntityFieldComponent } from './entity-field/entity-field.component';
import { DateFieldComponent } from './date-field/date-field.component';
import { DatetimeFieldComponent } from './datetime-field/datetime-field.component';

import { Logger } from '../util/Logger';
const LOGGER: Logger = Logger.getLogger();

const YESNO_FIELD_TYPE = 'yesno';
const TEXT_FIELD_TYPE = 'text';
const PARAGRAPH_FIELD_TYPE = 'paragraph';
const INTEGER_FIELD_TYPE = 'integer';
const DECIMAL_FIELD_TYPE = 'decimal';
const ENTITY_FIELD_TYPE = 'entity';
const FILE_FIELD_TYPE = 'file';
const DATE_FIELD_TYPE = 'date';
const DATETIME_FIELD_TYPE = 'datetime';

export class FieldFactory {

    static get(entityDefinition: EntityDefinition, fieldname: string) {

        LOGGER.debug('FieldFactory.get: ' + entityDefinition.name + ' -> ' + fieldname);

        let myDefnition = null;

        for(let definition of entityDefinition.fields) {

            if(definition.name === fieldname) {
                LOGGER.debug('found definition of type: ' + definition.fieldType.key);
                myDefnition = definition;
            }
        }

        if(!myDefnition) {
            LOGGER.debug('no definition found for field: ' + fieldname);
            return TextFieldComponent;
        }

        if(myDefnition.fieldType.key === YESNO_FIELD_TYPE) {
            LOGGER.debug('returning yesno');
            return YesnoFieldComponent;
        }
        else if(myDefnition.fieldType.key === PARAGRAPH_FIELD_TYPE) {
            LOGGER.debug('returning paragraph');
            return ParagraphFieldComponent;
        }
        else if(myDefnition.fieldType.key === INTEGER_FIELD_TYPE) {
            LOGGER.debug('returning integer');
            return IntegerFieldComponent;
        }
        else {
            LOGGER.debug('returning text');
            return TextFieldComponent;
        }
    }
}