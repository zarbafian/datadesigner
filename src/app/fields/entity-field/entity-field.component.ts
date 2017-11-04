import { Component, OnInit, Input } from '@angular/core';

import { Entity } from '../../data/Entity';
import { Field } from '../../data/Field';
import { ValueChange } from '../../data/ValueChange';

import { AbstractFieldComponent } from '../abstract-field.component';

import { DataExchangeService } from '../../service/data-exchange.service';
import { EntitiesService } from '../../service/entities.service';
import { DefinitionsService } from '../../service/definitions.service';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-entity-field',
  templateUrl: './entity-field.component.html',
  styleUrls: ['./entity-field.component.css']
})
export class EntityFieldComponent implements OnInit, AbstractFieldComponent {

  entities: Entity[];

  selectedEntity: Entity;

  @Input()
  entity: Entity;

  @Input()
  field: Field;

  constructor(
    public dataExchangeService: DataExchangeService,
    private entitiesService: EntitiesService,
    private definitionsService: DefinitionsService
  ) { }

  ngOnInit() {

    this.definitionsService
      .getEntityFieldType(this.entity.type, this.field.name)
      .subscribe(

      data => {
        LOGGER.debug('EntityFieldComponent.ngOnInit - target: ' + data.targetEntity);
        this.entitiesService
          .getEntitiesOfType(data.targetEntity)
          .subscribe(
          data => {
            this.entities = data;
          }
          );
      }

      )
  }

  notifyChange(newValue: any) {

    LOGGER.debug('EntityFieldComponent.notifyChange: ' + newValue);
    this.dataExchangeService.notifyChange(new ValueChange(newValue, this.field));
  }

  triggerEntitySelection(value, viewValue) {

    LOGGER.debug('EntityFieldComponent.triggerEntitySelection: ' + value + '  -> ' + viewValue);

    this.notifyChange(value);

    return viewValue;
  }
}
