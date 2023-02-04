import { trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  leftProp: string = "0px";
  opacity: string = "0";
  pointerE:string = "none";
  toggle:boolean = true;
  displayUserBox(){
    if(this.toggle){
      this.leftProp = "80px";
      this.opacity = "1";
      this.pointerE = "all";
    } else {
      this.leftProp = "0px";
      this.opacity = "0";
      this.pointerE = "none";
    }
    this.toggle = !this.toggle;
  }

  addFriend(name:string){
    let data = {
      user: window.sessionStorage.getItem('user'),
      friend: name
    }
    fetch("http://localhost:5000/saveUser",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => {
      alert(data.msg);
      this.displayUserBox();
    })
    .catch(err => console.log(err));
  }
}
