System.register(['angular2/angular2', './services/maps'], function(exports_1) {
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
    var angular2_1, maps_1;
    var MarkerDirective;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (maps_1_1) {
                maps_1 = maps_1_1;
            }],
        execute: function() {
            MarkerDirective = (function () {
                function MarkerDirective(mapService) {
                    this.draggable = false;
                    this.title = '';
                    this.onMoved = new angular2_1.EventEmitter();
                    var self = this;
                    Promise.all([mapService.map, new Promise(function (resolve) {
                            self.initialized = resolve;
                        })]).then(function (out) {
                        self.map = out[0];
                        var marker = new google.maps.Marker({
                            position: self.map.getCenter(),
                            map: self.map.map,
                            title: self.title,
                            draggable: self.draggable
                        });
                        marker.addListener('dragend', function (e) {
                            self.onMoved.next({ latitude: e.latLng.lat(), longitude: e.latLng.lng() });
                        });
                        self.marker = marker;
                    });
                }
                MarkerDirective.prototype.onInit = function () {
                    // Unless actually false, means it's true
                    this.draggable = this.draggable !== false;
                    this.initialized();
                };
                MarkerDirective.prototype.onChanges = function (changes) {
                    if ('title' in changes) {
                        try {
                            this.marker.setTitle(changes['title'].currentValue);
                        }
                        catch (e) { }
                    }
                };
                __decorate([
                    angular2_1.Input(), 
                    __metadata('design:type', Object)
                ], MarkerDirective.prototype, "draggable");
                __decorate([
                    angular2_1.Input(), 
                    __metadata('design:type', Object)
                ], MarkerDirective.prototype, "title");
                __decorate([
                    angular2_1.Output(), 
                    __metadata('design:type', Object)
                ], MarkerDirective.prototype, "onMoved");
                MarkerDirective = __decorate([
                    angular2_1.Directive({
                        selector: 'marker'
                    }),
                    __param(0, angular2_1.Host()), 
                    __metadata('design:paramtypes', [maps_1.MapService])
                ], MarkerDirective);
                return MarkerDirective;
            })();
            exports_1("MarkerDirective", MarkerDirective);
        }
    }
});
