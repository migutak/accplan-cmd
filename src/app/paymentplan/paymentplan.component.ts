import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { AccplanService } from '../accplan.service';

import { environment } from '../../environments/environment';

const cust = localStorage.getItem('custnumber');
const acc = localStorage.getItem('accnumber');
const username = localStorage.getItem('username');

@Component({
  selector: 'app-paymentplan',
  templateUrl: './paymentplan.component.html',
  styleUrls: ['./paymentplan.component.scss']
})
export class PaymentplanComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

  ptphis: any;
  result: any;
  model: any = {
    planfreq: null,
    ptpamount: null,
    no_of_frequency: null,
    ptpstartdate: null,
    ptpenddate: null
  };

  constructor(private accplanService: AccplanService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }

  ngOnInit() {
    this.getNotes();
  }

  onSubmit(form) {
    // console.log(form);
    const body = {
      planid: cust,
      accnumber: acc,
      custnumber: cust,
      planfreq: form.value.planfreq,
      ptpamount: form.value.ptpamount,
      no_of_frequency: form.value.no_of_frequency,
      ptpstartdate: form.value.ptpstartdate + 1,
      ptpenddate: form.value.ptpenddate + 1,
      owner: username
    };

    this.accplanService.submitPtp(body).subscribe(data => {
      this.result = data;
      if (this.result.result === 'OK') {
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
    this.accplanService.getPtps(cust).subscribe(data => {
      // console.log(data);
      this.ptphis = data;
    }, error => {
      console.log(error);
    });
  }

}
