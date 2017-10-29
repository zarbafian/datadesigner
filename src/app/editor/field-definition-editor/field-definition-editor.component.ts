import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { DefinitionsService } from '../../service/definitions.service';

import { FieldDefinition } from '../../data/FieldDefinition';
import { EntityDefinition } from '../../data/EntityDefinition';
import { FieldType } from '../../data/FieldType';

import { Constants } from '../../util/Constants';

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

  @Output()
  private onFieldCreated = new EventEmitter<FieldDefinition>();

  @Output()
  private onFieldDeleted = new EventEmitter<FieldDefinition>();

  @Output()
  private onFieldCreationCanceled = new EventEmitter<void>();

  private editedName: string;
  private editedType: string;

  private unsavedField: boolean = false;

  private fieldTypes: FieldType[];

  private entitySelectionMode: boolean = false;
  private selectedEntity: string;
  private entityDefinitions: EntityDefinition[];

  fieldNameControl;

  constructor(
    private definitionsService: DefinitionsService,
  ) { }

  ngOnInit() {
    this.fieldNameControl = new FormControl('', [
      Validators.minLength(1)
    ]);

    if (!this.field) {
      LOGGER.debug('Field create mode');
      this.unsavedField = true;
      this.editedName = '';
    }
    else {
      LOGGER.debug('Field update mode');
      this.unsavedField = false;
      this.editedName = this.field.name;
      this.editedType = this.field.fieldType.key;
      if(this.field.fieldType.key === Constants.FIELD_TYPE_ENTITY) {
        this.selectedEntity = this.field.targetEntity;
      }
    }

    // Load field types
    this.definitionsService
      .getFieldTypes()
      .subscribe(data => {
        this.fieldTypes = data;

        if (this.unsavedField) {
          // Initialize type
          for (let ft of this.fieldTypes) {
            if (Constants.FIELD_TYPE_TEXT === ft.key) {
              this.editedType = ft.key;
              break;
            }
          }
        }
      });

    // Load entity definitions
    this.definitionsService
      .getDefinitions()
      .subscribe(data => {
        this.entityDefinitions = data;
      });
  }

  updateName(newName: string) {
    LOGGER.debug('updateName - newName: ' + newName);
    this.editedName = newName;
  }
  saveField() {
    LOGGER.debug('saveField - name: ' + this.editedName);
    let newData = new FieldDefinition();
    newData.name = this.editedName;
    newData.fieldType = new FieldType();
    newData.fieldType.key = this.editedType;

    if(newData.fieldType.key === Constants.FIELD_TYPE_ENTITY) {
      newData.targetEntity = this.selectedEntity;
    }

    if (this.unsavedField) {
      this.definitionsService
        .createFieldDefinition(this.entity, newData)
        .subscribe(
        data => {
          LOGGER.debug('create successful - name: ' + data.name + ', ' + data.fieldType.key);
          this.field = data;
          this.onFieldCreated.emit(data);
        },
        error => {
          LOGGER.debug('create error: ' + error);
        });
    }
    else {
      this.definitionsService
        .updateFieldDefinition(this.entity, this.field.name, newData)
        .subscribe(
        data => {
          LOGGER.debug('update successful - name: ' + data.name + ', ' + data.fieldType.key);
          this.field = data;
        },
        error => {
          LOGGER.debug('update error: ' + error);
        });
    }
  }

  deleteField() {
    LOGGER.debug('deleteField - name: ' + (this.field ? this.field.name : '[unsaved]'));

    if (this.unsavedField) {
      this.onFieldCreationCanceled.emit();
    }
    else {
      let tmpFieldData = this.field;

      this.definitionsService
        .deleteFieldDefinition(this.entity, this.field.name)
        .subscribe(
        data => {
          LOGGER.debug('deletion successfull: ' + data);
          this.onFieldDeleted.emit(tmpFieldData);
        },
        error => {
          LOGGER.debug('deletion error: ' + error);
        }
        );
    }
  }

  triggerFieldTypeSelection(keyValue, viewValue) {

    if (viewValue) {
      if (keyValue === Constants.FIELD_TYPE_ENTITY) {
        LOGGER.debug('entity selected');
        this.entitySelectionMode = true;
      }
      else {
        LOGGER.debug('entity deselected');
        this.entitySelectionMode = false;
      }
      return viewValue;
    }
  }
}