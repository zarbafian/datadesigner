import { Component, OnInit } from '@angular/core';

import { DefinitionsService } from '../../service/definitions.service';
import { EntitiesService } from '../../service/entities.service';

import { EntityDefinition } from '../../data/EntityDefinition';
import { Entity } from '../../data/Entity';
import { Field } from '../../data/Field';

import { TextFieldComponent } from '../../fields/text-field/text-field.component';

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
    this.entitiesService
    .getEntitiesOfType(this.selectedDefinition.name)
    .subscribe(
      data => 
      this.entities = data
    );
  }
  
  selectEntity(entity: Entity) {
    LOGGER.debug('EntitiesComponent.selectEntity: ' + entity.id);
    this.initFields(this.selectedDefinition, entity);
    this.selectedEntity = entity;
  }
  initFields(entityDefinition: EntityDefinition, entity: Entity) {
    entity.fields = [];
    for(let key in entity.data) {
      let field = new Field(TextFieldComponent, key, entity.data[key]);
      //field.name = key;
      //field.value = entity.data[key];
      entity.fields.push(field);
    }
  }
}
