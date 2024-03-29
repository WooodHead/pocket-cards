////
////  WeeklyChoiceInteractor.swift
////  PocketCards
////
////  Created by macmini on 2022/04/24.
////
////
//
// import Foundation
//
// class WeeklyChoiceInteractor {
//    var presenter: WeeklyChoicePresentationLogic?
// }
//
// extension WeeklyChoiceInteractor: WeeklyChoiceBusinessLogic {
//    func validation(selected: [Curriculum]) {
//        let normalCount = selected.filter { item in
//            item.subject.count == 1
//        }.count
//
//        let abilityCount = selected.filter { item in
//            item.subject.count == 3
//        }.count
//
//        if normalCount == selected.count {
//            presenter?.validateResult(result: true)
//            return
//        }
//
//        if abilityCount == selected.count {
//            presenter?.validateResult(result: true)
//            return
//        }
//
//        presenter?.validateResult(result: false)
//    }
//
//    func loadGroups(subject: String) {
//        Task {
//            let params2 = ["subject": "10" + subject]
//
//            let response = try await API.request(URLs.USER_CURRICULUM_LIST(userId: Auth.userId), method: .get, parameters: params2).serializingDecodable(UserServices.CurriculumList.Response.self).value
//
//            self.presenter?.showGroups(res: response.items)
//        }
//    }
// }
