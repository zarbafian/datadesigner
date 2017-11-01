import { Component, OnInit, Input } from '@angular/core';

import { Field } from '../../data/Field';
import { ValueChange } from '../../data/ValueChange';

import { AbstractFieldComponent } from '../abstract-field.component';

import { DataExchangeService } from '../../service/data-exchange.service';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit, AbstractFieldComponent {

  @Input() field: Field;

  constructor(public dataExchangeService: DataExchangeService) {

  }

  ngOnInit() {
  }

  notifyChange(newValue: any) {
    LOGGER.debug('TextFieldComponent.notifyChange:  ' + newValue);
    this.dataExchangeService.notifyChange(new ValueChange(newValue, this.field));
  }
}
