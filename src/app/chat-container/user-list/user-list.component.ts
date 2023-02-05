import { Component } from '@angular/core';
import { HelperService } from 'src/app/helper.service';
import { WebSocketService } from 'src/app/web-socket.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
    constructor(public service: WebSocketService, public helper: HelperService){}

    displayChats(name: string){
      console.log(name);
    }
}
