
export function staffTemplate(){
    return [
        {
            "id": 12,
            "code": "ie2j43",
            "privilegeId": 1,
            "departmentId": 1,
            "username": "test",
            "pwd": "107100114116114",
            "firstname": "Great",
            "lastname": "King",
            "phone": "0908743844",
            "address": "somewhere nice",
            "joinDateTime": "null",
            "active": true
        }
    ];
}

export function activityTemplate(){
    return [
        {
            "id": 2,
            "patientId": 1,
            "staffId": 2,
            "activityType": "New Patient Registration",
            "dateTime": "2020-09-07T00:19:45.175+00:00"
        },{
            "id": 3,
            "patientId": 2,
            "staffId": 3,
            "activityType": "Returning Patient",
            "dateTime": "2020-09-07T00:19:45.175+00:00"
        },{
            "id": 4,
            "patientId": 3,
            "staffId": 4,
            "activityType": "Admitted Patient",
            "dateTime": "2020-09-07T00:19:45.175+00:00"
        },{
            "id": 5,
            "patientId": 4,
            "staffId": 5,
            "activityType": "Discharged Patient",
            "dateTime": "2020-09-07T00:19:45.175+00:00"
        }
    ];
}
export function patientTemplate(){
    return [
        {
            "id": 1,
            "code": "testCode",
            "joinDateTime": "2020-09-06T10:27:55.628+00:00",
            "staffInChargeId": 1,
            "patientDetailEntity": {
                "id": 1,
                "firstname": "Adekunle",
                "lastname": "Opemola",
                "phone": "09034359434",
                "nextOfKinName": "Samuel",
                "nextOfKinPhone": "09034329384",
                "email": "test@email.com",
                "gender": "M",
                "currentAddress": "Somewhere like somewhere",
                "nextOfKinAddress": "Some fit for a next of kin",
                "nationality": "Nigerian",
                "stateOfOrigin": "Lagos",
                "cityOfOrigin": "osogbo",
                "bloodGroup": "OO",
                "height": 23.0,
                "weight": 80.0,
                "dateOfBirth": "1993-11-02T23:00:00.000+00:00",
                "age": 27
            }
        },
        {
            "id": 2,
            "code": "ewd3d",
            "joinDateTime": "2020-09-06T10:27:55.628+00:00",
            "staffInChargeId": 1,
            "patientDetailEntity": {
                "id": 1,
                "firstname": "Amoo",
                "lastname": "Teniola",
                "phone": "09021359434",
                "nextOfKinName": "Paul",
                "nextOfKinPhone": "09034569384",
                "email": "teni@email.com",
                "gender": "M",
                "currentAddress": "Somewhere like somewhere",
                "nextOfKinAddress": "Some fit for a next of kin",
                "nationality": "Nigerian",
                "stateOfOrigin": "Ondo",
                "cityOfOrigin": "Akure",
                "bloodGroup": "AA",
                "height": 40.0,
                "weight": 50.0,
                "dateOfBirth": "1997-12-03T23:00:00.000+00:00",
                "age": 13
            }
        }
    ];
}

export function transactionTemplate(){
    return [
        {
            "id": 2,
            "staffId": 1,
            "departmentId": 1,
            "dateTime": "2020-09-05T17:07:07.020+00:00",
            "transactionItemDetailEntities": [
                {
                    "id": 12,
                    "itemQuantity": 5,
                    "itemPrice": 200,
                    "itemDescription": "Paracetamol 300ml"
                },
                {
                    "id": 32,
                    "itemQuantity": 1,
                    "itemPrice": 10,
                    "itemDescription": "Flagill 150ml"
                },
                {
                    "id": 65,
                    "itemQuantity": 2,
                    "itemPrice": 1500,
                    "itemDescription": "Orheptal Blood Tonic Nigerian Brand"
                }
            ],
            "transactionItemDetails": [
                {
                    "id": 3,
                    "itemQuantity": 5,
                    "itemPrice": 200,
                    "itemDescription": "Paracetamol2 300ml"
                },
                {
                    "id": 4,
                    "itemQuantity": 1,
                    "itemPrice": 10,
                    "itemDescription": "Flagill2 150ml"
                },
                {
                    "id": 5,
                    "itemQuantity": 2,
                    "itemPrice": 1500,
                    "itemDescription": "Orheptal2 Blood Tonic Nigerian Brand"
                }
            ]
        },
        {
            "id": 3,
            "staffId": 1,
            "departmentId": 1,
            "dateTime": "2020-09-05T17:07:07.020+00:00",
            "transactionItemDetailEntities": [
                {
                    "id": 32,
                    "itemQuantity": 5,
                    "itemPrice": 200,
                    "itemDescription": "Paracetamol3 300ml"
                },
                {
                    "id": 7,
                    "itemQuantity": 1,
                    "itemPrice": 10,
                    "itemDescription": "Flagill3 150ml"
                },
                {
                    "id": 1,
                    "itemQuantity": 2,
                    "itemPrice": 1500,
                    "itemDescription": "Orheptal3 Blood Tonic Nigerian Brand"
                }
            ],
            "transactionItemDetails": [
                {
                    "id": 76,
                    "itemQuantity": 5,
                    "itemPrice": 200,
                    "itemDescription": "Paracetamol4 300ml"
                },
                {
                    "id": 45,
                    "itemQuantity": 1,
                    "itemPrice": 10,
                    "itemDescription": "Flagill4 150ml"
                },
                {
                    "id": 34,
                    "itemQuantity": 2,
                    "itemPrice": 1500,
                    "itemDescription": "Orheptal4 Blood Tonic Nigerian Brand"
                }
            ]
        }];
}