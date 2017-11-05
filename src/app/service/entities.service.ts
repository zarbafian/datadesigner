import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { Constants } from '../util/Constants';

import { Observable } from 'rxjs/Observable';

import { EntityDefinition } from '../data/EntityDefinition';
import { Entity } from '../data/Entity';
import { Field } from '../data/Field';
import { FileValue } from '../data/FileValue';
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

  createEntity(entityDefinition: EntityDefinition, entity: Entity): Observable<Entity> {

    LOGGER.debug('EntitiesService.createEntity: ' + entityDefinition.name);

    return this.http
      .post(
      Constants.getEntityType(entityDefinition.name),
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

  deleteEntity(entity: Entity) {

    LOGGER.debug('EntitiesService.deleteEntity: ' + entity.type + '.' + entity.id);

    return this.http
      .delete(
      Constants.getEntityByTypeAndId(entity.type, entity.id)
      )
      .map(
      resp => {
        if (resp.status == 204) {
          return;
        }
        else {
          throw new Error(resp.statusText);
        }
      });
  }
/*
  saveFileValue(entity: Entity, field: Field, files): Observable<FileValue> {

    return this.makeFileRequest(
      Constants.getFieldByEntityAndName(entity.type, entity.id, field.name),
      [],
      files
    );
  }

  private makeFileRequest(url: string, params: string[], files: File[]): Observable<FileValue> {
    return Observable.create(observer => {
      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.withCredentials = true;

      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {

        console.log('PROGRESS - ' + Math.round(event.loaded / event.total * 100));

        //this.progress = Math.round(event.loaded / event.total * 100);

        //this.progressObserver.next(this.progress);
      };

      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
  */
}
