var assert = require('assert'),
    mercator = require('../globalmercator');

function aproxEqual(expected, actual) {
    assert(Math.abs(expected - actual) < 0.0000000001, expected + ' != ' + actual);
}

function aproxArrayEqual(expected, actual) {
    assert(expected.length === actual.length);
    for (var i = 0; i < expected.length; ++i) {
        aproxEqual(expected[i], actual[i]);
    }
}

it('should return correct resolution', function () {
    aproxEqual(156543.03392804097, mercator.resolution(0));
    aproxEqual(78271.51696402048, mercator.resolution(1));
    aproxEqual(39135.75848201024, mercator.resolution(2));
    aproxEqual(19567.87924100512, mercator.resolution(3));
    aproxEqual(9783.93962050256, mercator.resolution(4));
    aproxEqual(4891.96981025128, mercator.resolution(5));
});

it('should return correct zoom level', function () {
    aproxEqual(0, mercator.zoom(156543.03392804097));
    aproxEqual(1, mercator.zoom(78271.51696402048));
    aproxEqual(2, mercator.zoom(39135.75848201024));
    aproxEqual(3, mercator.zoom(19567.87924100512));
    aproxEqual(4, mercator.zoom(9783.93962050256));
    aproxEqual(5, mercator.zoom(4891.96981025128));
});

it('should convert latlon to meters', function () {
    aproxArrayEqual([1569604.8201851572, 8930630.669201756], mercator.latLonToMeters(62.3, 14.1));
});

it('should convert meters to latlon', function () {
    aproxArrayEqual([62.3, 14.1], mercator.metersToLatLon(1569604.8201851572, 8930630.669201756));
});

it('should convert pixels to meters', function () {
    aproxArrayEqual([0, 0], mercator.pixelsToMeters(128, 128, 0));
    aproxArrayEqual([569754371.206588, 569754371.206588], mercator.pixelsToMeters(123456789, 123456789, 15));
});

it('should convert meters to pixels', function () {
    aproxArrayEqual([128, 128], mercator.metersToPixels(0, 0, 0));
    aproxArrayEqual([123456789, 123456789], mercator.metersToPixels(569754371.206588, 569754371.206588, 15));    
});

it('should convert latlon to pixels', function () {
    aproxArrayEqual([4522857.8133333335, 6063687.123767246], mercator.latLonToPixels(62.3, 14.1, 15));
});

it('should convert pixels to latlon', function () {
    aproxArrayEqual([62.3, 14.1], mercator.pixelsToLatLon(4522857.8133333335, 6063687.123767246, 15));
});

it('should convert pixels to tile', function () {
    aproxArrayEqual([0, 0], mercator.pixelsToTile(128, 128));
    aproxArrayEqual([482253, 482253], mercator.pixelsToTile(123456789, 123456789));
});

it('should convert meters to tile', function () {
    aproxArrayEqual([0, 0], mercator.metersToTile(0, 0, 0));
    aproxArrayEqual([482253, 482253], mercator.metersToTile(569754371.206588, 569754371.206588, 15));
});

it('should return tile bounds', function () {
    var expected = [ 569754270.8829883, 569754270.8829883, 569755493.875441, 569755493.875441];
    aproxArrayEqual(expected, mercator.tileBounds(482253, 482253, 15));
});

it('should return tile latlon bounds', function () {
    aproxArrayEqual([ -85.05112877980659, -180, -85.05018093458115, -179.989013671875], mercator.tileLatLonBounds(0, 0, 15));
    aproxArrayEqual([85.0511287798066, 180, 85.05207644397983, 180.010986328125], mercator.tileLatLonBounds(32768, 32768, 15));
});
