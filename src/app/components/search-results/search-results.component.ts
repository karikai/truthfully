import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataFetcherService } from 'src/app/services/data-fetcher.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  keyword: string;
  loaded = false;
  searchArray;

  goToUser(keyword) {
    this.redirect('profile/' + keyword)
  }

  redirect(path: string) {
    const link = document.createElement('a');
    link.href = path;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  constructor(private route: ActivatedRoute, private df: DataFetcherService) {
  }

  ngOnInit() {
    this.keyword = this.route.snapshot.paramMap.get("keyword");
    this.df.searchUsers(this.keyword).then((users) => {
      this.searchArray = users;
      this.loaded = true;
      console.log(this.searchArray);
    })
  }

}
