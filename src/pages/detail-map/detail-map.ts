import { Component } from '@angular/core';
import { NavController, ViewController,NavParams} from 'ionic-angular';
declare var google: any;

/*
  Generated class for the DetailMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-map',
  templateUrl: 'detail-map.html'
})
export class DetailMapPage {
 map: any;
 public name;
 public item1;
 public item2;
 
public HK = [];
  constructor(public navCtrl: NavController, public view: ViewController,public navParams: NavParams) {}

  ionViewDidLoad() {
    this.item1 = this.navParams.get('item1');
    this.item2 = this.navParams.get('item2');
    this.name = this.navParams.get('name');

    let latLng = new google.maps.LatLng(this.item1, this.item2);
    let mapEle = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      center: latLng,
      zoom: 12
    });

    var marker = new google.maps.Marker({
                  position: latLng,
                  map: this.map,
                  title: ''
                });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      google.maps.event.trigger(mapEle, 'resize',marker);
    });


  }

}
