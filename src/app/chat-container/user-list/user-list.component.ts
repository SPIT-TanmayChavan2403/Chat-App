import { Component } from '@angular/core';
import { WebSocketService } from 'src/app/web-socket.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
    constructor(public service: WebSocketService){}

    displayChats(name: string){
      console.log(name);
    }
}
