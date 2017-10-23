import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { DefinitionsService } from '../../service/definitions.service';

import { EntityDefinition } from '../../data/EntityDefinition';
import { FieldDefinition } from '../../data/FieldDefinition';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.css']
})
export class DefinitionsComponent implements OnInit {

  private creationMode: boolean = false;

  private newEntityDefName: string = '';

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

  enableCreateMode() {
    this.creationMode = true;
  }

  updateName(newName: string) {
    //LOGGER.debug('updateName:[' + newName + ']');
    this.newEntityDefName = newName;
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
            LOGGER.debug('index to delete is: ' + indexToDelete);
            this.definitions.splice(indexToDelete, 1);
          }
        },
        error => {
          LOGGER.debug('deletion error: ' + error);
        }
      )
  }
  saveNewDefinition() {

    LOGGER.debug('DefinitionsComponent.saveNewDefinition - name: ' + this.newEntityDefName);

    let newName = this.newEntityDefName;

    this.definitionsService
      .createNewDefinition(newName)
      .subscribe(
      data => {
        LOGGER.debug('create successful: ' + data);
        this.definitions.push(data);
        this.creationMode = false;
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
}
