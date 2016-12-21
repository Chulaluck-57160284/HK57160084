import { Component } from '@angular/core';
import { DetailTourPage } from '../detail-tour/detail-tour';
import { NavController, AlertController  } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
 list = [];
  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, public http: Http) {
     this.loadDB();
  }
  addDB(obj){
    this.http.post("http://angsila.cs.buu.ac.th/~57160284/887330/HK/store.php",obj)
    .subscribe(data =>{
      console.log(data);
      var resp = data.text().trim();
      if(resp = "success"){
        console.log(resp);
        this.loadDB();
      } else {
        console.log("Add error");
      }
      
    }, err=>{
      console.log(err);
    })
  }
  editDB(obj,id){
    var wb = "http://angsila.cs.buu.ac.th/~57160284/887330/HK/edit.php?id="+id;
    this.http.post(wb,obj)
    .subscribe(data =>{
      console.log(data);
      var resp = data.text().trim();
      if(resp = "success"){
        console.log(resp);
        this.loadDB();
      } else {
        console.log("Edit error");
      }
      
    }, err=>{
      console.log(err);
    })
  }

  loadDB(){
    this.http.get("http://angsila.cs.buu.ac.th/~57160284/887330/HK/load.php")
    .subscribe(data =>{
      this.list = data.json();
    }, err=>{
      console.log(err);
    })
  }
   addHK(){
     //$sql = "INSERT INTO tour_HK (name,address,detail,img,longitude,latitude)
     // VALUES ('$name','$address','$detail','$img','$longitude','$latitude')";
    let prompt = this.alertCtrl.create({
      title: "Add HK",
      message: "Enter a title for your HongKong list",
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        },{
          name: 'address',
          placeholder: 'address'
        },{
          name: 'detail',
          placeholder: 'detail'
        },{
          name: 'img',
          placeholder: 'img'
        },{
          name: 'latitude',
          placeholder: 'latitude'
        },{
          name: 'longitude',
          placeholder: 'longitude'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          handler:data=>{
            console.log("cancel clicked");
          }
        },{
          text: 'Add',
          handler:data=>{
            this.list.push(data);
            this.addDB(data);
          }
        }

      ]
    })

    prompt.present();
  }

   edit(id,name,address,detail,img,longitude,latitude){
     //$sql = "INSERT INTO tour_HK (name,address,detail,img,longitude,latitude)
     // VALUES ('$name','$address','$detail','$img','$longitude','$latitude')";
    let prompt2 = this.alertCtrl.create({
      title: "Add HK",
      message: "Enter a title for your HongKong list",
      inputs: [
        {
          name: 'name',
          placeholder: 'name',
          value: name
        },{
          name: 'address',
          placeholder: 'address',
           value: address
        },{
          name: 'detail',
          placeholder: 'detail',
          value: detail
        },{
          name: 'img',
          placeholder: 'img',
          value: img
        },{
          name: 'latitude',
          placeholder: 'latitude',
          value: latitude
        },{
          name: 'longitude',
          placeholder: 'longitude',
          value: longitude
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          handler:data=>{
            console.log("cancel clicked");
          }
        },{
          text: 'Edit',
          handler:data=>{
            this.list.push(data);
            this.editDB(data,id);
          }
        }

      ]
    })

    prompt2.present();
  }

  goNextPage(HK){
    
    this.navCtrl.push(DetailTourPage,{
      name:HK.name,
      img:HK.img,
      address:HK.address,
      detail:HK.detail,
      item1: HK.latitude,
      item2: HK.longitude
    })
  }
  remove(id){
   //this.list.splice(i,1);
    this.http.post("http://angsila.cs.buu.ac.th/~57160284/887330/HK/delete.php",{id:id})
    .subscribe(data =>{
      console.log(data);
      var resp = data.text().trim();
      if(resp = "success"){
        console.log(resp);
        this.loadDB();
      } else {
        console.log("Delete Fail");
      }
      
    }, err=>{
      console.log(err);
    })
  }
  
 

}
