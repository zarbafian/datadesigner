import { Component, OnInit, Input } from '@angular/core';

import { Field } from '../../data/Field';

import { AbstractFieldComponent } from '../abstract-field.component';

@Component({
  selector: 'app-yesno-field',
  templateUrl: './yesno-field.component.html',
  styleUrls: ['./yesno-field.component.css']
})
export class YesnoFieldComponent implements OnInit, AbstractFieldComponent {

  @Input() field: Field;

  constructor() { }

  ngOnInit() {
  }

}
