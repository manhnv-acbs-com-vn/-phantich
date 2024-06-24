const api  = "http://uapi-gw.acbs.com.vn/gateway/api-research/get-all-filter"
const  	responsegetAllfilter  =  {
    "result_code": 0,
    "data": {
      "analysis_type": [
        {
          "code": "A-BCCL",
          "info_vn": "Báo cáo chiến lược",
          "info_en": "Strategy reports"
        },
        {
          "code": "A-BCCP",
          "info_vn": "Báo cáo cổ phiếu",
          "info_en": "Stock reports"
        },
        {
          "code": "A-BCN",
          "info_vn": "Báo cáo ngành",
          "info_en": "Industry reports"
        },
        {
          "code": "A-FN",
          "info_vn": "Flash News",
          "info_en": "Flash News"
        },
        {
          "code": "A-PTKT",
          "info_vn": "Phân tích kỹ thuật",
          "info_en": "Technical analysis"
        }
      ],
      "analysis_group": [
        {
          "code": "G-BCCQ",
          "info_vn": "Báo cáo chứng quyền",
          "info_en": "Warrant reports"
        },
        {
          "code": "G-BCDN",
          "info_vn": "Báo cáo doanh nghiệp",
          "info_en": "Corporate reports"
        },
        {
          "code": "G-BCTQ",
          "info_vn": "Báo cáo tổng quan",
          "info_en": "Overview reports"
        }
      ],
      "business_scope": [
        {
          "code": "B-BANLE",
          "info_vn": "Bán lẻ",
          "info_en": "Retail"
        },
        {
          "code": "B-BAOHIEM",
          "info_vn": "Bảo hiểm",
          "info_en": "Insurance"
        },
        {
          "code": "B-BATDONGSAN",
          "info_vn": "Bất động sản",
          "info_en": "Real estate"
        },
        {
          "code": "B-CONGNGHETHONGTIN",
          "info_vn": "Công nghệ thông tin",
          "info_en": "Information Technology"
        },
        {
          "code": "B-DAUKHI",
          "info_vn": "Dầu khí",
          "info_en": "Oil and Gas"
        },
        {
          "code": "B-DICHVUTAICHINH",
          "info_vn": "Dịch vụ tài chính",
          "info_en": "Financials"
        },
        {
          "code": "B-DIENNUOCXANG",
          "info_vn": "Điện, nước & xăng dầu khí đốt",
          "info_en": "Oil & gas"
        },
        {
          "code": "B-DULICHGIAITRI",
          "info_vn": "Du lịch và Giải trí",
          "info_en": "Travel & Leisure"
        },
        {
          "code": "B-HANGCANHANGIADUNG",
          "info_vn": "Hàng cá nhân & Gia dụng",
          "info_en": "Personal & household goods"
        },
        {
          "code": "B-HANGKHONG",
          "info_vn": "Hàng không",
          "info_en": "Aviation"
        },
        {
          "code": "B-HANGVADICHVUCONGNGHIEP",
          "info_vn": "Hàng & Dịch vụ Công nghiệp",
          "info_en": "Industrial goods & services"
        },
        {
          "code": "B-HOACHAT",
          "info_vn": "Hóa chất",
          "info_en": "Chemistry"
        },
        {
          "code": "B-LOGISTIC",
          "info_vn": "Logistic",
          "info_en": "Logistic"
        },
        {
          "code": "B-NGANHANG",
          "info_vn": "Ngân hàng",
          "info_en": "Bank"
        },
        {
          "code": "B-TAINGUYENCOBAN",
          "info_vn": "Tài nguyên Cơ bản",
          "info_en": "Basic Resources"
        },
        {
          "code": "B-THUCPHAMDOUONG",
          "info_vn": "Thực phẩm và đồ uống",
          "info_en": "Food & Beverage"
        },
        {
          "code": "B-THUYSAN",
          "info_vn": "Thuỷ sản",
          "info_en": "Aquaculture"
        },
        {
          "code": "B-XAYDUNGVATLIEU",
          "info_vn": "Xây dựng & Vật liệu ",
          "info_en": "Construction & Materials"
        },
        {
          "code": "B-YTE",
          "info_vn": "Y tế",
          "info_en": "Health care"
        }
      ],
      "stock_code": [
        {
          "code": "BCM",
          "info_vn": "TCT DT VA PT CN - CTCP",
          "info_en": "INVESTMENT AND INDUSTRIAL DEVELOPMENT CORPORATION"
        },
        {
          "code": "BID",
          "info_vn": "NH TMCP DT&PT VIET NAM",
          "info_en": "JOINT STOCK COMMERCIAL BANK FOR INVESTMENT AND DEVELOPMENT OF VIETNAM"
        },
        {
          "code": "BSR",
          "info_vn": "BSR",
          "info_en": "BINH SON REFINING AND PETROCHEMICAL COMPANY LIMITED"
        },
        {
          "code": "C32",
          "info_vn": "CTCP CIC39",
          "info_en": "CIC39 CORPORATION"
        },
        {
          "code": "CKG",
          "info_vn": "CTCP TD TVDTXD KIEN GIANG",
          "info_en": "KIEN GIANG CONSTRUCTION INVESTMENT CONSULTANCY GROUP"
        },
        {
          "code": "CTD",
          "info_vn": "CTCP XAY DUNG COTECCONS",
          "info_en": "COTECCONS CONSTRUCTION JSC"
        },
        {
          "code": "CTG",
          "info_vn": "NH TMCP CONG THUONG VN",
          "info_en": "VIETNAM JOINT STOCK COMMERCIAL BANK FOR INDUSTRY AND TRADE"
        },
        {
          "code": "DCG",
          "info_vn": "DCG",
          "info_en": "THE DAP CAU GARMENT CORPORATION JSC"
        },
        {
          "code": "DCH",
          "info_vn": "DCH",
          "info_en": "HANOI CADASTRAL SURVEY JSC"
        },
        {
          "code": "DCM",
          "info_vn": "CTCP PHAN BON DK CA MAU",
          "info_en": "PETROVIETNAM CA MAU FERTILIZER JSC"
        },
        {
          "code": "DGC",
          "info_vn": "CTCPTD HOA CHAT DUC GIANG",
          "info_en": "DUC GIANG CHEMICALS GROUP JSC"
        },
        {
          "code": "DGW",
          "info_vn": "CTCP THE GIOI SO",
          "info_en": "DIGIWORLD CORP"
        },
        {
          "code": "DHC",
          "info_vn": "CTCP DONG HAI BEN TRE",
          "info_en": "DONG HAI JSC OF BEN TRE"
        },
        {
          "code": "DHG",
          "info_vn": "CTCP DUOC HAU GIANG",
          "info_en": "HAU GIANG PHARMACEUTICAL JOINT-STOCK COMPANY"
        },
        {
          "code": "DPM",
          "info_vn": "TCT PB&HC DAU KHI-CTCP",
          "info_en": "PETROVIETNAM FERTILIZER AND CHEMICALS CORPORATION"
        },
        {
          "code": "DXG",
          "info_vn": "CTCP TAP DOAN DAT XANH",
          "info_en": "DAT XANH GROUP JSC"
        },
        {
          "code": "DXS",
          "info_vn": "CTCP DICH VU BDS DAT XANH",
          "info_en": "DAT XANH REAL ESTATE SERVICES JSC"
        },
        {
          "code": "EIB",
          "info_vn": "NH TMCP XNK VIET NAM",
          "info_en": "VIET NAM EXPORT IMPORT COMMERCIAL JOINT STOCK BANK"
        },
        {
          "code": "FPT",
          "info_vn": "CTCP FPT",
          "info_en": "FPT CORPORATION"
        },
        {
          "code": "FRT",
          "info_vn": "CTCP BAN LE KTS FPT",
          "info_en": "FPT DIGITAL RETAIL JSC"
        },
        {
          "code": "GAS",
          "info_vn": "TCT KHI VIET NAM - CTCP",
          "info_en": "PETROVIETNAM GAS JOINT STOCK CORPORATION"
        },
        {
          "code": "GEG",
          "info_vn": "CTCP DIEN GIA LAI",
          "info_en": "GIA LAI ELECTRICITY JSC"
        },
        {
          "code": "HBC",
          "info_vn": "CTCP TD XAY DUNG HOA BINH",
          "info_en": "HOA BINH CONSTRUCTION GROUP JSC"
        },
        {
          "code": "HPG",
          "info_vn": "CTCP TAP DOAN HOA PHAT",
          "info_en": "HOA PHAT GROUP JSC"
        },
        {
          "code": "IDC",
          "info_vn": "IDC",
          "info_en": "IDICO CORPORATION - JSC"
        },
        {
          "code": "IJC",
          "info_vn": "CTCP PT HA TANG KY THUAT",
          "info_en": "BECAMEX INFRASTRUCTURE DEVELOPMENT JSC"
        },
        {
          "code": "IMP",
          "info_vn": "CTCP DUOC PHAM IMEXPHARM",
          "info_en": "IMEXPHARM CORPORATION"
        },
        {
          "code": "KBC",
          "info_vn": "TCT PT DT KINH BAC-CTCP",
          "info_en": "KINH BAC CITY DEVELOPMENT SHARE HOLDING CORPORATION"
        },
        {
          "code": "KDH",
          "info_vn": "CTCP DT&KD NHA KHANG DIEN",
          "info_en": "KHANG DIEN HOUSE TRADING AND INVESTMENT JSC"
        },
        {
          "code": "MBB",
          "info_vn": "NGAN HANG TMCP QUAN DOI",
          "info_en": "MILITARY COMMERCIAL JOINT - STOCK BANK"
        },
        {
          "code": "MSB",
          "info_vn": "NH TMCP HANG HAI VIET NAM",
          "info_en": "VIETNAM MARITIME COMMERCIAL JOINT STOCK BANK"
        },
        {
          "code": "MSH",
          "info_vn": "CTCP MAY SONG HONG",
          "info_en": "SONG HONG GARMENT JSC"
        },
        {
          "code": "MSN",
          "info_vn": "CTCP TAP DOAN MA SAN",
          "info_en": "MASAN GROUP CORPORATION"
        },
        {
          "code": "MWG",
          "info_vn": "CTCP DT THE GIOI DI DONG",
          "info_en": "MOBILE WORLD INVESTMENT CORPORATION"
        },
        {
          "code": "NLG",
          "info_vn": "CTCP DAU TU NAM LONG",
          "info_en": "NAM LONG INVESTMENT CORPORATION"
        },
        {
          "code": "NT2",
          "info_vn": "CTCP DLDK NHON TRACH 2",
          "info_en": "PETROVIETNAM POWER NHON TRACH 2 JSC"
        },
        {
          "code": "NVL",
          "info_vn": "CTCP TD DT DIA OC NO VA",
          "info_en": "NO VA LAND INVESTMENT GROUP CORPORATION"
        },
        {
          "code": "OCB",
          "info_vn": "NH TMCP PHUONG DONG",
          "info_en": "ORIENT COMMERCIAL JOINT STOCK BANK"
        },
        {
          "code": "PC1",
          "info_vn": "CTCP TAP DOAN PC1",
          "info_en": "POWER CONSTRUCTION JSC NO.1"
        },
        {
          "code": "PNJ",
          "info_vn": "CTCP VB DQ PHU NHUAN",
          "info_en": "PHU NHUAN JEWELRY JSC"
        },
        {
          "code": "POW",
          "info_vn": "TCT DIEN LUC DAU KHI VN",
          "info_en": "PETROVIETNAM POWER CORPORATION"
        },
        {
          "code": "PPC",
          "info_vn": "CTCP NHIET DIEN PHA LAI",
          "info_en": "PHA LAI THERMAL POWER JOINT - STOCK COMPAY"
        },
        {
          "code": "PVD",
          "info_vn": "CTCP KHOAN VA DV DAU KHI",
          "info_en": "PETROVIETNAM DRILLING & WELL SERVICE CORPORATION"
        },
        {
          "code": "PVS",
          "info_vn": "PVS",
          "info_en": "PETROVIETNAM TECHNICAL SERVICE JSC"
        },
        {
          "code": "QTP",
          "info_vn": "QTP",
          "info_en": "QUANG NINH THERMAL POWER JSC"
        },
        {
          "code": "REE",
          "info_vn": "CTY CP CO DIEN LANH",
          "info_en": "REFRIGERATION ELECTRICAL ENGINEERING CORPORATION"
        },
        {
          "code": "SAB",
          "info_vn": "TONG CTCP BIA-RUOU-NGK SG",
          "info_en": "SAIGON BEER – ALCOHOL – BEVERAGE CORPORATION"
        },
        {
          "code": "SCS",
          "info_vn": "CTCP DV HANG HOA SAI GON",
          "info_en": "SAIGON CARGO SERVICE CORPORATION"
        },
        {
          "code": "SIP",
          "info_vn": "CTCP DAU TU SAI GON VRG",
          "info_en": "SAI GON VRG INVESTMENT CORPORATION"
        },
        {
          "code": "STB",
          "info_vn": "NH TMCP SG THUONG TIN",
          "info_en": "SAI GON THUONG TIN COMMERCIAL JOINT STOCK BANK"
        },
        {
          "code": "STK",
          "info_vn": "CTCP SOI THE KY",
          "info_en": "CENTURY SYNTHETIC FIBER CORPORATION"
        },
        {
          "code": "SZC",
          "info_vn": "CTCP SONADEZI CHAU DUC",
          "info_en": "SONADEZI CHAU DUC SHAREHOLDING COMPANY"
        },
        {
          "code": "TCB",
          "info_vn": "NH TMCP KY THUONG VN",
          "info_en": "VIETNAM TECHNOLOGICAL AND COMMERCIAL JOINT STOCK BANK"
        },
        {
          "code": "VCB",
          "info_vn": "NH TMCP NGOAI THUONG VN",
          "info_en": "JOINT STOCK COMMERCIAL BANK FOR FOREIGN TRADE OF VIETNAM"
        },
        {
          "code": "VCG",
          "info_vn": "TONG CTCP XNK VA XD VN",
          "info_en": "VIET NAM CONTRUCTION AND IMPORT - EXPORT JOINT STOCK CORPORATION"
        },
        {
          "code": "VHC",
          "info_vn": "CTCP VINH HOAN",
          "info_en": "VINH HOAN CORPORATION"
        },
        {
          "code": "VHM",
          "info_vn": "CTCP VINHOMES",
          "info_en": "VINHOMES JSC"
        },
        {
          "code": "VIB",
          "info_vn": "NGAN HANG TMCP QUOC TE VN",
          "info_en": "VIETNAM INTERNATIONAL COMMERCIAL JOINT STOCK BANK"
        },
        {
          "code": "VJC",
          "info_vn": "CTCP HANG KHONG VIETJET",
          "info_en": "VIETJET AVIATION JSC"
        },
        {
          "code": "VND",
          "info_vn": "CTCP CHUNG KHOAN VNDIRECT",
          "info_en": "VNDIRECT JOINT STOCK SECURITIES COMPANY"
        },
        {
          "code": "VNM",
          "info_vn": "CTCP SUA VIET NAM",
          "info_en": "VIETNAM DAIRY PRODUCTS JSC"
        },
        {
          "code": "VOC",
          "info_vn": "VOC",
          "info_en": "VIETNAM VEGETABLE OILS INDUSTRY CORPORATION"
        },
        {
          "code": "VOS",
          "info_vn": "CTCP VAN TAI BIEN VN",
          "info_en": "VIET NAM OCEAN SHIPPING JSC"
        },
        {
          "code": "VRE",
          "info_vn": "CTCP VINCOM RETAIL",
          "info_en": "VINCOM RETAIL JSC"
        }
      ]
    }
  }