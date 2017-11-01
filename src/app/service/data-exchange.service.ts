import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';

import { ValueChange } from '../data/ValueChange';

@Injectable()
export class DataExchangeService {

  constructor() { }

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();// TODO
  private fieldValueChangeSource = new Subject<ValueChange>();
 
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();// TODO
  fieldValueChange$ = this.fieldValueChangeSource.asObservable();
 
  // Service message commands
  // TODO
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }
 
  notifyChange(newValue: ValueChange) {
    this.fieldValueChangeSource.next(newValue);
  }
}
