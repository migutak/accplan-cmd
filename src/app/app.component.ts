import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AccplanService } from './accplan.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  firstname: string;
  username: string;
  addressline: string;
  telnumber: string;
  facilities: Number = 0;
  custnumber: string
  accnumber: string
  url: string

  showLoadingIndicator = true;

  constructor(private httpClient: HttpClient,
    private accplanService: AccplanService,
    private route: ActivatedRoute, ) {
    

    this.route.queryParams.subscribe(
      (queryparams: Params) => {
        this.username = queryparams.username;
        this.custnumber = queryparams.custnumber;
        this.accnumber = queryparams.accnumber;

        if (this.accnumber) {
          this.getCustomer();
        } 

      });
  }

  ngOnInit() {



    
  }

  getCustomer() {
    this.url = environment.ecol_apis_host + '/api/tqall/' + this.accnumber;
    this.httpClient.get<any>(this.url).subscribe(data => {
      this.firstname = data.client_name;
      this.addressline = data.addressline1;
      this.telnumber = data.telnumber;
      this.showLoadingIndicator = false;
    }, error => {
      console.log(error)
      this.showLoadingIndicator = false;
    });
  }

  getFacilities() {
    this.accplanService.getFacilities(this.custnumber);
  }
}
