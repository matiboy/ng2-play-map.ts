# ng2-play-map.ts
A Google map directive written in TypeScript for Angular2, used mostly to learn Angular 2

## Installation
`$ npm install && tsd install`

## Running it
`$ MAP_KEY='YOUR_GOOGLE_MAPS_KEY' gulp play`

## What's in it?

### Map directive
A map directive with support for two way data-binding on <code>center</code>, <code>zoom</code> and events triggered on re-center

### Marker directive
Expected to be under a map directive, allows to set `title` and `draggable` properties. Triggers a `(moved)` event

## Support or Contact

Create issues in the [repo](https://github.com/matiboy/ng2-play-map.ts)
