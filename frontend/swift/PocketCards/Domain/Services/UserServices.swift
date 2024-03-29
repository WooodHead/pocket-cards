//
//  UserServices.swift
//  PocketCards
//
//  Created by macmini on 2022/04/24.
//

import Foundation

enum UserServices {
    enum SignIn {
        struct Request: Codable {
            var username: String
            var password: String

            private enum CodingKeys: String, CodingKey {
                case username
                case password
            }
        }

        struct Response: Codable {
            var success: String
            var authority: String
            var idToken: String
            var accessToken: String
            var refreshToken: String

            private enum CodingKeys: String, CodingKey {
                case success
                case authority
                case idToken
                case accessToken
                case refreshToken
            }
        }
    }

    enum CurriculumList {
        struct Response: Codable {
            var count: Int
            var items: [Curriculum]

            private enum CodingKeys: String, CodingKey {
                case count
                case items
            }
        }
    }
}
