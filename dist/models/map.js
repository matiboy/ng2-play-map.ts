System.register([], function(exports_1) {
    var Map;
    return {
        setters:[],
        execute: function() {
            Map = (function () {
                function Map(map) {
                    this.map = map;
                }
                Map.prototype.getCenter = function () {
                    return this.map.getCenter();
                };
                Map.prototype.addListener = function (event, callback) {
                    this.map.addListener(event, callback);
                };
                Map.prototype.getZoom = function () {
                    return this.map.getZoom();
                };
                Map.prototype.setZoom = function (z) {
                    return this.map.setZoom(z);
                };
                Map.prototype.panTo = function (to) {
                    this.map.panTo(to);
                };
                return Map;
            })();
            exports_1("Map", Map);
        }
    }
});
