import { Component } from '@angular/core';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    displayVal:string = "flex";

    constructor(private service: WebSocketService){}
    
    login(username:string, password:string){
        let data ={
          username: username,
          password: password
        }

        // this.axiosClient.post(, data)
        fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(resp => {
          return resp.json()
        })
        .then(data => {
          if (data.status == "FAIL"){
            alert(data.msg);
          } else {
            alert(data.msg);
            console.log(data);
            this.service.about = data.data.about;
            this.service.profileURL = data.data.profileUrl;
            this.service.password = data.data.password;
            window.sessionStorage.setItem('user', data.username)
            this.displayVal = 'none';
            this.service.fetchUserList(data.username);
            console.log(this.service.chats.length);

          }
        })
        .catch(err => console.log(err));
    }   
}
