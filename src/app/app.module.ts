import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { AccountComponent } from './chat-container/account/account.component';
import { UserListComponent } from './chat-container/user-list/user-list.component';
import { ChatComponent } from './chat-container/chat/chat.component';
import { LoginComponent } from './login/login.component';
import { AccountPannelComponent } from './account-pannel/account-pannel.component';
import { AccountSectionComponent } from './account-pannel/account-section/account-section.component';
import { HeadingSectionComponent } from './account-pannel/heading-section/heading-section.component';
import { FriendsSectionComponent } from './account-pannel/friends-section/friends-section.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatContainerComponent,
    AccountComponent,
    UserListComponent,
    ChatComponent,
    LoginComponent,
    AccountPannelComponent,
    AccountSectionComponent,
    HeadingSectionComponent,
    FriendsSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
