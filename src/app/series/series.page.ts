import { Component, OnInit } from '@angular/core';
import { APIService } from "../Services/api.service";
import {DataService} from "../Services/data.service";
import {error} from "util";

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {
  array : [] = [];
  dataPath : any;
  arrayNew: [] = [];
  number: number = 1;
  totalResult: any;
  showData : boolean = false;

  constructor(private api: APIService, private data: DataService) { }

  ngOnInit() {
    this.api.setType(this.data.getData()[0]);
    this.api.setSearch(this.data.getData()[1]);
    this.api.setPageNumber(''+this.number+'');
    this.api.getApi().subscribe({
      next: data => {
        if(data['Response'] == "False"){
          this.showData = false;
          console.log("Error");
        }
        if(data['Response'] == "True"){
          this.showData = true;
          this.array = data['Search'];
          this.array.forEach(element => {
            if(element['Poster'] == 'N/A'){
              // @ts-ignore
              element['Poster'] = "/assets/unnamed.jpg";
            }
          })
        }
      }
    });
  }


  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // @ts-ignore
      this.number = this.number + 1;
      this.api.setPageNumber('' + this.number + '');
      this.api.getApi().subscribe(data => {
        this.arrayNew = data['Search'];
        this.arrayNew.forEach(element => {
          if (element['Poster'] == 'N/A') {
            // @ts-ignore
            element['Poster'] = "/assets/unnamed.jpg";
          }
          this.array.push(element);
        });
      });
    }, 500);
  }

}
