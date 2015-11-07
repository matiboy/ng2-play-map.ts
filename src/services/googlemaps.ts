import {Injectable} from 'angular2/angular2';

@Injectable()
export class GoogleMapsService {
  private _isLoaded: Promise<Event>;
  load(key: string) {
    let p = this._isLoaded || new Promise( (resolve, reject) => {
      var script = document.createElement('script');
      script.onload = resolve;
      script.setAttribute('src', "https://maps.googleapis.com/maps/api/js?key=" + key);
      document.getElementsByTagName('body')[0].appendChild(script);
    });
    this._isLoaded = p;
    return p;
  }
}
