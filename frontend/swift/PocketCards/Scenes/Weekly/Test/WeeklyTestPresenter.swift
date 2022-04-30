//
//  WeeklyTestPresenter.swift
//  PocketCards
//
//  Created by macmini on 2022/04/24.
//
//

import Foundation

class WeeklyTestPresenter {
    var view: WeeklyTestDisplayLogic?
}

extension WeeklyTestPresenter: WeeklyTestPresentationLogic {
    func showFinish() {
        let model = WeeklyTestViewModel()
        model.isLoading = false
        model.isFinish = true

        view?.showNext(model: model)
    }

    func showLoading() {
        let model = WeeklyTestViewModel()
        model.isLoading = true
        model.isFinish = false

        view?.showNext(model: model)
    }

    func showError(index: String) {
        view?.showError(index: index)
    }

    func showNext(q: Question, count: Int) {
        let model = WeeklyTestViewModel()
        model.question = q
        model.isLoading = false
        model.count = String(count)

        view?.showNext(model: model)
    }
}
