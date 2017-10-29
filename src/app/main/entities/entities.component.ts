import { Component, OnInit } from '@angular/core';

import { DefinitionsService } from '../../service/definitions.service';
import { EntitiesService } from '../../service/entities.service';

import { EntityDefinition } from '../../data/EntityDefinition';
import { Entity } from '../../data/Entity';

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
    this.entitiesService
      .getEntitiesOfType(this.selectedDefinition.name)
      .subscribe(
      data => {
        this.entities = data;
      }
      );
  }

  selectEntity(entity: Entity) {
    LOGGER.debug('EntitiesComponent.selectEntity: ' + entity.id);
    this.selectedEntity = entity;
  }
}
