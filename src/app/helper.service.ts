import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  leftPosition: string = "-100";

  constructor() {}
  capitalize(str: string) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
  }

  
}
