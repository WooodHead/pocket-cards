//
//  OverallTimesContract.swift
//  PocketCards
//
//  Created by macmini on 2022/04/11.
//
//

import Charts

// View logic
protocol OverallTimesDisplayLogic {
    func setOveralls(res: ReportServices.OverallTimes.Response)

    func getBarChartData() -> [BarChartDataEntry]
}

// Interactor logic
protocol OverallTimesBusinessLogic {
    func load()
}

// Presenter logic
protocol OverallTimesPresentationLogic {
    func show(res: ReportServices.OverallTimes.Response)
}
