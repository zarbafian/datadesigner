import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FileValue } from '../../data/FileValue';
import { Field } from '../../data/Field';
import { Entity } from '../../data/Entity';
import { ValueChange } from '../../data/ValueChange';

import { AbstractFieldComponent } from '../abstract-field.component';

import { DataExchangeService } from '../../service/data-exchange.service';
import { EntitiesService } from '../../service/entities.service';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.css']
})
export class FileFieldComponent implements OnInit, AbstractFieldComponent {

  @Input()
  entity: Entity;

  @Input()
  field: Field;

  @Output()
  fileSubmitted: EventEmitter<FileValue> = new EventEmitter<FileValue>();

  constructor(
    public dataExchangeService: DataExchangeService,
    private entitiesService: EntitiesService
  ) { }

  ngOnInit() {
  }

  notifyChange(newValue: any) {

    LOGGER.debug('FileFieldComponent.notifyChange: ' + newValue);

    var target = newValue.target || newValue.srcElement;
    let files = target.files;

    LOGGER.debug('FileFieldComponent.onChange - notifyChange: ' + files);

    let fileValue = new FileValue();
    fileValue.field = this.field;
    fileValue.files = files;

    this.dataExchangeService.filesSubmitted(fileValue);
  }
}
