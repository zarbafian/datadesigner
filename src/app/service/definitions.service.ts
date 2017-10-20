import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Constants } from '../util/Constants';
import { Logger } from '../util/Logger';

import { EntityDefinition } from '../data/EntityDefinition';
import { FieldDefinition } from '../data/FieldDefinition';

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
}
