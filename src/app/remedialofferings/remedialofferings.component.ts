import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AccplanService } from '../accplan.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-remedialofferings',
  templateUrl: './remedialofferings.component.html',
  styleUrls: ['./remedialofferings.component.scss']
})
export class RemedialofferingsComponent implements OnInit {

  cust: string;
acc:string;
username: any;

  constructor(
    private accplanService: AccplanService,
    private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(
      (queryparams: Params) => {
        this.username = queryparams.username;
        this.cust = queryparams.custnumber;
        this.acc = queryparams.accnumber;
      });
  }

  remedialofferingshis: any;
  remedialofferingshislength: number;
  model: any = {};
  mydisable = false;

  ngOnInit() {
    this.getNotes();
  }

  onSubmit(form) {
    this.accplanService.loader();
    const body = {
      planid: this.cust,
      accnumber: this.acc,
      custnumber: this.cust,
      remedialofferings: form.value.remedialofferings,
      owner: this.username,
      dateupdated: new Date()
    };

    this.accplanService.submitRemedialoffering(body).subscribe(data => {
      swal.fire('Successful!', 'saved successfully!', 'success');
      this.getNotes();
      this.mydisable = true;
    }, error => {
      console.log(error);
      swal.fire('Error!', 'Error occurred during processing!', 'error');
    });
  }

  getNotes() {
    this.accplanService.getRemedialofferings(this.cust).subscribe(data => {
      this.remedialofferingshis = data;
      if (this.remedialofferingshis.length > 0) {
        this.remedialofferingshislength = this.remedialofferingshis.length;
        this.model.remedialofferings = data[0].remedialofferings;
        this.model.currentremedialofferings = data[0].remedialofferings;
      }
    }, error => {
      console.log(error);
    });
  }

  onChange(deviceValue) {
    this.mydisable = this.model.currentabilitytopay === deviceValue;
  }

}
