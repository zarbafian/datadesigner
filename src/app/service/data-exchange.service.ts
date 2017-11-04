import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';

import { ValueChange } from '../data/ValueChange';
import { FileValue } from '../data/FileValue';

@Injectable()
export class DataExchangeService {

  constructor() { }

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();// TODO
  private fieldValueChangeSource = new Subject<ValueChange>();
  private filesSubmittedSource = new Subject<FileValue>();
 
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();// TODO
  fieldValueChange$ = this.fieldValueChangeSource.asObservable();
  filesSubmitted$ = this.filesSubmittedSource.asObservable();
 
  // Service message commands
  // TODO
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }
 
  notifyChange(newValue: ValueChange) {
    this.fieldValueChangeSource.next(newValue);
  }
 
  filesSubmitted(fileValue: FileValue) {
    this.filesSubmittedSource.next(fileValue);
  }
}
