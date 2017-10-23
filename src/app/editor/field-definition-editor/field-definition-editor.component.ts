import { Component, OnInit, Input } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { DefinitionsService } from '../../service/definitions.service';

import { FieldDefinition } from '../../data/FieldDefinition';
import { FieldType } from 'app/data/FieldType';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'field-definition-editor',
  templateUrl: './field-definition-editor.component.html',
  styleUrls: ['./field-definition-editor.component.css']
})
export class FieldDefinitionEditorComponent implements OnInit {

  @Input()
  private entity: string;

  @Input()
  private field: FieldDefinition;

  private fieldNameExists: boolean = false;

  private editedName: string;
  private editedType: FieldType;
  
  fieldNameControl;

  constructor(
    private definitionsService: DefinitionsService,
  ) { }

  ngOnInit() {
    this.fieldNameControl = new FormControl('', [
      Validators.minLength(1)
    ]);
    this.editedName = this.field.name;
    this.editedType = this.field.fieldType;
  }

  updateName(newName: string) {
    LOGGER.debug('updateName - newName: ' + newName);
    this.editedName = newName;
  }
  saveField() {
    LOGGER.debug('saveField - name: ' + this.editedName);
    let newData = new FieldDefinition();
    newData.name = this.editedName;
    newData.fieldType = this.editedType;

    this.definitionsService
      .updateFieldDefinition(this.entity, this.field.name, newData)
      .subscribe(
      data => {
        LOGGER.debug('update - name: ' + data.name + ', ' + data.fieldType.key);
        //this.field = data;
      },
      error => {
        LOGGER.debug('error: ' + error);
        this.fieldNameExists = true;
        //this.editedName = this.field.name;
        //this.editedType = this.field.type;
      });
  }
}