export class Map {
  map: any;
  constructor(map: any) {
    this.map = map;
  }
  getCenter() {
    return this.map.getCenter();
  }
  addListener(event: string, callback: Function) {
    this.map.addListener(event, callback);
  }
  getZoom(): number {
    return this.map.getZoom();
  }
  setZoom(z: number) {
    return this.map.setZoom(z);
  }
  panTo(to: any) {
    this.map.panTo(to);
  }
}
