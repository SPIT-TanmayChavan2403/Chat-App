import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import * as io from 'socket.io-client';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
    socket: any;
    id:string = "";
    chats: string[] = [];
    username:string = "";
    friendName: string = "";
    isOnline: boolean = false;
    userList: string[] = [];
    // userList: string[] = ["Tanmay Chavan"];
    about: string = "";
    password: string = "";
    profileURL: string = "";
    readonly uri: string = "ws://localhost:3000";

    constructor() {
      this.socket = io(this.uri);
    }

    fetchChats(name: string){
      this.friendName = name;
      let data = {
        user: window.sessionStorage.getItem('user'),
        friend: name
      }
      fetch("http://localhost:5000/getChats", {
        method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(resp => resp.json())
      .then(data => {
        this.chats = data.msg;
        this.isOnline = data.status;
        this.chats.shift();
        console.log(this.chats);
      })
      .catch(err => console.log("Couldn't fetch chats of user", name));
    }

    fetchUserList(username: string){
      this.saveUsername(username);
      fetch("http://localhost:5000/getUserList", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username})
      })
      .then(res => res.json())
      .then(data => {
        this.userList = data.msg;
        console.log(this.userList);
      })
      .catch(err => console.log(err));
    }

    saveUsername(name:string){
      this.username = name;
      this.socket.emit('saveSocketId', {id: this.id, username: this.username});
    }

    // Listen is a userdefined function returning observable.
    listen(eventName: string){
      return new Observable((subscriber) =>{
        this.socket.on(eventName, (data: string) => {
          subscriber.next(data);
        })
      });
    }

    sendMessage(message: string, textBox: any, chatSec: any){
      if (message.trim().length == 0){
        console.log(message);
        return;
      }
      textBox.value = "";
      let msg = "TO/" + message;
      this.chats.push(msg);
      console.log('Message sending is...',msg);
      this.socket.emit('sendMessage', {sender:this.username, receiver: this.friendName, message});
      setTimeout(() => {
        chatSec.scrollTo(0, chatSec.scrollHeight);
      }, 200)
    }

    emit(eventName:string, data: any){
      this.socket.emit(eventName, data);
    }
}