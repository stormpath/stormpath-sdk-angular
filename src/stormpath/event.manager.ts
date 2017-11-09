import { Injectable } from '@angular/core';
import { Observer, Subscription} from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventManager {

    observable: Observable<any>;
    observer: Observer<any>;

    constructor() {
        this.observable = Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        }).share();
    }

    broadcast(event: any): any {
        this.observer.next(event);
    }

    subscribe(eventName: string, callback: any): any {
      return this.observable.filter((event: any) => {
          return event.name === eventName;
        }).subscribe(callback);
    }

    destroy(subscriber: Subscription): void {
        subscriber.unsubscribe();
    }
}
