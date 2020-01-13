import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AccplanService } from '../accplan.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-abilitytopay',
  templateUrl: './abilitytopay.component.html',
  styleUrls: ['./abilitytopay.component.scss']
})
export class AbilitytopayComponent implements OnInit {

  cust: string;
  acc: string;
  username: any;

  constructor(
    private accplanService: AccplanService,
    private route: ActivatedRoute, ) {
    this.route.queryParams.subscribe(
      (queryparams: Params) => {
        this.username = queryparams.username;
        this.cust = queryparams.custnumber;
        this.acc = queryparams.accnumber;
      });
  }

  abilitytopayhis: any;
  abilitytopayhislength: number;
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
      abilitytopay: form.abilitytopay,
      owner: this.username,
      dateupdated: new Date()
    };

    this.accplanService.submitAbilitytopay(body).subscribe(data => {
      console.log(data);
      swal.fire('Successful!', 'saved successfully!', 'success');
      this.getNotes();
      this.mydisable = true;
    }, error => {
      console.log(error);
      swal.fire('Error!', 'Error occurred during processing!', 'error');
    });
  }

  getNotes() {
    this.accplanService.getabilitytopay(this.cust).subscribe(data => {
      this.abilitytopayhis = data;
      if (this.abilitytopayhis.length > 0) {
        this.abilitytopayhislength = this.abilitytopayhis.length;
        this.model.abilitytopay = data[0].abilitytopay;
        this.model.currentabilitytopay = data[0].abilitytopay;
      }
    }, error => {
      console.log(error);
    });
  }

  onChange(deviceValue) {
    this.mydisable = this.model.currentabilitytopay === deviceValue;
  }

}

