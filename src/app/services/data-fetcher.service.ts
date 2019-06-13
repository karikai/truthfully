import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Question } from '../models/question';
import * as firebase from 'firebase';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataFetcherService {

  randomCharacters(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  createQuestion(content, directedUser) {
    const newQuestion = new Question();
    newQuestion.question = content;
    newQuestion.uid = directedUser;
    newQuestion.response = null;
    newQuestion.qid = this.randomCharacters(9);
    newQuestion.dateCreated = firebase.firestore.Timestamp.now();

    this.afs.collection('questions').doc(newQuestion.qid).set(newQuestion.questionToObject(newQuestion));
  }

  questionResponse(quesId, resp) {
    this.afs.collection('questions').doc(quesId).get().subscribe((questionData) => {
      const question = questionData.data();
      question.response = resp;
      this.afs.collection('questions').doc(quesId).set(question);
    });
  }

  searchUsers(keyword) {
    const returnArray = [];
    return new Promise((resolve) => {
      this.afs.collection('users').get().subscribe((allUsers) => {
        allUsers.docs.forEach(userDoc => {
          const user = userDoc.data();
          if (user.username.includes(keyword)) {
            returnArray.push(user)
          }
        })
        resolve(returnArray);
      })
    })
  }

  createUser(newUser: User) {
    this.afs.collection('users').doc(newUser.uid).set(newUser.userToObject(newUser));
  }

  getUser(username) {
    return new Promise((resolve) => {
      const userRef = this.afs.collection('users').ref;
      userRef.where("username", "==", username).get().then((docs) => {
        docs.forEach(doc => {
          const user = doc.data();
          console.log(user)
          resolve(user);
        });
      })
    })
  }

  getQuestions(uid) {
    return new Promise((resolve) => {
      const questionsRef = this.afs.collection('questions').ref;
      questionsRef.where("uid", "==", uid).get().then((docs) => {
        const questionsArray = [];
        docs.forEach(doc => {
          const question = doc.data();
          questionsArray.push(question);
        });
        console.log(questionsArray);
        resolve(questionsArray);
      })
    })
  }
  
  constructor(private afs: AngularFirestore) { }
}
