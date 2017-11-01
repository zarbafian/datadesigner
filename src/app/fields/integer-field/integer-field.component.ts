import { Component, OnInit, Input } from '@angular/core';

import { Field } from '../../data/Field';
import { ValueChange } from '../../data/ValueChange';

import { AbstractFieldComponent } from '../abstract-field.component';

import { DataExchangeService } from '../../service/data-exchange.service';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-integer-field',
  templateUrl: './integer-field.component.html',
  styleUrls: ['./integer-field.component.css']
})
export class IntegerFieldComponent implements OnInit, AbstractFieldComponent {

  @Input() field: Field;
  
    constructor(public dataExchangeService: DataExchangeService) { }
  
    ngOnInit() {
    }
  
    notifyChange(newValue: any) {
      LOGGER.debug('IntegerFieldComponent.notifyChange: ' + newValue);
      this.dataExchangeService.notifyChange(new ValueChange(newValue, this.field));
    }

}
