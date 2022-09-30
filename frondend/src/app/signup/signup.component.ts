import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators} from '@angular/forms'
import{MatDialogRef} from '@angular/material/dialog'
import { Router } from '@angular/router';
import{UserService} from '../services/user.service'
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstant } from '../shared/global-constants';
import{ NgxUiLoaderService } from 'ngx-ui-loader'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:any=FormGroup
  responseMessage:any

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private snackbar:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      name: [null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstant.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstant.contactNumberRegex)]],
      password: [null, [Validators.required]]

    })
  }
handleSubmit(){
  this.ngxService.start();
 var formData=this.signupForm.value
 var data={
  name:formData.name,
  email:formData.email,
  contactNumber:formData.contactNumber,
  password:formData.password
 }

 this.userService.signup(data).subscribe((res: any) => {
  this.dialogRef.close();
  this.responseMessage = res?.message;
  this.snackbar.openSnackBar(this.responseMessage, "");
  this.router.navigate(['/']);
},(error) => {
    if (error.error?.message) {
      this.responseMessage = error.error?.message;
    }
    else {
    this.responseMessage=GlobalConstant.genericError
  }
  this.snackbar.openSnackBar(this.responseMessage,GlobalConstant.error)
 })
}
}
