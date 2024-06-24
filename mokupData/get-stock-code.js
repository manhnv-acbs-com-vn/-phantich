
const api = "http://uapi-gw.acbs.com.vn/gateway/api-research/get-stock-code"
const requestgetstockcode = {
    "limit": 20,
    "offset": 0,
    "query": {
        "stock_code": [
            "string"
        ],
        "recommend_date": {
            "from": "",
            "to": ""
        }
    }

}

 const getstockcode = {
    "result_code": 0,
    "data": {
        "limit": 10,
        "offset": 0,
        "max": 0,
        "data": [
            {
                "item_id": 13,
                "item_code": "ACB",
                "full_name": "ASIA COMMERCIAL BANK",
                "full_name_vn": "NGAN HANG TMCP A CHAU    ",
                "current_price": 25950,
                "target_price": 0,
                "recommend_date": "18/03/2024"
            },
            {
                "item_id": 1425,
                "item_code": "FPT",
                "full_name": "FPT CORPORATION",
                "full_name_vn": "CTCP FPT                 ",
                "profit_margin": 23.17,
                "current_price": 95900,
                "target_price": 116117,
                "price_vs_target": 21.08,
                "recommend_date": "29/01/2024",
                "recommend_status": "BUY"
            },
            {
                "item_id": 357,
                "item_code": "NLG",
                "full_name": "NAM LONG INVESTMENT CORPORATION",
                "full_name_vn": "CTCP DAU TU NAM LONG     ",
                "profit_margin": 9.66,
                "current_price": 38950,
                "target_price": 42212,
                "price_vs_target": 8.37,
                "recommend_date": "25/12/2023",
                "recommend_status": "HOLD"
            },
            {
                "item_id": 1620,
                "item_code": "PVS",
                "full_name": "PETROVIETNAM TECHNICAL SERVICE JSC",
                "full_name_vn": "PVS",
                "profit_margin": 9.76,
                "current_price": 36900,
                "target_price": 40500,
                "price_vs_target": 9.76,
                "recommend_date": "25/12/2023",
                "recommend_status": "HOLD"
            },
            {
                "item_id": 208,
                "item_code": "DGC",
                "full_name": "DUC GIANG CHEMICALS GROUP JSC",
                "full_name_vn": "CTCPTD HOA CHAT DUC GIANG",
                "profit_margin": 15.67,
                "current_price": 89900,
                "target_price": 100986,
                "price_vs_target": 12.33,
                "recommend_date": "12/12/2023",
                "recommend_status": "BUY"
            },
            {
                "item_id": 538,
                "item_code": "VIB",
                "full_name": "VIETNAM INTERNATIONAL COMMERCIAL JOINT STOCK BANK",
                "full_name_vn": "NGAN HANG TMCP QUOC TE VN",
                "profit_margin": 40.38,
                "current_price": 20800,
                "target_price": 27800,
                "price_vs_target": 33.65,
                "recommend_date": "12/12/2023",
                "recommend_status": "BUY"
            },
            {
                "item_id": 317,
                "item_code": "MWG",
                "full_name": "MOBILE WORLD INVESTMENT CORPORATION",
                "full_name_vn": "CTCP DT THE GIOI DI DONG ",
                "profit_margin": 15.85,
                "current_price": 44600,
                "target_price": 51170,
                "price_vs_target": 14.73,
                "recommend_date": "08/12/2023",
                "recommend_status": "BUY"
            },
            {
                "item_id": 1764,
                "item_code": "SIP",
                "full_name": "SAI GON VRG INVESTMENT CORPORATION",
                "full_name_vn": "CTCP DAU TU SAI GON VRG  ",
                "profit_margin": 6.95,
                "current_price": 73800,
                "target_price": 77926,
                "price_vs_target": 5.59,
                "recommend_date": "05/12/2023",
                "recommend_status": "HOLD"
            },
            {
                "item_id": 1610,
                "item_code": "PVD",
                "full_name": "PETROVIETNAM DRILLING & WELL SERVICE CORPORATION",
                "full_name_vn": "CTCP KHOAN VA DV DAU KHI ",
                "profit_margin": 15.94,
                "current_price": 27600,
                "target_price": 32000,
                "price_vs_target": 15.94,
                "recommend_date": "01/12/2023",
                "recommend_status": "BUY"
            },
            {
                "item_id": 481,
                "item_code": "POW",
                "full_name": "PETROVIETNAM POWER CORPORATION",
                "full_name_vn": "TCT DIEN LUC DAU KHI VN  ",
                "profit_margin": 18.73,
                "current_price": 11400,
                "target_price": 13535,
                "price_vs_target": 18.73,
                "recommend_date": "01/12/2023",
                "recommend_status": "BUY"
            }
        ]
    }
}