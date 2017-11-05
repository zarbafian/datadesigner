import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, SimpleChange, EventEmitter } from '@angular/core';

import { EntityDefinition } from '../../data/EntityDefinition';
import { Entity } from '../../data/Entity';
import { Field } from '../../data/Field';
import { FileValue } from '../../data/FileValue';

import { FieldFactory } from '../../fields/FieldFactory';

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
  canEdit: boolean = true;
  canDelete: boolean = true;

  @Input()
  entityDefinition: EntityDefinition;

  @Input()
  entity: Entity;

  @Output()
  entityDeleted: EventEmitter<Entity> = new EventEmitter<Entity>();

  constructor(
    private dataExchangeService: DataExchangeService,
    private entitiesService: EntitiesService
  ) {

    dataExchangeService.fieldValueChange$.subscribe(
      valueChange => {
        LOGGER.debug(`Received new value: ${valueChange.getNewValue()} from field ${valueChange.getField().name}`);
        this.entitySaved = false;
      });

      /*
    dataExchangeService.filesSubmitted$.subscribe(
      fileValue => {
        LOGGER.debug(`Received fileValue from field ${fileValue.field.name}`);
        this.entitySaved = false;

        this.uploadFiles(fileValue);
      });
      */
  }

  /*
  uploadFiles(fileValue: FileValue) {

    this.entitiesService
      .saveFileValue(this.entity, fileValue.field, fileValue.files)
      .subscribe(
        data => {
          LOGGER.debug('upload successful');
        },
        error => {
          LOGGER.debug('upload error');
        }
      )
  }
  */

  ngOnChanges(changes: SimpleChanges) {
    const change: SimpleChange = changes.entity;
    if (change.previousValue && !(change.previousValue.id === change.currentValue.id)) {
      LOGGER.debug('entity changed: ' + change.previousValue.id + ' -> ' + change.currentValue);
      this.entitySaved = true;
    }
    else {
      //LOGGER.debug('NO CHANGE: ' + (change.previousValue ? change.previousValue.id : null) + ' -> ' + change.currentValue.id);
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

  saveEntity() {

    LOGGER.debug('saveEntity');

    FieldFactory.extractFieldValues(this.entityDefinition, this.entity);

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

  deleteEntity() {

    LOGGER.debug('deleteEntity');

    this.entitiesService
      .deleteEntity(this.entity)
      .subscribe(
      data => {
        LOGGER.debug('delete successful: ' + data);
        this.entityDeleted.emit(this.entity);
      },
      error => {
        LOGGER.debug('delete error: ' + error);
      }
      );
  }
}
