System.register(['angular2/angular2', './map', './marker', './services/googlemaps'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var angular2_1, map_1, marker_1, googlemaps_1;
    var MAP_KEY_PROVIDER, GoogleMapComponent;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (map_1_1) {
                map_1 = map_1_1;
            },
            function (marker_1_1) {
                marker_1 = marker_1_1;
            },
            function (googlemaps_1_1) {
                googlemaps_1 = googlemaps_1_1;
            }],
        execute: function() {
            MAP_KEY_PROVIDER = angular2_1.provide(map_1.MAP_KEY, { useValue: 'AIzaSyB9iOrrYmVBE05EX3KawqbeCVA1XPMuDRQ' });
            GoogleMapComponent = (function () {
                function GoogleMapComponent(_ngZone) {
                    this._ngZone = _ngZone;
                    this.center = {
                        latitude: '3.1113339',
                        longitude: '101.6655921'
                    };
                    this.mapcenter = { lat: function () { return 0; }, lng: function () { return 0; } };
                    this.dragging = 'Nope';
                    this.zoom = 15;
                    this.moves = 0;
                    this._ngZone = _ngZone;
                }
                GoogleMapComponent.prototype.setDragging = function (v) {
                    this.dragging = v ? '<b>Yes</b>' : '<i>No</i>';
                    this._ngZone.run(function () { return 0; });
                };
                GoogleMapComponent.prototype.centerToLocation = function (location) {
                    var self = this;
                    self.moves++;
                    if (!location) {
                        // Get current location
                        // Ignore if rejected
                        navigator.geolocation.getCurrentPosition(function (geo) {
                            self.center = geo.coords;
                        });
                    }
                    else {
                        self.center = location;
                        self._ngZone.run(function () { return 0; });
                    }
                };
                GoogleMapComponent.prototype.whereAreWe = function (latlng) {
                    this.mapcenter = latlng;
                    this._ngZone.run(function () { return 0; });
                };
                GoogleMapComponent = __decorate([
                    angular2_1.Component({
                        selector: 'googlemap'
                    }),
                    angular2_1.View({
                        directives: [map_1.MapDirective, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, marker_1.MarkerDirective],
                        templateUrl: 'templates/main.html'
                    }), 
                    __metadata('design:paramtypes', [angular2_1.NgZone])
                ], GoogleMapComponent);
                return GoogleMapComponent;
            })();
            angular2_1.bootstrap(GoogleMapComponent, [MAP_KEY_PROVIDER, googlemaps_1.GoogleMapsService]);
        }
    }
});
