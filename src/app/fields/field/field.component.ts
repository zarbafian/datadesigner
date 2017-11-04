import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';

import { FieldDirective } from '../field.directive';
import { AbstractFieldComponent } from '../abstract-field.component';

import { Entity } from '../../data/Entity';
import { Field } from '../../data/Field';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit, AfterViewInit {

  @Input()
  entity: Entity;

  @Input()
  field: Field;

  @ViewChild(FieldDirective)
  fieldHost: FieldDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  ngAfterViewInit() {
  }

  loadComponent() {
    //this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
    //let adItem = this.ads[this.currentAddIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.field.component);

    let viewContainerRef = this.fieldHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AbstractFieldComponent>componentRef.instance).entity = this.entity;
    (<AbstractFieldComponent>componentRef.instance).field = this.field;
  }
}
