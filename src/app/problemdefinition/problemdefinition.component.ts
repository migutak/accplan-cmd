import { Component, OnInit } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload';
import swal from 'sweetalert2';
import { saveAs} from 'file-saver';
import { AccplanService } from '../accplan.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
const URL = environment.uploadurl + '/filesapi';

@Component({
  selector: 'app-problemdefinition',
  templateUrl: './problemdefinition.component.html',
  styleUrls: ['./problemdefinition.component.scss']
})
export class ProblemdefinitionComponent implements OnInit {

cust: string;
acc:string;
username: any;

  constructor(private httpClient: HttpClient,
    private accplanService: AccplanService,
    private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(
      (queryparams: Params) => {
        this.username = queryparams.username;
        this.cust = queryparams.custnumber;
        this.acc = queryparams.accnumber;
      });
  }

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

  problemdefinitionFiles: any;
  problemdefinitionhis: any;
  problemdefinitionFileslength: number;
  problemdefinitionhislength: number;
  model: any = {};

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  ngOnInit() {
    this.getNotes();
    this.getUploads();
  }

  upload() {
    this.accplanService.loader();

    this.uploader.uploadAll();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      console.log('error....', item, response, status);
      swal.fire('Error!', 'File upload service currently not available', 'error');
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (response) {
        const filereceived = JSON.parse(response);
        this.fileuploaded.filename = filereceived.files[0].originalname;
        this.fileuploaded.destpath = filereceived.files[0].path;
        this.fileuploaded.filesize = filereceived.files[0].size;
        this.fileuploaded.custnumber = this.cust;
        this.fileuploaded.accnumber = this.acc;
        this.fileuploaded.colofficer = this.username;
        this.fileuploaded.doctype = 'accplan_problemdefinition_file';
        //
        this.accplanService.saveuploadtodb(this.fileuploaded).subscribe(data => {
          // console.log(data);
          swal.fire('Upload successful!', this.fileuploaded.filename + ' received!', 'success');
          this.getUploads();
        }, error => {
          console.log(error);
          swal.fire('Error!', this.fileuploaded.filename + ' NOT received!', 'error');
        });
      }
    };
  }

  getUploads() {
    this.httpClient.get(environment.ecol_apis_host + '/api/uploads?filter[where][custnumber]=' + this.cust + '&filter[where][doctype]=accplan_problemdefinition_file').subscribe(data => {
      this.problemdefinitionFiles = data;
      this.problemdefinitionFileslength = this.problemdefinitionFiles.length;
      // console.log(data);
    }, error => {
      console.log(error);
    });
  }

  getNotes() {
    this.accplanService.getProblemdefinition(this.cust).subscribe(data => {
      if(data && data.length>0){
      this.problemdefinitionhis = data;
      this.problemdefinitionhislength = this.problemdefinitionhis.length;
      this.model.problemdefinitioncomment=data[0].problemdefinition;
      }
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
      planid: this.cust,
      accnumber: this.acc,
      custnumber: this.cust,
      problemdefinition: form.value.problemdefinitioncomment,
      owner: this.username,
      dateupdated: moment().format('DD-MMM-YYYY').toUpperCase()
    };

    this.accplanService.submitProblemdefinition(body).subscribe(data => {
      swal.fire('Successful!', 'saved successfully!', 'success');
      this.getNotes();
    }, error => {
      console.log(error);
      swal.fire('Error!', 'Error occurred during processing!', 'error');
    });
  }

}
