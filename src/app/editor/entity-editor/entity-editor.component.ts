import { Component, OnInit, Input } from '@angular/core';

import { EntityDefinition } from '../../data/EntityDefinition';
import { Entity } from '../../data/Entity';

@Component({
  selector: 'app-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.css']
})
export class EntityEditorComponent implements OnInit {

  @Input()
  entity: Entity;

  constructor() { }

  ngOnInit() {
  }

}
