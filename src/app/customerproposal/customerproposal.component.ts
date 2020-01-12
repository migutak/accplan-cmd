import { Component, OnInit } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload';
import swal from 'sweetalert2';
import { saveAs} from 'file-saver';
import { AccplanService } from '../accplan.service';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const URL = environment.uploadurl + '/api/upload';
const cust = localStorage.getItem('custnumber');
const acc = localStorage.getItem('accnumber');
const username = localStorage.getItem('username');

@Component({
  selector: 'app-customerproposal',
  templateUrl: './customerproposal.component.html',
  styleUrls: ['./customerproposal.component.scss']
})
export class CustomerproposalComponent implements OnInit {

  constructor(private httpClient: HttpClient, private accplanService: AccplanService) { }

  fileuploaded = {
    custnumber: null,
    accnumber: null,
    filename : null,
    destpath: null,
    filesize: null,
    doctype: null,
    docdesc: null,
    colofficer: null,
    filetype: null
  };

  customerproposalFiles: any;
  customerproposalhis: any;
  customerproposalFileslength: number;
  customerproposalhislength: number;
  model: any = {};
  button: Boolean = false;

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  ngOnInit() {
    this.getNotes();
    this.getUploads();
  }

  upload() {
    //
    this.accplanService.loader();

    this.uploader.uploadAll();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      console.log('error....', item, response, status);
      swal.fire('Error!', 'file upload service currently not available', 'error');
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (response) {
        const filereceived = JSON.parse(response);
        this.fileuploaded.filename = filereceived.file.originalname;
        this.fileuploaded.destpath = environment.fileLocation + filereceived.file.path;
        this.fileuploaded.filesize = filereceived.file.size;
        this.fileuploaded.custnumber = cust;
        this.fileuploaded.accnumber = acc;
        this.fileuploaded.colofficer = username;
        this.fileuploaded.doctype = 'accplan_customerproposal_file';
        //
        this.accplanService.saveuploadtodb(this.fileuploaded).subscribe(data => {
          // console.log(data);
          swal.fire('Upload successful!', this.fileuploaded.filename + ' received!', 'success');
          this.getUploads();
        }, error => {
          console.log(error);
          swal.fire('Error!', this.fileuploaded.filename + ' not received!', 'error');
        });
      }
    };
  }

  getUploads() {
    this.httpClient.get(environment.ecol_apis_host + '/api/status/files/' + cust + '/accplan_customerproposal_file').subscribe(data => {
      this.customerproposalFiles = data;
      if (data) {
        this.customerproposalFileslength = this.customerproposalFiles.length;
      }
      // console.log(data);
    }, error => {
      console.log(error);
    });
  }

  getNotes() {
    this.accplanService.getCustomerproposal(cust).subscribe(data => {
      this.customerproposalhis = data;
      this.customerproposalhislength = this.customerproposalhis.length;
    }, error => {
      console.log(error);
    });
  }

  downloadFile(filename, filepath) {
    this.accplanService.downloadFile(filepath).subscribe(data => {
      saveAs(data, filename);
    }, error => {
      console.log(error.error);
      swal.fire('Error!', ' Cannot download  file!', 'error');
    });
  }

  onSubmit(form) {
    this.accplanService.loader();
    const body = {
      planid: cust,
      accnumber: acc,
      custnumber: cust,
      customerproposal: form.value.customerproposalcomment,
      owner: username
    };

    this.accplanService.submitCustomerproposal(body).subscribe(data => {
      console.log(data);
      swal.fire('Successful!', 'saved successfully!', 'success');
      this.model.customerproposalcomment = '';
      this.getNotes();
    }, error => {
      console.log(error);
      swal.fire('Error!', 'Error occurred during processing!', 'error');
    });
  }

}
