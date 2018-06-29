import { Component, OnInit, ViewChild } from '@angular/core';
import { TaxService } from '../../services/tax.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Validator, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-viewtax',
  templateUrl: './viewtax.component.html',
  styleUrls: ['./viewtax.component.scss'],
  providers: [TaxService]
})
export class ViewtaxComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  @ViewChild('dangerModal') public dangerModel: ModalDirective;
  public TaxList: any = [];
  p: number = 1;
  public ErrorMsg: string = null;
  AddTaxForm: FormGroup;
  EditTaxForm: FormGroup;
  // searchCat:string|any;

  constructor(private TaxService: TaxService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private Fb: FormBuilder
  ) {
    // var status = localStorage.getItem('loginStatus');
    // if (status != "true") {
    //   this.router.navigate(['login']);
    // }
    // Get all tax
    this.spinnerService.show();
    this.TaxService.GetAllTax().subscribe(res => {
        if (res.status == 200) {
          this.TaxList = res.data;
          this.spinnerService.hide();
        } else {
          this.ErrorMsg = "No tax list to display!";
          this.spinnerService.hide();
        }

      },
      err => {
        this.ErrorMsg = "No tax list to display!";
        this.spinnerService.hide();
      });
    this.CreateAddForm();
    this.CreateEditForm();
  }

  ngOnInit() {}
  // create Add form
  CreateAddForm(): void {
    this.AddTaxForm = this.Fb.group({
      'tax_type': ['', Validators.required],
      'percentage': ['', Validators.required],
      'status': ['', Validators.required]


    });
  }

  // createEditForm
  CreateEditForm(): void {
    this.EditTaxForm = this.Fb.group({
      'id': [''],
      'tax_type': ['', Validators.required],
      'percentage': ['', Validators.required],
      'status': ['', Validators.required]


    });
  }

  ShowModelAdd() {
    this.CreateAddForm();
    this.largeModal.show();

  }
  // Add Tax
  AddMsg: boolean = null;

  AddTax(formData) {
    this.spinnerService.show();
    // let data=new FormData();
    // data.append('tax_type',formData.value.tax_type);
    // data.append('percentage',formData.value.percentage);
    // data.append('status',formData.value.status);
    this.TaxService.AddTax(formData.value).subscribe(res => {
        if (res.status == 200) {
          this.AddMsg = true;
          // get all tax list
          this.TaxService.GetAllTax().subscribe(res => {
              if (res.status == 200) {
                this.TaxList = res.data;
                this.spinnerService.hide();
              } else {
                this.ErrorMsg = "No tax list to display!";
                this.spinnerService.hide();
              }

            },
            err => {
              this.ErrorMsg = "No tax list to display!";
              this.spinnerService.hide();
            });
          setTimeout(() => {
            this.AddMsg = null;
            this.largeModal.hide();
          }, 3000);
        } else {
          this.spinnerService.hide();
          this.AddMsg = false;
          setTimeout(() => {
            this.AddMsg = null;
            this.largeModal.hide();
          }, 3000);
        }
      },
      err => {
        this.spinnerService.hide();
        this.AddMsg = false;
        setTimeout(() => {
          this.AddMsg = null;
          this.largeModal.hide();
        }, 3000);
      })
  }

  // Delete Tax


  TaxId: any = null;
  ConfirmDialog(id, trigger: boolean = false) {

    this.TaxId = id;
    if (trigger == true) {

      this.DeleteTax(this.TaxId);
      this.dangerModel.hide();

    } else { this.dangerModel.show(); }

  }

  DeleteMsg: boolean = null;
  DeleteTax(id) {
    this.spinnerService.show();
    this.TaxService.DeleteTax(id).subscribe(res => {
      if (res.status == 200) {
        this.DeleteMsg = true;
        this.TaxService.GetAllTax().subscribe(res => {
            if (res.status == 200) {
              this.TaxList = res.data;
              this.spinnerService.hide();
            } else {
              this.ErrorMsg = "No tax list to display!";
              this.spinnerService.hide();
            }

          },
          err => {
            this.ErrorMsg = "No tax list to display!";
            this.spinnerService.hide();
          });
        setTimeout(() => {
          this.DeleteMsg = null;


        }, 3000);

      } else {
        this.DeleteMsg = false;
        this.spinnerService.hide();
        setTimeout(() => {
          this.DeleteMsg = null;


        }, 3000);
      }

    }, err => {
      this.spinnerService.hide();
      this.DeleteMsg = false;
      setTimeout(() => {
        this.DeleteMsg = null;


      }, 3000);
    });
  }
  // Edit tax
  Editrow = [];
  show(data, modal) {

    this.Editrow = new Array();
    this.Editrow.push(data);

    modal.show();
  }

  model = {
    'id': '',
    'tax_type': '',
    'percentage': '',
    'status': ''
  }
  Edit($event = 0) {

    this.model = null;
    this.model = {
      'id': this.Editrow[0].id,
      'tax_type': this.Editrow[0].tax_type,
      'percentage': this.Editrow[0].percentage,
      'status': this.Editrow[0].status

    }


  }
  EditMsg: boolean = null;
  EditTax(formData) {
    this.spinnerService.show();
    this.TaxService.UpdateTax(formData.value).subscribe(res => {

      if (res.status == 200) {
        this.EditMsg = true;
        // get all tax list
        this.TaxService.GetAllTax().subscribe(res => {
            if (res.status == 200) {
              this.TaxList = res.data;
              this.spinnerService.hide();
            } else {
              this.ErrorMsg = "No tax list to display!";
              this.spinnerService.hide();
            }

          },
          err => {
            this.ErrorMsg = "No tax list to display!";
            this.spinnerService.hide();
          });
        setTimeout(() => {
          this.EditMsg = null;
          this.largeModal1.hide();

        }, 3000);
      } else {
        this.EditMsg = false;
           this.spinnerService.hide();
        setTimeout(() => {
          this.EditMsg = null;
          this.largeModal1.hide();

        }, 3000);
      }

    }, err => {
      this.EditMsg = false;
         this.spinnerService.hide();
      setTimeout(() => {
        this.EditMsg = null;
        this.largeModal1.hide();

      }, 3000);


    });

  }

}
