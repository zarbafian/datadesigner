import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Entity } from '../../data/Entity';
import { Field } from '../../data/Field';
import { ValueChange } from '../../data/ValueChange';

import { AbstractFieldComponent } from '../abstract-field.component';

import { DataExchangeService } from '../../service/data-exchange.service';

import { DateFormat } from '../DateFormat';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent implements OnInit, AbstractFieldComponent {

  @Input()
  entity: Entity;

  @Input() field: Field;

  constructor(public dataExchangeService: DataExchangeService) { }

  ngOnInit() {
  }

  notifyChange(newValue: any) {
    LOGGER.debug('DateFieldComponent.notifyChange: ' + newValue.value);

    let str = DateFormat.formatDate(newValue.value);
    LOGGER.debug('formatted date: ' + str);

    this.field.value = str;

    this.dataExchangeService.notifyChange(new ValueChange(newValue, this.field));
  }
}
