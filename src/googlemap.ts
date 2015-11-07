import {Component, View, bootstrap, provide, NgZone, Inject, CORE_DIRECTIVES, FORM_DIRECTIVES, EventEmitter, Output, Input, OnChanges, SimpleChange} from 'angular2/angular2';
import {MAP_KEY, MapDirective} from './map';

let MAP_KEY_PROVIDER = provide(MAP_KEY, { useValue: 'YOUR_MAP_KEY' });

@Component({
  selector: 'googlemap'
})
@View({
  directives: [MapDirective, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: `
    <map [center]="center" (recentered)="whereAreWe($event)" [(zoom)]="zoom" (drag-start)="setDragging($event)" (drag-end)="setDragging($event)"></map>
    <p>Center from main component: {{center.latitude}}, {{center.longitude}}</p>
    <p>Center from map: {{mapcenter?.lat()}}, {{mapcenter?.lng()}}</p>
    <p>Dragging? <span [inner-html]="dragging"></span></p>
    <p>Zoom <input [(ng-model)]="zoom" type="number"></p>
    <button (click)="centerToLocation()" class="btn btn-info">Center on current location <i class="fa fa-map-marker"></i></button>
  `
})
class GoogleMapComponent {
  center: Object = {
    latitude: '3.1113339',
    longitude: '101.6655921'
  };
  mapcenter = { lat: () => 0, lng: () => 0};
  dragging: string = 'Nope';
  zoom: number = 15;
  constructor(private _ngZone: NgZone) {
    this._ngZone = _ngZone;
  }
  setDragging(v) {
    this.dragging = v ? '<b>Yes</b>' : '<i>No</i>';
    this._ngZone.run(() => 0);
  }
  centerToLocation(){
    var self = this;
    // Get current location
    // Ignore if rejected
    navigator.geolocation.getCurrentPosition(function(geo) {
      self.center = geo.coords;
    });
  }
  whereAreWe(latlng: {lat: () => number, lng: () => number}) {
    this.mapcenter = latlng;
    this._ngZone.run(() => 0);
  }
}

bootstrap(GoogleMapComponent, [MAP_KEY_PROVIDER]);
