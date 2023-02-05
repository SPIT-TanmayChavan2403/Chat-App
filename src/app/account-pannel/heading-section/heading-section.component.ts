import { Component } from '@angular/core';
import { HelperService } from 'src/app/helper.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-heading-section',
  templateUrl: './heading-section.component.html',
  styleUrls: ['./heading-section.component.css']
})
export class HeadingSectionComponent {

  constructor(private helper: HelperService, public service: WebSocketService){}

  closeAccPannel(){
    this.helper.leftPosition = "-100";
  }
}
