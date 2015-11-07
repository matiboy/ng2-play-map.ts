import {Component, View, bootstrap, provide, NgZone, Inject, CORE_DIRECTIVES, FORM_DIRECTIVES, EventEmitter, Output, Input, OnChanges, SimpleChange} from 'angular2/angular2';
import {MAP_KEY, MapDirective} from './map';
import {MarkerDirective} from './marker';
import {GoogleMapsService} from './services/googlemaps';
let MAP_KEY_PROVIDER = provide(MAP_KEY, { useValue: 'YOUR_MAP_KEY' });

@Component({
  selector: 'googlemap'
})
@View({
  directives: [MapDirective, CORE_DIRECTIVES, FORM_DIRECTIVES, MarkerDirective],
  templateUrl: 'templates/main.html'
})
class GoogleMapComponent {
  center: Object = {
    latitude: '3.1113339',
    longitude: '101.6655921'
  };
  mapcenter = { lat: () => 0, lng: () => 0};
  dragging: string = 'Nope';
  zoom: number = 15;
  moves = 0;
  constructor(private _ngZone: NgZone) {
    this._ngZone = _ngZone;
  }
  setDragging(v: boolean) {
    this.dragging = v ? '<b>Yes</b>' : '<i>No</i>';
    this._ngZone.run(() => 0);
  }
  centerToLocation(location){
    var self = this;
    self.moves++;
    if(!location) {
      // Get current location
      // Ignore if rejected
      navigator.geolocation.getCurrentPosition(function(geo) {
        self.center = geo.coords;
      });
    } else {
      self.center = location;
      self._ngZone.run(() => 0);
    }
  }
  whereAreWe(latlng: {lat: () => number, lng: () => number}) {
    this.mapcenter = latlng;
    this._ngZone.run(() => 0);
  }
}

bootstrap(GoogleMapComponent, [MAP_KEY_PROVIDER, GoogleMapsService]);
