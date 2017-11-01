import { Component, OnInit, Input , ContentChildren, AfterContentInit   } from '@angular/core';

import { EntityDefinition } from '../../data/EntityDefinition';
import { Entity } from '../../data/Entity';
import { Field } from '../../data/Field';

import { DataExchangeService } from '../../service/data-exchange.service';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.css'],
  providers: [DataExchangeService]
})
export class EntityEditorComponent implements OnInit {

  entitySaved: boolean = true;
  canSave: boolean = true;
  
  @Input()
  entity: Entity;

  constructor(private dataExchangeService: DataExchangeService) { 

    dataExchangeService.fieldValueChange$.subscribe(
    valueChange => {
      LOGGER.debug(`Received new value: ${valueChange.getNewValue()} from field ${valueChange.getField().name}`);
    });
  }

  announce() {
    // TODO
    let mission = "what mission?!";
    this.dataExchangeService.announceMission(mission);
    LOGGER.debug(`Mission "${mission}" announced`);

  }


  ngOnInit() {
  }
  onFieldValueChanged(event: any) {

    //LOGGER.debug('EntityEditorComponent.onFieldValueChanged: ' + event + ' -> ' + field.name);
    LOGGER.debug('EntityEditorComponent.onFieldValueChanged: ' + event);
  }
  
}
