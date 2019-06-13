export class Question {
    dateCreated;
    question: String;
    response: boolean;
    uid: string;
    qid: string;

    objectToQuestion(questionObject) {
        const newQuestion = new Question();
        newQuestion.question = questionObject.question;
        newQuestion.response = questionObject.response;
        newQuestion.uid = questionObject.uid;
        newQuestion.qid = questionObject.qid;
        newQuestion.dateCreated = questionObject.dateCreated;
        return newQuestion;
    }

    questionToObject(questionModel: Question) {
        const questionObject = {
            question: questionModel.question,
            response: questionModel.response,
            uid: questionModel.uid,
            qid: questionModel.qid,
            dateCreated: questionModel.dateCreated,
        }
        return questionObject;
    }

    constructor() {}
}