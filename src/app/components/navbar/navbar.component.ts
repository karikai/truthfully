import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  keyword: string;

  search() {
    this.redirect('/search/' + this.keyword);
  }

  redirect(path: string) {
    const link = document.createElement('a');
    link.href = path;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  signOut() {
    this.afa.auth.signOut();
    this.redirect('');
  }

  constructor(private afa: AngularFireAuth) {}

  ngOnInit() {
  }

}
