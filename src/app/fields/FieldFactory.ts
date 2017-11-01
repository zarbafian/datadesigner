import { EntityDefinition } from '../data/EntityDefinition';
import { Entity } from '../data/Entity';
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

        for (let definition of entityDefinition.fields) {

            if (definition.name === fieldname) {
                LOGGER.debug('found definition of type: ' + definition.fieldType.key);
                myDefnition = definition;
            }
        }

        if (!myDefnition) {
            LOGGER.debug('no definition found for field: ' + fieldname);
            return TextFieldComponent;
        }

        if (myDefnition.fieldType.key === YESNO_FIELD_TYPE) {
            LOGGER.debug('returning yesno');
            return YesnoFieldComponent;
        }
        else if (myDefnition.fieldType.key === PARAGRAPH_FIELD_TYPE) {
            LOGGER.debug('returning paragraph');
            return ParagraphFieldComponent;
        }
        else if (myDefnition.fieldType.key === INTEGER_FIELD_TYPE) {
            LOGGER.debug('returning integer');
            return IntegerFieldComponent;
        }
        else {
            LOGGER.debug('returning text');
            return TextFieldComponent;
        }
    }

    /**
     * Inititialize an entity fields with Angular components using value 
     * and field type in an entity's data field.
     * @param entityDefinition the meta definition of the entity
     * @param entity the entity to process
     */
    static initEntityFields(entityDefinition: EntityDefinition, entity: Entity) {

        entity.fields = [];

        for (let key in entity.data) {
            let comp = FieldFactory.get(entityDefinition, key);
            let field = new Field(comp, key, entity.data[key]);
            entity.fields.push(field);
        }
    }

    /**
     * Extract GUI/components field value to set the entity data field used for persistence.
     * @param entityDefinition the meta definition of the entity
     * @param entity the entity to process
     */
    static extractFieldValues(entityDefinition: EntityDefinition, entity: Entity) {
        
        entity.data = {};
        
        for (let field of entity.fields) {
            entity.data[field.name] = field.value;
        }
    }

    static newEntity(entityDefinition: EntityDefinition) {
        
        let newEntity: Entity = new Entity();
        
        newEntity.type = entityDefinition.name;
        
        newEntity.data = {};
        
        for (let field of entityDefinition.fields) {
            newEntity.data[field.name] = null;
        }

        return newEntity;
    }
}