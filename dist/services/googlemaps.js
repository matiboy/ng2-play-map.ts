System.register(['angular2/angular2'], function(exports_1) {
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
    var angular2_1;
    var GoogleMapsService;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            GoogleMapsService = (function () {
                function GoogleMapsService() {
                }
                GoogleMapsService.prototype.load = function (key) {
                    var p = this._isLoaded || new Promise(function (resolve, reject) {
                        var script = document.createElement('script');
                        script.onload = resolve;
                        script.setAttribute('src', "https://maps.googleapis.com/maps/api/js?key=" + key);
                        document.getElementsByTagName('body')[0].appendChild(script);
                    });
                    this._isLoaded = p;
                    return p;
                };
                GoogleMapsService = __decorate([
                    angular2_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], GoogleMapsService);
                return GoogleMapsService;
            })();
            exports_1("GoogleMapsService", GoogleMapsService);
        }
    }
});
