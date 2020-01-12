import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AccplanService } from '../accplan.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {

  constructor(private httpClient: HttpClient, private accplanService: AccplanService) { }

  custnumber = localStorage.getItem('custnumber');
  accnumber = localStorage.getItem('accnumber');
  nationid = localStorage.getItem('nationid');

  url = environment.ecol_apis_host + '/api/v2/views/' + this.custnumber;
  facilitiesList: any;
  facilitiesLength: number;
  creditcrdList: any = [];
  mcoopcashList: any = [];

  ngOnInit() {
    this.getFacilitiesList();
    this.getCards();
    this.getMcoopCash();
  }

  // lst employees
  getFacilitiesList() {
    this.accplanService.getFacilities(this.custnumber).subscribe(data => {
      console.log(data);
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
