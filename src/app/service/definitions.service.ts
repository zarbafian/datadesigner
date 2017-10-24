import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Constants } from '../util/Constants';
import { Logger } from '../util/Logger';

import { EntityDefinition } from '../data/EntityDefinition';
import { FieldDefinition } from '../data/FieldDefinition';
import { FieldType } from '../data/FieldType';

const LOGGER: Logger = Logger.getLogger();

@Injectable()
export class DefinitionsService {

  constructor(private http: Http) { }

  getDefinitions(): Observable<EntityDefinition[]> {

    LOGGER.debug('DefinitionsService.getDefinitions');

    return this.http
      .get(
      Constants.DEFINITIONS
      )
      .map(
      resp => resp.json()
      );
  }

  getFieldTypes(): Observable<FieldType[]> {

    LOGGER.debug('DefinitionsService.getFieldTypes');

    return this.http
      .get(
      Constants.getFielsTypesUrl()
      )
      .map(
      resp => resp.json()
      );
  }

  loadEntityDefinition(entityDef: EntityDefinition): Observable<EntityDefinition> {

    LOGGER.debug('DefinitionsService.loadEntityDefinition: ' + entityDef.name);

    return this.http
      .get(
      Constants.getDefinitionUrl(entityDef.name)
      )
      .map(
      resp => resp.json()
      );
  }

  createNewDefinition(entityName: string): Observable<EntityDefinition> {
    LOGGER.debug('DefinitionsService.createNewDefinition: ' + entityName);

    let newData = new EntityDefinition();
    newData.name = entityName;

    return this.http
      .post(
      Constants.getDefinitionsUrl(),
      newData
      )
      .map(
      resp => {
        if (resp.status == 200) {
          return resp.json();
        }
        else {
          throw new Error(resp.statusText);
        }
      });
  }

  deleteEntityDefinition(entityDef: EntityDefinition): Observable<void> {

    LOGGER.debug('DefinitionsService.deleteEntityDefinition: ' + entityDef.name);

    return this.http
      .delete(
      Constants.getDefinitionUrl(entityDef.name)
      )
      .map(
      resp => {
        if (resp.status == 204) {
          return;
        }
        else {
          throw new Error(resp.statusText);
        }
      }
      );
  }
  createFieldDefinition(entityDef: string, newData: FieldDefinition): Observable<FieldDefinition> {

    LOGGER.debug('DefinitionsService.createFieldDefinition: ' + entityDef);

    return this.http
      .post(
      Constants.getFieldsUrl(entityDef),
      newData
      )
      .map(
      resp => {
        if (resp.status == 200) {
          return resp.json();
        }
        else {
          throw new Error(resp.statusText);
        }
      });
  }

  updateFieldDefinition(entityDef: string, fieldDef: string, newData: FieldDefinition): Observable<FieldDefinition> {

    LOGGER.debug('DefinitionsService.updateFieldDefinition: ' + entityDef);

    return this.http
      .put(
      Constants.getFieldUrl(entityDef, fieldDef),
      newData
      )
      .map(
      resp => {
        if (resp.status == 200) {
          return resp.json();
        }
        else {
          throw new Error(resp.statusText);
        }
      });
  }
  
  deleteFieldDefinition(entityDef: string, field: string): Observable<void> {
    
        LOGGER.debug('deleteFieldDefinition.deleteFieldDefinition: ' + entityDef + '.' + field);
    
        return this.http
          .delete(
          Constants.getFieldUrl(entityDef, field)
          )
          .map(
          resp => {
            if (resp.status == 204) {
              return;
            }
            else {
              throw new Error(resp.statusText);
            }
          }
          );
      }
      
}
