import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  redirect(path: string) {
    const link = document.createElement('a');
    link.href = path;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  constructor() { }

  ngOnInit() {
  }

}
