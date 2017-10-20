import { Component, OnInit, Input } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { DefinitionsService } from '../../service/definitions.service';

import { FieldDefinition } from '../../data/FieldDefinition';

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

  private editedName: string;
  private editedType: string;
  fieldNameControl;

  constructor(
    private definitionsService: DefinitionsService,
  ) { }

  ngOnInit() {
    this.fieldNameControl = new FormControl('', [
      Validators.minLength(1)
    ]);
    this.editedName = this.field.name;
    this.editedType = this.field.type;
  }

  updateName(newName: string) {
    LOGGER.debug('updateName - newName: ' + newName);
    this.editedName = newName;
  }
  saveField() {
    LOGGER.debug('saveField - name: ' + this.editedName);
    let newData = new FieldDefinition();
    newData.name = this.editedName;
    newData.type = this.editedType;

    this.definitionsService
      .updateFieldDefinition(this.entity, this.field.name, newData)
      .subscribe(
      data => {
        LOGGER.debug('update - name: ' + data.name + ', ' + data.type);
        //this.field = data;
      },
      error => {
        LOGGER.debug('error: ' + error);
        this.editedName = this.field.name;
        this.editedType = this.field.type;
      });
  }
}
