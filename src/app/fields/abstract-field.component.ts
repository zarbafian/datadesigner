import { DataExchangeService } from '../service/data-exchange.service';

import { Field } from '../data/Field';

export interface AbstractFieldComponent {
    
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