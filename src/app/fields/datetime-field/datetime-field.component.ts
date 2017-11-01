import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Field } from '../../data/Field';
import { ValueChange } from '../../data/ValueChange';

import { AbstractFieldComponent } from '../abstract-field.component';

import { DataExchangeService } from '../../service/data-exchange.service';

import { DateFormat } from '../DateFormat';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-datetime-field',
  templateUrl: './datetime-field.component.html',
  styleUrls: ['./datetime-field.component.css']
})
export class DatetimeFieldComponent implements OnInit, AbstractFieldComponent {
  
    @Input() field: Field;
    
      constructor(public dataExchangeService: DataExchangeService) { }
    
      ngOnInit() {
      }
    
      notifyChange(newValue: any) {
        LOGGER.debug('DatetimeFieldComponent.notifyChange: ' + newValue.value);
        
        let str = DateFormat.formatDatetime(newValue.value);
        LOGGER.debug('formatted date: ' + str);

        this.field.value = str;

        this.dataExchangeService.notifyChange(new ValueChange(newValue, this.field));
      }
  }
  