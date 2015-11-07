import {Injectable} from 'angular2/angular2';
import {Map} from '../models/map';

@Injectable()
export class MapService {
  private promise: Promise<Map>;
  setMap: Function;
  constructor() {
    var self = this;
    this.promise = new Promise(function(resolve) {
      self.setMap = resolve;
    });
  }
  get map(){
    return this.promise;
  };
}

