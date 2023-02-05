import { Component } from '@angular/core';
import { HelperService } from 'src/app/helper.service';
import { WebSocketService } from 'src/app/web-socket.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
    imgURL: SafeResourceUrl = "";
    file: any = null;
    constructor(public service: WebSocketService, public helper:HelperService, private DS: DomSanitizer){
    }
    
    updateFrame(chatSection: any){
      chatSection.scrollTo(0, chatSection.scrollHeight)
    }

    sendImage(display: HTMLElement, btn: HTMLElement){
      display.style.transform = "scale(1) translate(-50%, -50%)";
      btn.click();
      btn.addEventListener('change', (e: any) => {
        const fileList = e.target.files;
        this.file = fileList[0];
        console.log(fileList[0]);
        this.imgURL = this.DS.bypassSecurityTrustUrl(URL.createObjectURL(e.target.files[0]));
      })
    }

    uploadImage(display: HTMLElement, message: HTMLElement, chatSection:HTMLElement){
      let formData = new FormData();
      formData.append('image', this.file);

      fetch("http://localhost:5000/uploadImage", {
        method: "POST",
        body: formData
      })
      .then(response => {
        display.style.transform = "scale(0) translate(-50%, -50%)";
        return response.json()
      })
      .then(data => {
        this.service.sendMessage(data.url, message, chatSection)
        console.log(data.url)
      })
      .catch(err => console.log(err));
    }
}
