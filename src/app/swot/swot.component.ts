import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AccplanService } from '../accplan.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-swot',
  templateUrl: './swot.component.html',
  styleUrls: ['./swot.component.scss']
})
export class SwotComponent implements OnInit {

  cust: string;
  acc: string;
  username: any;

  constructor(private accplanService: AccplanService, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(
      (queryparams: Params) => {
        this.username = queryparams.username;
        this.cust = queryparams.custnumber;
        this.acc = queryparams.accnumber;
      });

  }

  swothis: any;
  swothislength: number;
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
      strengths: form.value.strengths,
      weaknesses: form.value.weaknesses,
      opportunities: form.value.opportunities,
      threats: form.value.threats,
      owner: this.username
    };

    this.accplanService.submitSwot(body).subscribe(data => {
      // console.log(data);
      swal.fire('Successful!', 'saved successfully!', 'success');
      this.getNotes();
      // this.mydisable = true;
    }, error => {
      console.log(error);
      swal.fire('Error!', 'Error occurred during processing!', 'error');
    });
  }

  getNotes() {
    this.accplanService.getSwot(this.cust).subscribe(data => {
      this.swothis = data;
      if (this.swothis.length > 0) {
        this.swothislength = this.swothis.length;
        this.model.strengths = data[0].strengths;
        this.model.weaknesses = data[0].weaknesses;
        this.model.opportunities = data[0].opportunities;
        this.model.threats = data[0].threats;
        this.model.currentstrengths = data[0].strengths;
      }
    }, error => {
      console.log(error);
    });
  }

  onChange(deviceValue) {
    this.mydisable = true;
  }

}
