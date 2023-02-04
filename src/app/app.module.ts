import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { AccountComponent } from './chat-container/account/account.component';
import { UserListComponent } from './chat-container/user-list/user-list.component';
import { ChatComponent } from './chat-container/chat/chat.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatContainerComponent,
    AccountComponent,
    UserListComponent,
    ChatComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
