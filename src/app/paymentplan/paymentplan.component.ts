import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { AccplanService } from '../accplan.service';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-paymentplan',
  templateUrl: './paymentplan.component.html',
  styleUrls: ['./paymentplan.component.scss']
})
export class PaymentplanComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  cust: string;
  acc: string;
  username: any;

  ptphis: any;
  result: any;
  model: any = {
    planfreq: null,
    ptpamount: null,
    no_of_frequency: null,
    ptpstartdate: null,
    ptpenddate: null
  };

  constructor(private accplanService: AccplanService,
    private route: ActivatedRoute) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 7);

    this.route.queryParams.subscribe(
      (queryparams: Params) => {
        this.username = queryparams.username;
        this.cust = queryparams.custnumber;
        this.acc = queryparams.accnumber;
      });
  }

  ngOnInit() {
    this.getNotes();
  }

  onSubmit(form) {
    // console.log(form);
    const body = {
      planid: this.cust,
      accnumber: this.acc,
      custnumber: this.cust,
      ptpfreq: form.value.planfreq,
      ptpamount: form.value.ptpamount,
      no_of_frequency: form.value.no_of_frequency,
      ptpstartdate: form.value.ptpstartdate + 1,
      ptpenddate: form.value.ptpenddate + 1,
      owner: this.username
    };

    this.accplanService.submitPtp(body).subscribe(data => {
      this.result = data;
      if (this.result.id) {
        swal('Successful!', 'saved successfully!', 'success');
        this.getNotes();
      } else {
        swal('Error!', 'Error occurred during processing!', 'error');
      }
      // this.mydisable = true;
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  getNotes() {
    this.accplanService.getPtps(this.cust).subscribe(data => {
      // console.log(data);
      this.ptphis = data;
    }, error => {
      console.log(error);
    });
  }

}
