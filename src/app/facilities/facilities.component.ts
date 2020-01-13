import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AccplanService } from '../accplan.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {
  custnumber: string;
  accnumber:string;
  nationid: string;
  username: string;

  constructor(private httpClient: HttpClient,
    private accplanService: AccplanService,
    private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(
      (queryparams: Params) => {
        console.log(queryparams);
        this.username = queryparams.username;
        this.custnumber = queryparams.custnumber;
        this.accnumber = queryparams.accnumber;
        this.nationid = queryparams.nationid;

        if(this.custnumber) {
          this.getFacilitiesList();
        this.getCards();
        this.getMcoopCash();
        }
        
      });
  }

  

  url = environment.ecol_apis_host + '/api/watch_stage?filter[where][custnumber]=' + this.custnumber;
  facilitiesList: any;
  facilitiesLength: number;
  creditcrdList: any = [];
  mcoopcashList: any = [];

  ngOnInit() {
    
  }

  // lst employees
  getFacilitiesList() {
    this.accplanService.getFacilities(this.custnumber).subscribe(data => {
      this.facilitiesList = data;
    }, error => {
      // error
      console.log('Internal Server Error status', error.status, error.statusText);
      console.log('Server Error Details', error);
    });
  }

  getCards() {
    this.accplanService.getCardwithid(this.nationid).subscribe(data => {
      // console.log(data);
      this.creditcrdList = data;
    }, error => {
      // error
      console.log('Internal Server Error status', error.status, error.statusText);
      console.log('Server Error Details', error);
    });
  }

  getMcoopCash() {
    this.accplanService.getMcoopwithid(this.nationid).subscribe(data => {
      // console.log(data);
      this.mcoopcashList = data;
    }, error => {
      // error
      console.log('Internal Server Error status', error.status, error.statusText);
      console.log('Server Error Details', error);
    });
  }

}
