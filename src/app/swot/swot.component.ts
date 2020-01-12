import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AccplanService } from '../accplan.service';

const cust = localStorage.getItem('custnumber');
const acc = localStorage.getItem('accnumber');
const username = localStorage.getItem('username');

@Component({
  selector: 'app-swot',
  templateUrl: './swot.component.html',
  styleUrls: ['./swot.component.scss']
})
export class SwotComponent implements OnInit {

  constructor(private accplanService: AccplanService) {

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
      planid: cust,
      accnumber: acc,
      custnumber: cust,
      strengths: form.value.strengths,
      weaknesses: form.value.weaknesses,
      opportunities: form.value.opportunities,
      threats: form.value.threats,
      owner: username
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
    this.accplanService.getSwot(cust).subscribe(data => {
      this.swothis = data;
      if (this.swothis.length > 0) {
        this.swothislength = this.swothis.length;
        this.model.strengths = data[0].STRENGTHS;
        this.model.weaknesses = data[0].WEAKNESSES;
        this.model.opportunities = data[0].OPPORTUNITIES;
        this.model.threats = data[0].THREATS;
        this.model.currentstrengths = data[0].STRENGTHS;
      }
    }, error => {
      console.log(error);
    });
  }

  onChange(deviceValue) {
    this.mydisable = true;
  }

}
