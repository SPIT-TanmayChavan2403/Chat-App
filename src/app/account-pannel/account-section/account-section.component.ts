import { Component } from '@angular/core';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-account-section',
  templateUrl: './account-section.component.html',
  styleUrls: ['./account-section.component.css']
})
export class AccountSectionComponent {
  constructor(public service: WebSocketService){}

  updateInfo(inp: any, type:string){
    console.log(inp)
    console.log(inp.value);
    const data = {
      user: window.sessionStorage.getItem('user'),
      value: inp.value,
      type: type
    }

    fetch("http://localhost:5000/updateAcccountInfo", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => alert('Updated successfull!'))
    .catch(err => alert("Something went wrong"));
  }
}
