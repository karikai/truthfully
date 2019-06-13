import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFetcherService } from 'src/app/services/data-fetcher.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  question;
  questionArray;
  loaded = false;
  loggedInUser = false;

  askQuestion() {
    this.df.createQuestion(this.question, this.user.uid);
    this.question = '';
  }

  respond(resp, qid) {
    this.df.questionResponse(qid, resp);
  }

  constructor(private route: ActivatedRoute, private df: DataFetcherService, private afa: AngularFireAuth) {
    this.user = this.route.snapshot.paramMap.get("username");
    this.df.getUser(this.user).then((user) => {
      this.user = user;
      this.afa.authState.subscribe((userState) => {
        if (userState.uid === this.user.uid) {
          this.loggedInUser = true;
        }
      })
    }).then(() => {
      this.df.getQuestions(this.user.uid).then((questionArray) => {
        this.questionArray = questionArray;
        this.loaded = true;
      });
    })
  }

  ngOnInit() {
  }

}
