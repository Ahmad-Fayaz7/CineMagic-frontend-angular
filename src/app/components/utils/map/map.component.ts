import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapCoordinates } from './coordinate';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  constructor() {}

  @Input() initialCoordinates: mapCoordinates[] = [];
  @Output() onSelectedLocation = new EventEmitter<mapCoordinates>();
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'CineMagic',
      }),
    ],
    zoom: 16,
    center: latLng(37.99244159235802, 358.8704901222761),
  };

  layers: Marker<any>[] = [];

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map((value) =>
      marker([value.latitude, value.longitude])
    );
  }

  handleMapClick(event: LeafletMouseEvent) {
    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;
    console.log({ latitude, longitude });
    this.layers = [];
    this.layers.push(marker([latitude, longitude]));
    this.onSelectedLocation.emit({ latitude, longitude });
  }
}
