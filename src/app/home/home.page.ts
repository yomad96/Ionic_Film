import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../Services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  mon_filtre: string = '';

  constructor(private router: Router, private data : DataService) {}

  changePage(pathName : string, type: string, word: string){
    this.data.setData([type, word]);
    this.router.navigate([pathName])
  }



}
