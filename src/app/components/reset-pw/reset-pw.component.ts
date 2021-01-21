import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-pw',
  templateUrl: './reset-pw.component.html',
  styleUrls: ['./reset-pw.component.scss'],
})
export class ResetPwComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  submitReset(form) {
    console.log(form.value.email);
    let email = form.value.email;
    this.authService.reset_email(email).subscribe(data => {
      console.log(data);
    })
  }

}
