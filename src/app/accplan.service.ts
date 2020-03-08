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

    return this.httpClient.post(environment.uploadurl + '/filesapi/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  submitBackground(body) {
    return this.httpClient.post(environment.ecol_apis_host + '/api/plan_background', body);
  }

  submitProblemdefinition(body) {
    return this.httpClient.post(environment.ecol_apis_host + '/api/plan_problemdefinition', body);
  }

  submitCustomerproposal(body) {
    return this.httpClient.post(environment.ecol_apis_host + '/api/plan_customerproposals', body);
  }

  submitAbilitytopay(body) {
    return this.httpClient.post(environment.ecol_apis_host + '/api/plan_ability', body);
  }

  submitRemedialoffering(body) {
    return this.httpClient.post(environment.ecol_apis_host + '/api/plan_remedialofferings', body);
  }

  submitSwot(body) {
    return this.httpClient.post(environment.ecol_apis_host + '/api/plan_swot/add', body);
  }

  submitPtp(body) {
    return this.httpClient.post(environment.ecol_apis_host + '/api/plan_ptpplans', body);
  }

  getBackground(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/plan_background?filter[where][custnumber]=' + custnumber + '&filter[order]=dateupdated DESC');
  }

  getProblemdefinition(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/plan_problemdefinition?filter[where][custnumber]=' + custnumber + '&filter[order]=dateupdated DESC');
  }

  getCustomerproposal(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/plan_customerproposals?filter[where][custnumber]=' + custnumber + '&filter[order]=dateupdated DESC');
  }

  getabilitytopay(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/plan_ability?filter[where][custnumber]=' + custnumber + '&filter[order]=dateupdated DESC');
  }

  getSwot(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/plan_swot?filter[where][custnumber]=' + custnumber + '&filter[order]=dateupdated DESC');
  }

  getPtps(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/plan_ptpplans?filter[where][custnumber]=' + custnumber + '&filter[order]=dateupdated DESC');
  }

  getRemedialofferings(custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/plan_remedialofferings?filter[where][custnumber]=' + custnumber + '&filter[order]=dateupdated DESC');
  }

  saveuploadtodb(fileuploaded) {
    return this.httpClient.post(environment.ecol_apis_host + '/api/uploads', fileuploaded);
  }

  getCardwithid (nationid) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/cards_stage?filter[where][nationid]=' + nationid);
  }

  getMcoopwithid (nationid) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/MCOOPCASH_STAGE?filter[where][idnumber]=' + nationid);
  }

  getFacilities (custnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/watch_stage?filter[where][custnumber]=' + custnumber);
  }

  getCustomer (accnumber) {
    return this.httpClient.get(environment.ecol_apis_host + '/api/v2/accountinfo/' + accnumber);
  }

  // actions
  submitInitiation(body) {
    console.log('data to save', body);
    return this.httpClient.post(environment.ecol_apis_host + '/api/plan_actions', body);
  }
}
