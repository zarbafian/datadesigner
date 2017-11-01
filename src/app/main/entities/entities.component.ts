import { Component, OnInit } from '@angular/core';

import { DefinitionsService } from '../../service/definitions.service';
import { EntitiesService } from '../../service/entities.service';

import { EntityDefinition } from '../../data/EntityDefinition';
import { Entity } from '../../data/Entity';
import { Field } from '../../data/Field';

import { FieldFactory } from '../../fields/FieldFactory';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {

  private definitions: EntityDefinition[] = [];

  private selectedDefinition: EntityDefinition;

  private entities: Entity[];

  private selectedEntity: Entity;

  constructor(
    private definitionsService: DefinitionsService,
    private entitiesService: EntitiesService,
  ) { }

  ngOnInit() {
    this.definitionsService
      .getDefinitions()
      .subscribe(
      data => this.definitions = data
      );
  }

  selectEntityDefinition(entityDef: EntityDefinition) {

    LOGGER.debug('EntitiesComponent.selectEntityDefinition: ' + entityDef.name);
    
    this.selectedDefinition = entityDef;
    this.selectedEntity = null;

    this.definitionsService
      .loadEntityDefinition(entityDef)
      .subscribe(data => this.selectedDefinition = data);

    this.entitiesService
      .getEntitiesOfType(this.selectedDefinition.name)
      .subscribe(
      data =>
        this.entities = data
      );
  }

  selectEntity(entity: Entity) {

    LOGGER.debug('EntitiesComponent.selectEntity: ' + entity.id);
    
    FieldFactory.initEntityFields(this.selectedDefinition, entity);
    
    this.selectedEntity = entity;
  }

  createEntity() {

    LOGGER.debug('EntitiesComponent.createEntity');

    let newEntity = FieldFactory.newEntity(this.selectedDefinition);

    this.entitiesService
      .createEntity(this.selectedDefinition, newEntity)
      .subscribe(
      data => {
        LOGGER.debug('create successful: ' + data.id);
        this.entities.unshift(data);

        this.selectEntity(data);
      },
      error => {
        LOGGER.debug('create error: ' + error);
      });
  }

  onEntityDeleted(entity: Entity) {

    LOGGER.debug('onEntityDeleted');

    let indexToDelete = null;

    for(let i=0; i < this.entities.length; i++) {

      if(this.entities[i].id === entity.id) {
        indexToDelete = i;
        break;
      }
    }

    this.selectedEntity = null;
    this.entities.splice(indexToDelete, 1);
  }
}
