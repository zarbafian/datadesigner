import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';

import { FieldDirective } from '../field.directive';
import { AbstractFieldComponent } from '../abstract-field.component';

import { Field } from '../../data/Field';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit, AfterViewInit {

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
    (<AbstractFieldComponent>componentRef.instance).field = this.field;
  }
}
