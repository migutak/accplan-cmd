import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { AccplanService } from '../accplan.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';

const URL = environment.uploadurl + '/filesapi';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  initiation: Boolean = false;
  internalapproval: Boolean = true;
  custaccept: Boolean = true;
  cure: Boolean = true;
  actionfileslength: number;
  actionfiles: any = [];
  docdesccomment: string = null;

  dataproposal: any = [];

  model = {
    initiationdateProposal: null,
    reviewProposal: null,
    remarkproposalremark: null,
    inititationcompleted: null,
    initiationdateapprovalsort: null,
    reviewedinternalApprovalSort: null,
    remarkapprovalsought: null,
    actioncompletedapprovalsought: null,
    initiationdatecustomeraccepted: null,
    reviewedinternalcustomeraccepted: null,
    remarkcustomeraccepted: null,
    action_completed_customeraccepted: null,
    initiationdatecure: null,
    reviewedcure: null,
    remarkcure: null,
    action_completed_cure: null
  };

  cust: string;
acc:string;
username: any;

  constructor(private accplanService: AccplanService,
    private httpClient: HttpClient,
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

  fileuploaded = {
    custnumber: null,
    accnumber: null,
    filename: null,
    destpath: null,
    filesize: null,
    doctype: null,
    docdesc: null,
    colofficer: null,
    filetype: null
  };

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  ngOnInit() {
    this.getUploads();
    this.getproposal();
    this.fetchinternalapprovals();
    this.fetchcustaccept();
    this.fetchcure();
  }

  getproposal() {
    this.httpClient.get(environment.ecol_apis_host + '/api/plan_actions?filter[where][actionagreed]=proposal-received&filter[where][custnumber]=' + this.cust).subscribe(data => {
      this.dataproposal = data;
      if (this.dataproposal.length > 0) {
        this.model.initiationdateProposal = this.dataproposal[0].initiationdate;
        this.model.reviewProposal = this.dataproposal[0].nextreview;
        this.model.remarkproposalremark = this.dataproposal[0].rcomment;
        this.model.inititationcompleted = this.dataproposal[0].completed;

        if (this.model.inititationcompleted === 'Internal-approval-sort') {
          this.internalapproval = false;
          this.initiation = true;
        } else {
          this.internalapproval = true;
          this.initiation = false;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  fetchinternalapprovals() {
    this.httpClient.get(environment.ecol_apis_host + '/api/plan_actions?filter[where][actionagreed]=internal-approval&filter[where][custnumber]=' + this.cust).subscribe(data => {
      this.dataproposal = data;
      if (this.dataproposal.length > 0) {
        this.model.initiationdateapprovalsort = this.dataproposal[0].initiationdate;
        this.model.reviewedinternalApprovalSort = this.dataproposal[0].nextreview;
        this.model.remarkapprovalsought = this.dataproposal[0].rcomment;
        this.model.actioncompletedapprovalsought = this.dataproposal[0].completed;

        //
        if (this.model.actioncompletedapprovalsought === 'Approved') {
          this.initiation = true;
          this.custaccept = false;
          this.internalapproval = true;
        } else if (this.model.actioncompletedapprovalsought === 'Declined') {
          this.initiation = false;
          this.custaccept = true;
          this.internalapproval = true;
        } else {
          this.initiation = true;
          this.custaccept = true;
          this.internalapproval = false;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  fetchcustaccept() {
    this.httpClient.get(environment.ecol_apis_host + '/api/plan_actions?filter[where][actionagreed]=cust-accept&filter[where][custnumber]=' + this.cust).subscribe(data => {
      this.dataproposal = data;
      if (this.dataproposal.length > 0) {
        this.model.initiationdatecustomeraccepted = this.dataproposal[0].initiationdate;
        this.model.reviewedinternalcustomeraccepted = this.dataproposal[0].nextreview;
        this.model.remarkcustomeraccepted = this.dataproposal[0].rcomment;
        this.model.action_completed_customeraccepted = this.dataproposal[0].completed;

        //
        if (this.model.action_completed_customeraccepted === 'Accepted') {
          this.initiation = true;
          this.custaccept = true;
          this.internalapproval = true;
          this.cure = false;
        } else if (this.model.action_completed_customeraccepted === 'Declined') {
          this.initiation = true;
          this.internalapproval = false;
          this.custaccept = true;
          this.cure = true;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  fetchcure() {
    this.httpClient.get(environment.ecol_apis_host + '/api/plan_actions?filter[where][actionagreed]=cure-implemented&filter[where][custnumber]=' + this.cust).subscribe(data => {
      this.dataproposal = data;
      if (this.dataproposal.length > 0) {
        this.model.initiationdatecure = this.dataproposal[0].INITIATIONDATE;
        this.model.reviewedcure = this.dataproposal[0].NEXTREVIEW;
        this.model.remarkcure = this.dataproposal[0].RCOMMENT;
        this.model.action_completed_cure = this.dataproposal[0].COMPLETED;

        //

      }
    }, error => {
      console.log(error);
    });
  }

  upload(desc) {
    this.accplanService.loader();

    this.uploader.uploadAll();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      console.log('error....', item, response, status);
      swal.fire('Error!', 'file upload service currently not available', 'error').then();
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
        this.fileuploaded.docdesc = desc;
        this.fileuploaded.doctype = 'accplan_action_file';
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
    this.httpClient.get(environment.ecol_apis_host + '/api/uploads?filter[where][custnumber]=' + this.cust + '&filter[where][doctype]=accplan_action_file').subscribe(data => {
      this.actionfiles = data;
      this.actionfileslength = this.actionfiles.length;
      // console.log(data);
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

  onSubmitInternalapproval(form) {
    // console.log(form.value);
    const body = {
      actionagreed: 'internal-approval',
      accnumber: this.acc,
      custnumber: this.cust,
      initiationdate: form.value.initiationdateapprovalsort,
      nextreview: form.value.reviewedinternalApprovalSort,
      rcomment: form.value.remarkapprovalsought,
      dateupdated: form.value.initiationdateapprovalsort,
      completed: form.value.actioncompletedapprovalsought,
      owner: this.username
    };
    // loading
    this.accplanService.loader();
    this.accplanService.submitInitiation(body).subscribe(data => {
      swal.close();
      swal.fire('Successful!', 'saved successfully!', 'success');

      //
      if (body.completed === 'Approved') {
        this.initiation = true;
        this.custaccept = false;
        this.internalapproval = true;
      } else if (body.completed === 'Declined') {
        this.initiation = false;
        this.custaccept = true;
        this.internalapproval = true;
      } else {
        this.initiation = true;
        this.custaccept = true;
        this.internalapproval = false;
      }
    }, error => {
      console.log(error);
      swal.fire('Error!', 'Error occurred during processing!', 'error');
    });
  }

  onSubmitCustaccept(form) {
    //  console.log(form.value);
    const body = {
      actionagreed: 'cust-accept',
      accnumber: this.acc,
      custnumber: this.cust,
      initiationdate: form.value.initiationdatecustomeraccepted,
      nextreview: form.value.reviewedinternalcustomeraccepted,
      rcomment: form.value.remarkcustomeraccepted,
      dateupdated: form.value.initiationdatecustomeraccepted,
      completed: form.value.action_completed_customeraccepted,
      owner: this.username
    };
    // loading
    this.accplanService.loader();
    this.accplanService.submitInitiation(body).subscribe(data => {
      swal.close();
      swal.fire('Successful!', 'saved successfully!', 'success');

      //
      if (body.completed === 'Accepted') {
        this.initiation = true;
        this.custaccept = true;
        this.internalapproval = true;
        this.cure = false;
      } else if (body.completed === 'Declined') {
        this.initiation = true;
        this.internalapproval = false;
        this.custaccept = true;
        this.cure = true;
      }
    }, error => {
      console.log(error);
      swal.fire('Error!', 'Error occurred during processing!', 'error');
    });
  }

  onSubmitCure(form) {
    const body = {
      actionagreed: 'cure-implemented',
      accnumber: this.acc,
      custnumber: this.cust,
      initiationdate: form.value.initiationdatecure,
      nextreview: form.value.reviewedcure,
      rcomment: form.value.remarkcure,
      dateupdated: form.value.initiationdatecure,
      completed: form.value.action_completed_cure,
      owner: this.username
    };
    // loading
    this.accplanService.loader();
    this.accplanService.submitInitiation(body).subscribe(data => {
      swal.close();
      swal.fire('Successful!', 'saved successfully!', 'success');
    }, error => {
      console.log(error);
      swal.fire('Error!', 'Error occurred during processing!', 'error');
    });
  }

  onSubmitInitiation(form) {
    const body = {
      actionagreed: 'proposal-received',
      accnumber: this.acc,
      custnumber: this.cust,
      initiationdate: form.value.initiationdateProposal,
      nextreview: form.value.reviewProposal,
      rcomment: form.value.remarkproposalremark,
      dateupdated: form.value.initiationdateProposal,
      completed: form.value.inititationcompleted,
      owner: this.username
    };
    // loading
    this.accplanService.loader();
    this.accplanService.submitInitiation(body).subscribe(data => {
      swal.close();
      swal.fire('Successful!', 'saved successfully!', 'success');

      //
      if (body.completed === 'Internal-approval-sort') {
        this.internalapproval = false;
        this.initiation = true;
      } else {
        this.internalapproval = true;
        this.initiation = false;
      }
    }, error => {
      console.log(error);
      swal.fire('Error!', 'Error occurred during processing!', 'error');
    });

  }

}
