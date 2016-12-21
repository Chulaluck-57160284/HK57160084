import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController, ViewController} from 'ionic-angular';
declare var google: any;
@Component({
  selector: 'page-detail-tour',
  templateUrl: 'detail-tour.html'
})
export class DetailTourPage {
 map: any;
 public name;
 public item1;
 public item2;
 public detail;
 public img;
 public address;
public HK = [];
  constructor(public navCtrl: NavController, public view: ViewController,public navParams: NavParams) {}

  ionViewDidLoad() {
    this.item1 = this.navParams.get('item1');
    this.item2 = this.navParams.get('item2');
    this.name = this.navParams.get('name');
    this.address = this.navParams.get('address');
    this.detail = this.navParams.get('detail');
     this.img = this.navParams.get('img');

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
