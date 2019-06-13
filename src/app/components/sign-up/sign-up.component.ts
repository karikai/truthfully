import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user';
import { DataFetcherService } from 'src/app/services/data-fetcher.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  password: string;

  fieldCheck() {
    if (this.user.email == '' || this.user.username === '' || this.password === '') {
      return false;
    } else {
      return true;
    }
  }

  createUser() {
    const checkResult = this.fieldCheck();
    console.log(checkResult);
    
    if (checkResult) {
      this.afa.auth.createUserWithEmailAndPassword(this.user.email, this.password).then((user) => {
        this.user.uid = user.user.uid;
        this.df.createUser(this.user);
      })
    }
    
    if(!checkResult) {
      window.alert('please correct data');
    }
  }

  constructor(private afa: AngularFireAuth, private df: DataFetcherService) {
    this.user = new User();
  }

  ngOnInit() {
  }

}
