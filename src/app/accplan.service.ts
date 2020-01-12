import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AccplanService {

  constructor(private httpClient: HttpClient) { }

  loader() {
    // swal({
    //   title: 'Processing...',
    //   text: 'Please wait',
    //   closeOnClickOutside: false
    // });

    swal.fire({
      title: 'Processing ...',
      text: 'Please wait',
      showConfirmButton: false,
      onOpen: function () {
        swal.showLoading();
      }
    });
  }

  downloadFile(file: string) {
    const body = {filename: file};

    return this.httpClient.post(environment.uploadurl + '/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  submitBackground(body) {
    return this.httpClient.post(environment.uploadurl + '/api/background', body);
  }

  submitProblemdefinition(body) {
    return this.httpClient.post(environment.uploadurl + '/api/problemdefinition', body);
  }

  submitCustomerproposal(body) {
    return this.httpClient.post(environment.uploadurl + '/api/customerproposal', body);
  }

  submitAbilitytopay(body) {
    return this.httpClient.post(environment.uploadurl + '/api/abilitytopay', body);
  }

  submitRemedialoffering(body) {
    return this.httpClient.post(environment.uploadurl + '/api/remedialofferings', body);
  }

  submitSwot(body) {
    return this.httpClient.post(environment.uploadurl + '/api/swot', body);
  }

  submitPtp(body) {
    return this.httpClient.post(environment.uploadurl + '/api/paymentplans', body);
  }

  getBackground(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/accplans/background/' + custnumber);
  }

  getProblemdefinition(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/accplans/problemdefinition/' + custnumber);
  }

  getCustomerproposal(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/accplans/customerproposals/' + custnumber);
  }

  getabilitytopay(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/accplans/abilitytopay/' + custnumber);
  }

  getSwot(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/accplans/swot/' + custnumber);
  }

  getPtps(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/accplans/paymentplans/' + custnumber);
  }

  getRemedialofferings(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/accplans/remedialofferings/' + custnumber);
  }

  saveuploadtodb(fileuploaded) {
    return this.httpClient.post(environment.uploadurl + '/api/uploadssavetodb', fileuploaded);
  }

  getCardwithid (nationid) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/status/cardswithnationid/' + nationid);
  }

  getMcoopwithid (nationid) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/status/mcoopwithnationid/' + nationid);
  }

  getFacilities (custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/v2/views/' + custnumber);
  }

  getCustomer (accnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/v2/accountinfo/' + accnumber);
  }

  // actions
  submitInitiation(body) {
    console.log('data to save', body);
    return this.httpClient.post(environment.uploadurl + '/api/initiation', body);
  }
}
