import {OpaqueToken, Inject, Directive, Input, Output, OnChanges, SimpleChange, ElementRef, EventEmitter} from 'angular2/angular2';
import {CONST_EXPR} from 'angular2/src/core/facade/lang';

export const MAP_KEY: OpaqueToken = CONST_EXPR(new OpaqueToken('mapKey'));

@Directive({
  selector: 'map'
})
export class MapDirective implements OnChanges {
  @Input() center: Object;
  @Input() zoom: number;
  @Output() dragStart = new EventEmitter();
  @Output() dragEnd = new EventEmitter();
  @Output() recentered = new EventEmitter();
  @Output() zoomChange = new EventEmitter();
  private gotCenter: Function;
  private gotZoom: Function;
  private ready: Promise<any>;
  constructor(@Inject(MAP_KEY) mapKey: string, elementRef: ElementRef) {
    var self = this;
    let gotCenter = new Promise( (resolve, reject) => {
      self.gotCenter = resolve;
    });
    let gotZoom = new Promise( (resolve, reject) => {
      self.gotZoom = resolve;
    });
    let scriptLoaded = this.loadScript(mapKey).then( () => {
      console.debug('Google script has been loaded');
    });
    this.ready = Promise.all([scriptLoaded, gotCenter, gotZoom]).then(function(outcome: any[]) {
      var center = self.objToLatLng(outcome[1]);
      var zoom = outcome[2];
      var map = new google.maps.Map(elementRef.nativeElement, {
        center: center,
        zoom: zoom
      });
      return map;
    });
    this.ready.then(this.addEventListeners.bind(this));
  }
  addEventListeners(map) {
    var self = this;
    map.addListener('dragstart', () => {
      console.log('started');
      self.dragStart.next(true);
    });
    map.addListener('dragend', () => {
      console.log('stopped');
      self.dragEnd.next(false);
    });
    map.addListener('center_changed', () => {
      self.recentered.next(map.getCenter());
    });
    map.addListener('zoom_changed', () => {
      self.zoomChange.next(map.getZoom());
    });
  }
  private objToLatLng(o: Object) {
    return new google.maps.LatLng(o['latitude'], o['longitude']);
  }
  loadScript(key:string) {
    return new Promise( (resolve, reject) => {
      var script = document.createElement('script');
      script.onload = function() {
        resolve();
      }
      script.setAttribute('src', "https://maps.googleapis.com/maps/api/js?key=" + key);
      document.getElementsByTagName('body')[0].appendChild(script);
    });
  }
  centerMap(center: Object) {
    var self = this;
    this.ready.then(function(map) {
      map.panTo(self.objToLatLng(center));
    });
  }
  zoomMap(zoom: number) {
    this.ready.then(function(map) {
      map.setZoom(zoom);
    });
  }
  onChanges(changes: {[propName: string]: SimpleChange}) {
    // Using the [''] notation to avoid ".center" is not a property of SimpleChange
    if('center' in changes){
      let center = changes['center'].currentValue;
      if (center !== undefined) {
        // Resolve the center promise - only happens once
        this.gotCenter(center);
        // Center the map
        this.centerMap(center);
      }
    }
    if('zoom' in changes){
      let zoom = parseInt(changes['zoom'].currentValue, 10);
      if (zoom !== undefined) {
        // Resolve the zoom promise - only happens once
        this.gotZoom(zoom);
        // zoom the map
        this.zoomMap(zoom);
      }
    }
  }
}
