import { Type } from '@angular/core';

//import { FieldType } from './FieldType';

export class Field {
    //name: string;
    //value: any;
    //fieldType: FieldType;
    //targetEntity: string;
    constructor(public component: Type<any>, public name: string, public value: any) {}
  }
  