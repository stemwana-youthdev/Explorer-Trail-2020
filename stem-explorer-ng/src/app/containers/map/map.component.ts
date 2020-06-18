import { ApiService } from './../../shared/services/api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})



export class MapComponent implements OnInit {

  name: string;
  lat: number;
  lng: number;

  zoom = 12;
  markers = [];
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions={
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8
  }

  location: Object;


  constructor(service: ApiService) {
     
    this.location = service.getLocations().subscribe(data => { //display data in console
      console.log(data);
    });

    /*
    service.getLocations().subscribe(data => {
      console.log(data);
      let array = [];
      for(let key in data){
        if(data.hasOwnProperty(key)){
          array.push(data[key]);
        }
      }
      console.log(array);
      
      this.markers = Object.keys(data).map(function (key) {
        this.markers.push({[key]:data[key]})
        return this.markers;
      })
      */

      /*this.markers.push(data);
      for(let i = 0; i < this.markers.length; i++){
        console.log(this.markers[i]);
      }
      
    });*/
   }


   addMarker(){
    this.markers.push({
      position:{
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      }, label: {color: 'red',
      text: 'Marker label ' + (this.markers.length + 1),},
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }
  
  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: -37.683334,
        lng: 176.166672
      }
    })
  }

  zoomIn(){
    if(this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut(){
    if(this.zoom > this.options.minZoom) this.zoom--
  }
  
  
  

}


