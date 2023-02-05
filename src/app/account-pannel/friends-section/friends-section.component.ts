import { Component } from '@angular/core';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-friends-section',
  templateUrl: './friends-section.component.html',
  styleUrls: ['./friends-section.component.css']
})
export class FriendsSectionComponent {
  constructor(public service: WebSocketService){}
}
