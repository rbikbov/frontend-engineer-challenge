export default {
    "scalars": [
        1,
        2,
        6
    ],
    "types": {
        "User": {
            "id": [
                1
            ],
            "email": [
                2
            ],
            "status": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "String": {},
        "AuthPayload": {
            "accessToken": [
                2
            ],
            "refreshToken": [
                2
            ],
            "user": [
                0
            ],
            "__typename": [
                2
            ]
        },
        "TokenPair": {
            "accessToken": [
                2
            ],
            "refreshToken": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ResetRequestPayload": {
            "success": [
                6
            ],
            "token": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {},
        "Query": {
            "me": [
                0
            ],
            "__typename": [
                2
            ]
        },
        "Mutation": {
            "register": [
                0,
                {
                    "email": [
                        2,
                        "String!"
                    ],
                    "password": [
                        2,
                        "String!"
                    ]
                }
            ],
            "login": [
                3,
                {
                    "email": [
                        2,
                        "String!"
                    ],
                    "password": [
                        2,
                        "String!"
                    ]
                }
            ],
            "refreshToken": [
                4,
                {
                    "refreshToken": [
                        2
                    ]
                }
            ],
            "requestPasswordReset": [
                5,
                {
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "resetPassword": [
                6,
                {
                    "email": [
                        2,
                        "String!"
                    ],
                    "token": [
                        2,
                        "String!"
                    ],
                    "newPassword": [
                        2,
                        "String!"
                    ]
                }
            ],
            "logout": [
                6,
                {
                    "refreshToken": [
                        2
                    ]
                }
            ],
            "__typename": [
                2
            ]
        }
    }
}