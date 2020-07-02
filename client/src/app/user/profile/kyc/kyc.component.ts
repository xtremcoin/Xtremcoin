import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { ApiService } from "../../../services/api.service";
import { AccountService } from "../../../services/account.service";
import { KycService } from "../../../services/kyc.service";
import { NotificationsService } from "angular2-notifications";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {
  personalKYCPanel: boolean;
  companyKYCPanel: boolean;
  bankKYCPanel: boolean;
  kycDonePanel: boolean;
  tempCheck: string;
  profileObj: Object;
  idtypes: String[] = [
    'Passport',
    'Driving License',
    'National ID'
  ]
  banks: Object
  bankJson: Object
  addressTypes: String[] = [
    'Electricity Bill',
    'Telephone Bill',
    'Water Bill'
  ]
  credentialsForPersonal = {
    idProof: '',
    idNumber: '',
    addressProof: '',
    _csrf: ''
  }
  credentialsForMerchant = {
    city: '',
    province: '',
    address: '',
    postalcode: '',
    country: '',
    ceoname: '',
    ceolastname: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    idProof: '',
    idNumber: '',
    addressProof: '',
    companyname: '',
    registration_number: '',
    _csrf: ''
  }
  credentialsForBank = {
    bank: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    ceoname: "",
    ceolastname: "",
    address: "",
    postalcode: "",
    province: "",
    _csrf: ""
  }
  IPcountryCode: 'TR'
  filesForPersonal = {
    fileDocumentid: File = null,
    fileDocumentaddress: File = null,
  }
  filesForMerchant = {
    fileDocumentId: File = null,
    fileDocumentAddress: File = null,
    fileDocumentBank: File = null,
    fileDocumentRegistration: File = null,
    fileDocumentTax: File = null,
    fileDocumentAppointment: File = null,
  }
  filesForbankInst = {
    fileBankID: File = null
  }
  fileerror = [];
  error = [];
  constructor(
    private fadeLoader: Ng4LoadingSpinnerService,
    private router: Router,
    private authApi: ApiService,
    private notif: NotificationsService,
    private accountService: AccountService,
    private userService: UserService,
    private kycService: KycService
  ) { }

  ngOnInit() {
    this.csrf();
    this.getkyc();
  }
  csrf() {
    this.userService.gtcsrf().subscribe((success) => {
      this.credentialsForPersonal._csrf = success._csrf;
      this.credentialsForMerchant._csrf = success._csrf;
      this.credentialsForBank._csrf = success._csrf;
    }, (error) => {
    })
  }
  getkyc() {
    this.accountService.isKyc().subscribe((user) => {
      if (user.kyc == 'Pending') {
        this.kycDonePanel = true;
        this.personalKYCPanel = false;
        this.companyKYCPanel = false;
        this.bankKYCPanel = false;
      }
      else {
        this.getprofile();
      }
    }, (error) => {

    })
  }
  getNumber(events) {
    this.credentialsForMerchant.phone = events;
  }
  getprofile() {
    this.accountService.getprofile().subscribe((result) => {
      this.tempCheck = result.Profile.profile.profileType;
      this.banks = result.Profile.banks;
      this.bankJson = result.Profile.bankJson;
      if (this.tempCheck == 'Private person') {
        this.personalKYCPanel = true;
      } else if (this.tempCheck == 'Company person') {
        this.companyKYCPanel = true;
      } else if (this.tempCheck == 'Bank person') {
        this.bankKYCPanel = true;
      }
    }, (error) => {
      this.notif.error('Error', 'Something wrong, please try again');
      this.authApi.logout();
    })
  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'png') {
      return true;
    }
    else {
      return false;
    }
  }
  selectFileid(events) {
    if (events.target.files !== null && typeof events.target.files !== undefined && events.target.files.length > 0) {
      var file = events.target.files;
      if (!this.validateFile(file[0].name) || (file[0].size > 3145728)) {
        this.error['fileDocumentid'] = "";
        this.fileerror['fileDocumentid'] = "Invalid File " + file[0].name;
        events.target.value = null;

      } else {
        this.fileerror['fileDocumentid'] = "";
        this.error['fileDocumentid'] = "";
        this.filesForPersonal.fileDocumentid = file.item(0);
      }
    }
    else {
      this.error['fileDocumentid'] = "File Required";
    }
  }
  selectFileadd(events) {
    if (events.target.files !== null && typeof events.target.files !== undefined && events.target.files.length > 0) {
      var file = events.target.files;
      if (!this.validateFile(file[0].name) || (file[0].size > 3145728)) {
        this.error['fileDocumentaddress'] = "";
        this.fileerror['fileDocumentaddress'] = "Invalid File " + file[0].name;
        events.target.value = '';
        return false;
      } else {
        this.error['fileDocumentaddress'] = "";
        this.fileerror['fileDocumentaddress'] = "";
        this.filesForPersonal.fileDocumentaddress = file.item(0);
      }
    }
    else {
      this.error['fileDocumentaddress'] = "File Required";
    }
  }
  selectFileReg(events) {
    if (events.target.files !== null && typeof events.target.files !== undefined && events.target.files.length > 0) {
      var file = events.target.files;
      if (!this.validateFile(file[0].name) || (file[0].size > 3145728)) {
        this.error['fileDocumentRegistration'] = "";
        this.fileerror['fileDocumentRegistration'] = "Invalid File " + file[0].name;
        events.target.value = '';
        return false;
      } else {
        this.error['fileDocumentRegistration'] = "";
        this.fileerror['fileDocumentRegistration'] = "";
        this.filesForMerchant.fileDocumentRegistration = file.item(0);
      }
    }
    else {
      this.error['fileDocumentRegistration'] = "File Required";
    }
  }
  selectFileBank(events) {
    if (events.target.files !== null && typeof events.target.files !== undefined && events.target.files.length > 0) {
      var file = events.target.files;
      if (!this.validateFile(file[0].name) || (file[0].size > 3145728)) {
        this.error['fileDocumentBank'] = "";
        this.fileerror['fileDocumentBank'] = "Invalid File " + file[0].name;
        events.target.value = '';
        return false;
      } else {
        this.error['fileDocumentBank'] = "";
        this.fileerror['fileDocumentBank'] = "";
        this.filesForMerchant.fileDocumentBank = file.item(0);
      }
    }
    else {
      this.error['fileDocumentBank'] = "File Required";
    }
  }
  selectFileMang(events) {
    if (events.target.files !== null && typeof events.target.files !== undefined && events.target.files.length > 0) {
      var file = events.target.files;
      if (!this.validateFile(file[0].name) || (file[0].size > 3145728)) {
        this.error['fileDocumentAppointment'] = "";
        this.fileerror['fileDocumentAppointment'] = "Invalid File " + file[0].name;
        events.target.value = '';
        return false;
      } else {
        this.error['fileDocumentAppointment'] = "";
        this.fileerror['fileDocumentAppointment'] = "";
        this.filesForMerchant.fileDocumentAppointment = file.item(0);
      }
    }
    else {
      this.error['fileDocumentAppointment'] = "File Required";
    }
  }
  selectFileTax(events) {
    if (events.target.files !== null && typeof events.target.files !== undefined && events.target.files.length > 0) {
      var file = events.target.files;
      if (!this.validateFile(file[0].name) || (file[0].size > 3145728)) {
        this.error['fileDocumentTax'] = "";
        this.fileerror['fileDocumentTax'] = "Invalid File " + file[0].name;
        events.target.value = '';
        return false;
      } else {
        this.error['fileDocumentTax'] = "";
        this.fileerror['fileDocumentTax'] = "";
        this.filesForMerchant.fileDocumentTax = file.item(0);
      }
    }
    else {
      this.error['fileDocumentTax'] = "File Required";
    }
  }
  selectFileID(events) {
    if (events.target.files !== null && typeof events.target.files !== undefined && events.target.files.length > 0) {
      var file = events.target.files;
      if (!this.validateFile(file[0].name) || (file[0].size > 3145728)) {
        this.error['fileDocumentId'] = "";
        this.fileerror['fileDocumentId'] = "Invalid File " + file[0].name;
        events.target.value = '';
        return false;
      } else {
        this.error['fileDocumentId'] = "";
        this.fileerror['fileDocumentId'] = "";
        this.filesForMerchant.fileDocumentId = file.item(0);
      }
    }
    else {
      this.error['fileDocumentId'] = "File Required";
    }
  }
  selectFilebankid(events){
    if (events.target.files !== null && typeof events.target.files !== undefined && events.target.files.length > 0) {
      var file = events.target.files;
      if (!this.validateFile(file[0].name) || (file[0].size > 3145728)) {
        this.error['fileBankID'] = "";
        this.fileerror['fileBankID'] = "Invalid File " + file[0].name;
        events.target.value = '';
        return false;
      } else {
        this.error['fileBankID'] = "";
        this.fileerror['fileBankID'] = "";
        this.filesForbankInst.fileBankID = file.item(0);
      }
    }
    else {
      this.error['fileDocumentAddress'] = "File Required";
    }
  }
  selectFileAdd(events) {
    if (events.target.files !== null && typeof events.target.files !== undefined && events.target.files.length > 0) {
      var file = events.target.files;
      if (!this.validateFile(file[0].name) || (file[0].size > 3145728)) {
        this.error['fileDocumentAddress'] = "";
        this.fileerror['fileDocumentAddress'] = "Invalid File " + file[0].name;
        events.target.value = '';
        return false;
      } else {
        this.error['fileDocumentAddress'] = "";
        this.fileerror['fileDocumentAddress'] = "";
        this.filesForMerchant.fileDocumentAddress = file.item(0);
      }
    }
    else {
      this.error['fileDocumentAddress'] = "File Required";
    }
  }
  privateKycfn() {
    if (this.filesForPersonal.fileDocumentid === null || this.filesForPersonal.fileDocumentaddress === null) {
      if (this.filesForPersonal.fileDocumentid === null) {
        this.error['fileDocumentid'] = "File Required";
        this.fileerror['fileDocumentid'] = "";
      }
      if (this.filesForPersonal.fileDocumentaddress === null) {
        this.error['fileDocumentaddress'] = "File Required";
        this.fileerror['fileDocumentaddress'] = "";
      }
      return false;
    } else {
      if (this.fileerror['fileDocumentaddress'] === '' && this.fileerror['fileDocumentid'] === '' &&
        this.error['fileDocumentaddress'] === '' && this.error['fileDocumentid'] === '') {
        this.kycService.kycPrivate(this.filesForPersonal, this.credentialsForPersonal).subscribe((response) => {
          this.getkyc();
          this.notif.success(
            'Success',
            JSON.stringify(response.message)
          )
        }, (err) => {
          this.notif.error(
            'KYC Error', err.error.message)
        });
      }
    }
  }
  CompnayKycfn() {
    if (this.filesForMerchant.fileDocumentId === null || this.filesForMerchant.fileDocumentAddress === null ||
      this.filesForMerchant.fileDocumentAppointment === null || this.filesForMerchant.fileDocumentBank === null ||
      this.filesForMerchant.fileDocumentRegistration === null) {
      if (this.filesForMerchant.fileDocumentId === null) {
        this.error['fileDocumentAddress'] = "File Required";
        this.fileerror['fileDocumentId'] = "";
      }
      if (this.filesForMerchant.fileDocumentAddress === null) {
        this.error['fileDocumentAddress'] = "File Required";
        this.fileerror['fileDocumentAddress'] = "";
      }
      if (this.filesForMerchant.fileDocumentAppointment === null) {
        this.error['fileDocumentAppointment'] = "File Required";
        this.fileerror['fileDocumentAppointment'] = "";
      }
      if (this.filesForMerchant.fileDocumentBank === null) {
        this.error['fileDocumentBank'] = "File Required";
        this.fileerror['fileDocumentBank'] = "";
      }
      if (this.filesForMerchant.fileDocumentRegistration === null) {
        this.error['fileDocumentRegistration'] = "File Required";
        this.fileerror['fileDocumentRegistration'] = "";
      }
      if (this.filesForMerchant.fileDocumentTax === null) {
        this.error['fileDocumentTax'] = "File Required";
        this.fileerror['fileDocumentTax'] = "";
      }
      return false;
    } else {
      if (this.fileerror['fileDocumentAddress'] === '' && this.fileerror['fileDocumentId'] === '' &&
        this.error['fileDocumentAddress'] === '' && this.error['fileDocumentId'] === '' &&
        this.fileerror['fileDocumentAppointment'] === '' && this.fileerror['fileDocumentBank'] === '' &&
        this.error['fileDocumentAppointment'] === '' && this.error['fileDocumentBank'] === '' &&
        this.fileerror['fileDocumentRegistration'] === '' && this.fileerror['fileDocumentTax'] === '' &&
        this.error['fileDocumentRegistration'] === '' && this.error['fileDocumentTax'] === '') {
        this.kycService.kycCompany(this.filesForMerchant, this.credentialsForMerchant).subscribe((response) => {
          this.getkyc();
          this.notif.success(
            'Success',
            JSON.stringify(response.message)
          )
        }, (err) => {
          this.notif.error(
            'KYC Error', err.error.message)
        });
      }
    }
  }
  bankInstKycfn() {
    if (this.filesForbankInst.fileBankID === null) {
      if (this.filesForbankInst.fileBankID === null) {
        this.error['fileBankID'] = "File Required";
        this.fileerror['fileBankID'] = "";
      }
      return false;
    } else {
      if (this.fileerror['fileBankID'] === '' && this.fileerror['fileBankID'] === '') {
        this.kycService.kycBank(this.filesForbankInst, this.credentialsForBank).subscribe((response) => {
          this.getkyc();
          this.notif.success(
            'Success',
            JSON.stringify(response.message)
          )
        }, (err) => {
          this.notif.error(
            'KYC Error', err.error.message)
        });
      }
    }
  }
}
