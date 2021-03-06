import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { ActivatedRoute } from '@angular/router';
import { MeService } from '../me.service';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string;
  form: FormGroup;
  isAdmin: boolean;
  priviledge: number;
  expiredAt: Date;
  currentDate: Date = new Date();
  priviledges: string[] = ['Basic', '', 'Pro'];
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private meService: MeService,
    private authService: AuthService
  ) {
    this.isAdmin = authService.isAdmin();
  }

  ngOnInit() {

  /*id: number;
  priviledge: number;*/
    this.form = this.fb.group({     
      email: ['', Validators.required],
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      country: ['',Validators.required],
      region: ['', Validators.required],
      postalCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
    this.form.get('email').disable();
    this.getUser();
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    let { name, email, dateOfBirth, country, region, postalCode, phoneNumber} = this.form.value;
    if (this.form.valid) {
      this.meService.updateUser({
        id: null,
        name: name,
        email: this.email,
        active: null,
        dateOfBirth: dateOfBirth,
        country: country,
        region: region,
        postalCode: postalCode,
        phoneNumber:phoneNumber,
        role:null,
        priviledge: null,
        expiredAt: null
      }).subscribe(user => {
        this.setValue(user);
      }, error => {
        console.log(error);
      }) 
    }
    this.formSubmitAttempt = true;            
  }

  getUser(): void {
    this.meService.getUser()
      .subscribe(user => {
        this.setValue(user);
      }, error => {
        console.log(error);
      });
  }

  setValue(user: User): void {
        this.email = user.email;
        this.form.controls['email'].setValue(user.email);
        this.form.controls['name'].setValue(user.name);
        this.form.controls['country'].setValue(user.country);
        this.form.controls['region'].setValue(user.region);
        this.form.controls['postalCode'].setValue(user.postalCode);
        this.form.controls['phoneNumber'].setValue(user.phoneNumber);
        this.form.controls['dateOfBirth'].setValue(user.dateOfBirth);

        this.priviledge = user.priviledge;
        this.expiredAt = new Date(user.expiredAt);
  }

}
