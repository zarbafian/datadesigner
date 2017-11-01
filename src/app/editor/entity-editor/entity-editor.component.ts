import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { EntityDefinition } from '../../data/EntityDefinition';
import { Entity } from '../../data/Entity';
import { Field } from '../../data/Field';

import { DataExchangeService } from '../../service/data-exchange.service';
import { EntitiesService } from '../../service/entities.service';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.css'],
  providers: [DataExchangeService]
})
export class EntityEditorComponent implements OnInit, OnChanges {

  entitySaved: boolean = true;
  canSave: boolean = true;

  @Input()
  entityDefinition: EntityDefinition;

  @Input()
  entity: Entity;


  constructor(
    private dataExchangeService: DataExchangeService,
    private entitiesService: EntitiesService
  ) {

    dataExchangeService.fieldValueChange$.subscribe(
      valueChange => {
        LOGGER.debug(`Received new value: ${valueChange.getNewValue()} from field ${valueChange.getField().name}`);
        this.entitySaved = false;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: SimpleChange = changes.entity;
    if (change.previousValue && !(change.previousValue.id === change.currentValue.id)) {
      LOGGER.debug('entity changed: ' + change.previousValue.id + ' -> ' + change.currentValue);
      this.entitySaved = true;
    }
    else {
      LOGGER.debug('NO CHANGE: ' + (change.previousValue ? change.previousValue.id : null) + ' -> ' + change.currentValue.id);
    }
  }

  announce() {
    // TODO
    let mission = 'what mission?!';
    this.dataExchangeService.announceMission(mission);
    LOGGER.debug(`Mission "${mission}" announced`);
  }

  ngOnInit() {
  }

  extractFieldValues(entityDefinition: EntityDefinition, entity: Entity) {
    entity.data = {};
    for (let field of entity.fields) {
      entity.data[field.name] = field.value;
    }
  }

  saveEntity() {
    LOGGER.debug('saveEntity');

    this.extractFieldValues(this.entityDefinition, this.entity);

    this.entitiesService
      .updateEntity(this.entity)
      .subscribe(
      data => {
        LOGGER.debug('update successful: ' + data);
        this.entitySaved = true;
      },
      error => {
        LOGGER.debug('update error: ' + error);
        this.entitySaved = false;
      });
  }
}
