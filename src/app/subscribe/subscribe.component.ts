import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '1364820396988229',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }
private facebookLogin(){
  FB.login((response)=>
            {
              // console.log('submitLogin',response);
              if (response.authResponse)
              {
                this.fetchData(response.authResponse.userID);
              }
               else
               {
                 
             }
          });

  }

  private fetchData(userId) {
    FB.api(
      '/'+userId+'/accounts',
      {
        fields: 'id,name,first_name,middle_name,last_name,' +
                'email,birthday,about,address,gender,hometown,link,location,education,work,relationship_status,picture,' +
                'religion,interested_in,languages,meeting_for,payment_pricepoints,political,significant_other,sports,website,' +
                'books,events,family,favorite_athletes,favorite_teams,inspirational_people,' +
                'friends,friendlists,games,likes,groups,ad_studies'
      },
      (response) => {
        if (response && !response.error) {
          console.log('Deu certo'); 
          
          console.log(response);
        }
        console.log('Deu errado');
        console.log(response);
      }
    );
  }
}












