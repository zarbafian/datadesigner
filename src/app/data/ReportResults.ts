import { DataSource } from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ColumnData } from './table/ColumnData';
import { RowData } from './table/RowData';

export class ReportResults extends DataSource<any> {

    constructor(
        public name: string,
        public columns: ColumnData[],
        public rows: RowData[]
    ) {
        super();
    }

    getColumnsNames() {
        let names = [];
        for (let colData of this.columns) {
            names.push(colData.name);
        }
        return names;
    }

    connect(): Observable<RowData[]> {
        return Observable.of(this.rows);
    }

    disconnect() { }
}