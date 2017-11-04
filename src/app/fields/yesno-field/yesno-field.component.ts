import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';

import { Entity } from '../../data/Entity';
import { Field } from '../../data/Field';
import { ValueChange } from '../../data/ValueChange';

import { AbstractFieldComponent } from '../abstract-field.component';

import { DataExchangeService } from '../../service/data-exchange.service';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-yesno-field',
  templateUrl: './yesno-field.component.html',
  styleUrls: ['./yesno-field.component.css']
})
export class YesnoFieldComponent implements OnInit, AbstractFieldComponent {


  @Input()
  entity: Entity;

  @Input()
  field: Field;

  @Output() onValueChange = new EventEmitter<boolean>();
  
  constructor(public dataExchangeService: DataExchangeService) { }

  ngOnInit() {
  }

  notifyChange(newValue: any) {
    LOGGER.debug('YesnoFieldComponent.notifyChange:  ' + newValue);
    this.dataExchangeService.notifyChange(new ValueChange(newValue, this.field));
  }
}
