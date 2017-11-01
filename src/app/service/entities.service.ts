import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { Constants } from '../util/Constants';

import { Observable } from 'rxjs/Observable';

import { Entity } from '../data/Entity';
import { Field } from '../data/Field';
import { FieldType } from '../data/FieldType';

import { Logger } from '../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Injectable()
export class EntitiesService {

  constructor(private http: Http) { }

  getEntitiesOfType(definition: string): Observable<Entity[]> {

    return this.http.get(
      Constants.getEntityType(definition)
    )
      .map(
      resp => resp.json()
      );
  }

  updateEntity(entity: Entity): Observable<Entity> {

    LOGGER.debug('EntitiesService.updateEntity: ' + entity.type + '.' + entity.id);

    return this.http
      .put(
      Constants.getEntityByTypeAndId(entity.type, entity.id),
      entity
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
