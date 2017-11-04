import { DataExchangeService } from '../service/data-exchange.service';

import { Entity } from '../data/Entity';
import { Field } from '../data/Field';

export interface AbstractFieldComponent {
    
    /**
     * Entity that is passed to the handling component.
     */
    entity: Entity;
    
    /**
     * Field that is passed to the handling component.
     */
    field: Field;
    
    /**
     * Emit the new value of the field.
     */
    dataExchangeService: DataExchangeService;
    notifyChange(newValue: any);
}