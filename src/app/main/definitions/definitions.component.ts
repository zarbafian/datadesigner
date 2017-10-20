import { Component, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';

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
