//
//  DailyReviewInteractor.swift
//  PocketCards
//
//  Created by macmini on 2022/06/12.
//
//

import Foundation

class DailyReviewInteractor: TestInteractor {
    // update answer
    override func updateAnswer(id: String?, correct _: Bool) {
        guard let qid = id else { return }

        // remove answered question
        removeQuestion(id: qid)
    }

    override func loadQuestions() {
        let params = ["subject": subject]

        API.request(URLs.STUDY_DAILY_REVIEW, method: .get, parameters: params)
            .validate()
            .responseDecodable(of: QuestionServices.LoadQuestion.Response.self) { response in
                guard let res = response.value else { return }

                print("==HUB== \(res)")

                // add new questions
                self.addQuestions(questions: res.questions)
            }
    }
}

extension DailyReviewInteractor: DailyReviewBusinessLogic {}
