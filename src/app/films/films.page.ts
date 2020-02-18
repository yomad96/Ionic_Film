import {Component, OnInit, ViewChild} from '@angular/core';
import {APIService} from "../Services/api.service";
import {DataService} from "../Services/data.service";
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
    selector: 'app-films',
    templateUrl: './films.page.html',
    styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {
    // @ts-ignore
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    array: [] = [];
    totalResult: any;
    number: number = 1;
    arrayNew: [] = [];
    showData : boolean = false;

    constructor(private api: APIService, private data: DataService) {
    }

    ngOnInit() {
      console.log(this.number);
      this.array = [];
      this.number = 1;
      this.api.setType(this.data.getData()[0]);
      this.api.setSearch(this.data.getData()[1]);
      this.api.setPageNumber(''+this.number+'');
      console.log("ngOnInit :"+this.data.getData()[1]);
      this.api.getApi().subscribe({
          next: data => {
              if (data['Response'] == "False") {
                  console.log("Error");
                  this.showData = false;
              }
              if (data['Response'] == "True") {
                  this.showData = true;
                  this.array = data['Search'];
                  this.array.forEach(element => {
                      if (element['Poster'] == 'N/A') {
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
