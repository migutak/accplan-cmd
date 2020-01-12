import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AccplanService } from '../accplan.service';

const cust = localStorage.getItem('custnumber');
const acc = localStorage.getItem('accnumber');
const username = localStorage.getItem('username');

@Component({
  selector: 'app-abilitytopay',
  templateUrl: './abilitytopay.component.html',
  styleUrls: ['./abilitytopay.component.scss']
})
export class AbilitytopayComponent implements OnInit {

  constructor(public accplanService: AccplanService) {
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
      planid: cust,
      accnumber: acc,
      custnumber: cust,
      abilitytopay: form.abilitytopay,
      owner: username
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
    this.accplanService.getabilitytopay(cust).subscribe(data => {
      this.abilitytopayhis = data;
      if (this.abilitytopayhis.length > 0) {
        this.abilitytopayhislength = this.abilitytopayhis.length;
        this.model.abilitytopay = data[0].ABILITYTOPAY;
        this.model.currentabilitytopay = data[0].ABILITYTOPAY;
      }
    }, error => {
      console.log(error);
    });
  }

  onChange(deviceValue) {
    this.mydisable = this.model.currentabilitytopay === deviceValue;
  }

}

