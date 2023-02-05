import { Component } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-account-pannel',
  templateUrl: './account-pannel.component.html',
  styleUrls: ['./account-pannel.component.css']
})
export class AccountPannelComponent {
  constructor(public helper: HelperService){}
}
