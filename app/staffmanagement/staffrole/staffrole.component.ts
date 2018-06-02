import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
	selector: 'app-staffrole',
	templateUrl: './staffrole.component.html',
	styleUrls: ['./staffrole.component.scss'],
	providers: [StaffService]
})
export class StaffroleComponent implements OnInit {

	@ViewChild('largeModal') public largeModal: ModalDirective;

	public StaffRolesList: any = {};
	private StaffRoleForm: FormGroup;
	p: number = 1;
	ol_id: string;
	title: string;
	mod_permission: string;
	status: string;

	constructor(private StaffService: StaffService,
		private router: Router, private fb: FormBuilder) {
		var status = localStorage.getItem('loginStatus');
		if (status != "true") {
			this.router.navigate(['login']);
		}
		// get staff roles
		this.StaffService.GetStaffRoles().subscribe(
			res => { this.StaffRolesList = res },
			err => { console.log(err) });

		// Add Form intitilized
		this.StaffRoleForm = fb.group({
			"ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
			"title": ['', Validators.required],
			"mod_permission": ['', Validators.compose([Validators.required, Validators.min(1)])],
			"status": ['', Validators.required]


		});

	}

	ngOnInit() {
	}
	StaffMsg: string = null;
	AddStaffRole(formData) {
		let data = formData.value;
		formData.reset();
		this.StaffService.AddStaffRole(data).subscribe(res => {
			if (res.status == 200) {
				this.StaffMsg = res.message;
				// get staff roles
				this.StaffService.GetStaffRoles().subscribe(
					res => { this.StaffRolesList = res },
					err => { console.log(err) });

				setTimeout(() => {
					this.StaffMsg = null;
					this.largeModal.hide();

				}, 3000);

			}
			else {
				this.StaffMsg = "Staff Role Can't Be Added";
				setTimeout(() => {
					this.StaffMsg = null;
					this.largeModal.hide();

				}, 3000);
			}

		}, err => {

			this.StaffMsg = "Staff Role Can't Be Added";
			setTimeout(() => {
				this.StaffMsg = null;
				this.largeModal.hide();

			}, 3000);
		});
	}


}
