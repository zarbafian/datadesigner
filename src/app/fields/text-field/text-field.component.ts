import { Component, OnInit, Input } from '@angular/core';

import { Field } from '../../data/Field';

import { AbstractFieldComponent } from '../abstract-field.component';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit, AbstractFieldComponent {

  @Input() field: Field;

  constructor() { }

  ngOnInit() {
    //LOGGER.debug('TextFieldComponent.ngOnInit: ' + this.field.name + ' -> ' + this.field.value);
  }

}
