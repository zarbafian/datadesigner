import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { DefinitionsService } from '../../service/definitions.service';

import { EntityDefinition } from '../../data/EntityDefinition';
import { FieldDefinition } from '../../data/FieldDefinition';
import { FieldType } from '../../data/FieldType';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.css']
})
export class DefinitionsComponent implements OnInit {

  private entityCreationMode: boolean = false;
  
  private fieldCreationMode: boolean = false;

  private newEntityName: string = '';
  private newFieldName: string = '';
  private newFieldType: FieldType;

  private definitions: EntityDefinition[] = [];

  private selectedDefinition: EntityDefinition;

  private fields: FieldDefinition[];

  constructor(
    private definitionsService: DefinitionsService,
  ) { }

  ngOnInit() {
    this.definitionsService
      .getDefinitions()
      .subscribe(
      data => this.definitions = data
      );
  }

  enableEntityCreateMode() {
    this.entityCreationMode = true;
  }

  enableFieldCreateMode() {
    LOGGER.debug('enableFieldCreateMode: ' + this.fieldCreationMode);
    this.fieldCreationMode = true;
  }

  updateEntityName(newName: string) {
    //LOGGER.debug('updateName:[' + newName + ']');
    this.newEntityName = newName;
  }

  deleteDefinition(entityDef: EntityDefinition) {
    
    LOGGER.debug('DefinitionsComponent.deleteDefinition: ' + entityDef.name);

    let nameToDelete = entityDef.name;

    this.definitionsService
      .deleteEntityDefinition(entityDef)
      .subscribe(
        data => {
          LOGGER.debug('deletion successfull: ' + data);
          let indexToDelete: number = -1;
          for(let i=0; i<this.definitions.length; i++) {
            if(nameToDelete === this.definitions[i].name) {
              indexToDelete = i;
              break;
            }
          }
          if(indexToDelete === -1) {
            LOGGER.debug('deleted element could not be found in list: ' + nameToDelete);
          }
          else {
            LOGGER.debug('found index to delete: ' + indexToDelete);
            this.definitions.splice(indexToDelete, 1);
          }
        },
        error => {
          LOGGER.debug('deletion error: ' + error);
        }
      )
  }
  saveNewDefinition() {

    LOGGER.debug('DefinitionsComponent.saveNewDefinition - name: ' + this.newEntityName);

    let newName = this.newEntityName;

    this.definitionsService
      .createNewDefinition(newName)
      .subscribe(
      data => {
        LOGGER.debug('create successful: ' + data);
        this.definitions.push(data);
        this.entityCreationMode = false;
      },
      error => {
        LOGGER.debug('create error: ' + error);
      });

  }

  selectEntityDefinition(entityDef: EntityDefinition) {
    LOGGER.debug('DefinitionsComponent.selectEntityDefinition: ' + entityDef.name);
    this.selectedDefinition = entityDef;
    this.definitionsService
      .loadEntityDefinition(this.selectedDefinition)
      .subscribe(
      data => {
        this.selectedDefinition = data;
      }
      );
  }

  saveName(newName: string) {
    LOGGER.debug('new name: ' + newName);
  }

  onFieldCreated(fieldDefinition) {
    this.fieldCreationMode = false;
    this.selectedDefinition.fields.push(fieldDefinition);
  }
  onFieldCreationCanceled() {
    this.fieldCreationMode = false;
  }

  onFieldDeleted(fieldDefinition) {

    let nameToDelete = fieldDefinition.name;
    let indexToDelete: number = -1;
    for(let i=0; i<this.selectedDefinition.fields.length; i++) {
      if(nameToDelete === this.selectedDefinition.fields[i].name) {
        indexToDelete = i;
        break;
      }
    }
    if(indexToDelete === -1) {
      LOGGER.debug('deleted element could not be found in list: ' + nameToDelete);
    }
    else {
      LOGGER.debug('found index to delete: ' + indexToDelete);
      this.selectedDefinition.fields.splice(indexToDelete, 1);
    }
  }
}
