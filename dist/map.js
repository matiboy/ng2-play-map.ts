System.register(['angular2/angular2', 'angular2/src/core/facade/lang', './models/map', './services/maps', './services/googlemaps'], function(exports_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var angular2_1, lang_1, map_1, maps_1, googlemaps_1;
    var MAP_KEY, MapDirective;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (map_1_1) {
                map_1 = map_1_1;
            },
            function (maps_1_1) {
                maps_1 = maps_1_1;
            },
            function (googlemaps_1_1) {
                googlemaps_1 = googlemaps_1_1;
            }],
        execute: function() {
            exports_1("MAP_KEY", MAP_KEY = lang_1.CONST_EXPR(new angular2_1.OpaqueToken('mapKey')));
            MapDirective = (function () {
                function MapDirective(mapKey, mapService, loader, elementRef) {
                    this.dragStart = new angular2_1.EventEmitter();
                    this.dragEnd = new angular2_1.EventEmitter();
                    this.recentered = new angular2_1.EventEmitter();
                    this.zoomChange = new angular2_1.EventEmitter();
                    var self = this;
                    var gotCenter = new Promise(function (resolve, reject) {
                        self.gotCenter = resolve;
                    });
                    var gotZoom = new Promise(function (resolve, reject) {
                        self.gotZoom = resolve;
                    });
                    var scriptLoaded = loader.load(mapKey).then(function () {
                        console.debug('Google script has been loaded');
                    });
                    this.ready = Promise.all([scriptLoaded, gotCenter, gotZoom]).then(function (outcome) {
                        var center = self.objToLatLng(outcome[1]);
                        var zoom = outcome[2];
                        var map = new google.maps.Map(elementRef.nativeElement, {
                            center: center,
                            zoom: zoom
                        });
                        map = new map_1.Map(map);
                        mapService.setMap(map);
                        return map;
                    });
                    this.ready.then(this.addEventListeners.bind(this));
                }
                MapDirective.prototype.addEventListeners = function (map) {
                    var self = this;
                    map.addListener('dragstart', function () {
                        console.log('started');
                        self.dragStart.next(true);
                    });
                    map.addListener('dragend', function () {
                        console.log('stopped');
                        self.dragEnd.next(false);
                    });
                    map.addListener('center_changed', function () {
                        self.recentered.next(map.getCenter());
                    });
                    map.addListener('zoom_changed', function () {
                        self.zoomChange.next(map.getZoom());
                    });
                };
                MapDirective.prototype.objToLatLng = function (o) {
                    return new google.maps.LatLng(o['latitude'], o['longitude']);
                };
                MapDirective.prototype.centerMap = function (center) {
                    var self = this;
                    this.ready.then(function (map) {
                        map.panTo(self.objToLatLng(center));
                    });
                };
                MapDirective.prototype.zoomMap = function (zoom) {
                    this.ready.then(function (map) {
                        map.setZoom(zoom);
                    });
                };
                MapDirective.prototype.onChanges = function (changes) {
                    // Using the [''] notation to avoid ".center" is not a property of SimpleChange
                    if ('center' in changes) {
                        var center = changes['center'].currentValue;
                        if (center !== undefined) {
                            // Resolve the center promise - only happens once
                            this.gotCenter(center);
                            // Center the map
                            this.centerMap(center);
                        }
                    }
                    if ('zoom' in changes) {
                        var zoom = parseInt(changes['zoom'].currentValue, 10);
                        if (zoom !== undefined) {
                            // Resolve the zoom promise - only happens once
                            this.gotZoom(zoom);
                            // zoom the map
                            this.zoomMap(zoom);
                        }
                    }
                };
                __decorate([
                    angular2_1.Input(), 
                    __metadata('design:type', Object)
                ], MapDirective.prototype, "center");
                __decorate([
                    angular2_1.Input(), 
                    __metadata('design:type', Number)
                ], MapDirective.prototype, "zoom");
                __decorate([
                    angular2_1.Output(), 
                    __metadata('design:type', Object)
                ], MapDirective.prototype, "dragStart");
                __decorate([
                    angular2_1.Output(), 
                    __metadata('design:type', Object)
                ], MapDirective.prototype, "dragEnd");
                __decorate([
                    angular2_1.Output(), 
                    __metadata('design:type', Object)
                ], MapDirective.prototype, "recentered");
                __decorate([
                    angular2_1.Output(), 
                    __metadata('design:type', Object)
                ], MapDirective.prototype, "zoomChange");
                MapDirective = __decorate([
                    angular2_1.Directive({
                        selector: 'map',
                        bindings: [maps_1.MapService]
                    }),
                    __param(0, angular2_1.Inject(MAP_KEY)),
                    __param(1, angular2_1.Inject(maps_1.MapService)),
                    __param(2, angular2_1.Inject(googlemaps_1.GoogleMapsService)), 
                    __metadata('design:paramtypes', [String, maps_1.MapService, googlemaps_1.GoogleMapsService, angular2_1.ElementRef])
                ], MapDirective);
                return MapDirective;
            })();
            exports_1("MapDirective", MapDirective);
        }
    }
});
