import { Component, OnInit, Input } from '@angular/core';

import { Field } from '../../data/Field';

import { AbstractFieldComponent } from '../abstract-field.component';

@Component({
  selector: 'app-paragraph-field',
  templateUrl: './paragraph-field.component.html',
  styleUrls: ['./paragraph-field.component.css']
})
export class ParagraphFieldComponent implements OnInit, AbstractFieldComponent {

  @Input() field: Field;

  constructor() { }

  ngOnInit() {
  }

}
