import { Component, OnInit } from '@angular/core';
import { Socket } from 'socket.io-client/build/esm/socket';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-application';
  username:string = "";
  reciever:string = "";
  constructor(private webSocketService: WebSocketService){}
  
  ngOnInit(){
    this.webSocketService.listen('firstEmit').subscribe((data: any) => {
      this.webSocketService.id = data;
      // Event to save the socketid in the datbase.
      let reqData = {
        socketId: data,
        user: window.sessionStorage.getItem('user')
      }

      fetch("http://localhost:5000/saveSocketID", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqData)
        })
    })
    this.webSocketService.listen('acknowledgement').subscribe((data: any) => {
      console.log(data);
    })

    this.webSocketService.listen('messageReceived').subscribe((data: any) => {
      let msg = "FROM/" + data;
      this.webSocketService.chats.push(msg);
      console.log(data);
    })

    if (!window.sessionStorage.getItem('user')){
      alert("PLease login before starting Chat.");
    }
  }
}
