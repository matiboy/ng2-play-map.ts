/// reference
import {Directive, Host, Optional, Input, Output, ElementRef, EventEmitter, OnChanges, SimpleChange} from 'angular2/angular2';
import {Map} from './models/map';
import {MapService} from './services/maps';

@Directive({
  selector: 'marker'
})
export class MarkerDirective implements OnChanges {
  map: Map;
  private initialized: Function;
  @Input() draggable = false;
  @Input() title = '';
  @Input() latitude: number;
  @Input() longitude: number;
  @Output() onMoved = new EventEmitter();
  marker: google.maps.Marker;
  constructor(@Host() mapService: MapService) {
    var self = this;
    Promise.all([mapService.map, new Promise<void>(function(resolve) {
      self.initialized = resolve;
    })]).then(function(out: [Map, void]) {
      self.map = out[0];
      let center = self.map.getCenter();
      if(self.latitude !== undefined) {
        center = new google.maps.LatLng(self.latitude, self.longitude);
      }
      var marker = new google.maps.Marker({
        position: center,
        map: self.map.map,
        title: self.title,
        draggable: self.draggable
      });
      marker.addListener('dragend', function(e: any) {
        self.onMoved.next({ latitude: e.latLng.lat(), longitude: e.latLng.lng() });
      });
      self.marker = marker;
    });
  }
  onInit() {
    // Unless actually false, means it's true
    this.draggable = this.draggable !== false;
    this.initialized();
  }
  onChanges(changes: { [propName: string]: SimpleChange }) {
    if('title' in changes) {
      try {
        this.marker.setTitle(changes['title'].currentValue);
      }catch(e){}
    }
  }
}
