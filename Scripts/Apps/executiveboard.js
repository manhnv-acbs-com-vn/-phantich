
LoadBanner();
LoadData();
function LoadData() {
    $.post(data_api_url + "/executive-board-page/get-list", function (response) {        
        if (response.ResponseCode === '00_00') {
            ViewBDH(response.ResponseData);            
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function ViewBDH(data) {
    var htmlRegder = '';
    var htmlRegderHDTV = '';
    var BDHData = data.filter(obj => {
        return obj.Category === "BDH";
    });
    $.map(BDHData, function (item) { 
        console.log(item);
        htmlRegder += '<div class="col-12 col-lg-6 col-xl-4">                                                                                   ';
        htmlRegder += '	<div class="grid" style="--bs-gap: 0px">                                                                                ';
        htmlRegder += '                                                                                                                        ';
        htmlRegder += '		<div class="g-col-12">                                                                                              ';
        htmlRegder += '			<div class="bdh-people">                                                                                        ';
        htmlRegder += '				<div class="bdh-people-avatar">                                                                             ';
        htmlRegder += '				<a href="/gioi-thieu/ban-dieu-hanh/thong-tin/' + item.ItemCode + '-' + removeVietnameseTones(item.ItemNameVN)+'">	<img src="' + (cdn_url + JSON.parse(item.Avatar).Val) +'" class="img-fluid" loading="lazy" /> </a>           ';
        htmlRegder += '				</div>                                                                                                      ';
        htmlRegder += '                                                                                                                      ';
        htmlRegder += '				<div class="bdh-people-content">                                                                            ';
        htmlRegder += '					<div class="">'+item.Gender+'</div>                                                                        ';
        htmlRegder += '					<div class="h5 text-primary fw-bold"><a href="/gioi-thieu/ban-dieu-hanh/thong-tin/' + item.ItemCode + '-' + removeVietnameseTones(item.ItemNameVN) +'">  '+(lang == "VN" ? item.ItemNameVN : item.ItemName)+'</a></div>        ';
        htmlRegder += '					<div class="fs-14 opacity-75">'+(lang == "VN" ? item.TitleVN : item.Title)+'</div>                     ';
        htmlRegder += '					<div class="fs-14 mt-2 line-camp3">'+(lang == "VN" ? item.DescriptionVN : item.Description)+'</div>    ';
        htmlRegder += '				</div>                                                                                                      ';
        htmlRegder += '			</div>                                                                                                          ';
        htmlRegder += '		</div>                                                                                                              ';
        htmlRegder += '                                                                                                                         ';
        htmlRegder += '	</div>                                                                                                                  ';
        htmlRegder += '</div>                                                                                                                   ';                                                                                                                                                                                                           
    });                                                                                                                                                                                                         
    $('#BDH-VIEW').html(htmlRegder);

    var HDTVData = data.filter(obj => {
        return obj.Category === "HDTV";
    });
    $.map(HDTVData, function (item) {
        htmlRegderHDTV += '<div class="col-12 col-lg-6 col-xl-4">                                                                                   ';
        htmlRegderHDTV += '	<div class="grid" style="--bs-gap: 0px">                                                                                ';
        htmlRegderHDTV += '                                                                                                                         ';
        htmlRegderHDTV += '		<div class="g-col-12">                                                                                              ';
        htmlRegderHDTV += '			<div class="bdh-people">                                                                                        ';
        htmlRegderHDTV += '				<div class="bdh-people-avatar">                                                                             ';
        htmlRegderHDTV += '				<a href="/gioi-thieu/ban-dieu-hanh/thong-tin/' + item.ItemCode + '-' + removeVietnameseTones(item.ItemNameVN) + '">	<img src="' + (cdn_url + JSON.parse(item.Avatar).Val) + '" class="img-fluid" loading="lazy" /> </a>           ';
        htmlRegderHDTV += '				</div>                                                                                                      ';
        htmlRegderHDTV += '                                                                                                                         ';
        htmlRegderHDTV += '				<div class="bdh-people-content">                                                                            ';
        htmlRegderHDTV += '					<div class="">' + item.Gender + '</div>                                                                        ';
        htmlRegderHDTV += '					<div class="h5 text-primary fw-bold"><a href="/gioi-thieu/ban-dieu-hanh/thong-tin/' + item.ItemCode + '-' + removeVietnameseTones(item.ItemNameVN) + '">  ' + (lang == "VN" ? item.ItemNameVN : item.ItemName) + '</a></div>        ';
         htmlRegderHDTV += '					<div class="fs-14 opacity-75">' + (lang == "VN" ? item.TitleVN : item.Title) + '</div>                     ';
        htmlRegderHDTV += '					<div class="fs-14 mt-2 line-camp3">' + (lang == "VN" ? item.DescriptionVN : item.Description) + '</div>    ';
        htmlRegderHDTV += '				</div>                                                                                                      ';
        htmlRegderHDTV += '			</div>                                                                                                          ';
        htmlRegderHDTV += '		</div>                                                                                                              ';
        htmlRegderHDTV += '                                                                                                                         ';
        htmlRegderHDTV += '	</div>                                                                                                                  ';
        htmlRegderHDTV += '</div>                                                                                                                   ';
    }); 
    $('#HDTV-VIEW').html(htmlRegderHDTV);
}

function LoadBanner() {
    $.post(data_api_url + "/executive-board-page/get-top-banner", function (response) {
        if (response.ResponseCode === '00_00') {
            ViewBanner(response.ResponseData);
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function ViewBanner(data) {
    var htmlRegder = '';
    var itemName = '';
    var itemBreadcrumb = '';
    var itemBackground = '';
    var itemImage = '';
    var itemTitleBDH = '';
    var itemTitleHDTV = '';
    
    var BannerData = data.filter(obj => {
        return obj.PSCode === "1033.1035";
    });
    var BreadcrumbData = data.filter(obj => {
        return obj.PSCode === "1033.1036";
    });
    
    $.map(BannerData, function (item) {
        $.map(JSON.parse(item.DataList), function (itemSub) {
            if (itemSub.Key == 'Name')
                itemName = lang === 'EN' ? itemSub.Name : itemSub.NameVN;
            if (itemSub.Key == 'Background')
                itemBackground = lang === 'EN' ? cdn_url + itemSub.Name : cdn_url +itemSub.NameVN;
            if (itemSub.Key == 'Image')
                itemImage = lang === 'EN' ? cdn_url + itemSub.Name : cdn_url +itemSub.NameVN;
        });                                                                                                            
    });
    $.map(BreadcrumbData, function (item) {
        $.map(JSON.parse(item.DataList), function (itemSub) {
            if (itemSub.Key == 'Breadcrumb')
                itemBreadcrumb = lang === 'EN' ? itemSub.Name : itemSub.NameVN;
            if (itemSub.Key == 'TitleBDH')
                itemTitleBDH = lang === 'EN' ? itemSub.Name : itemSub.NameVN;
            if (itemSub.Key == 'TitleHDTV')
                itemTitleHDTV= lang === 'EN' ? itemSub.Name : itemSub.NameVN;

        });                                                                                                            
    });
    htmlRegder += '<section class="bdh-hero" style="background-image: url(\'' + itemBackground + '\')">         ';
    htmlRegder += '    <div class="container px-4 px-md-3">                                                         ';
    htmlRegder += '        <div class="row align-items-center">                                                     ';
    htmlRegder += '            <div class="col-12" style="">                                      ';
    htmlRegder += '                ' + itemName + '                                                  ';
    htmlRegder += '            </div>                                                                               ';
    htmlRegder += '                                                                                         ';
    htmlRegder += '        </div>                                                                                   ';
    htmlRegder += '    </div>                                                                                       ';
    htmlRegder += '</section>                                                                                       ';
    htmlRegder += '<div class="acbs-breadcrumb ">                                            ';
    htmlRegder += '    <nav aria-label="breadcrumb" class="container px-4 px-md-3">          ';
    htmlRegder += '        ' + itemBreadcrumb+'                                          ';
    htmlRegder += '</div>                                                                    ';
    htmlRegder += '<section class="bdh-section section-normal less-space">                   ';
    htmlRegder += '    <div class="container px-4 px-md-3">                                  ';
    htmlRegder += '        <h3 class="h5 mt-2 mt-lg-5">' + itemTitleHDTV + '</h3>              ';
    htmlRegder += '        <div class="row align-items-center" id="HDTV-VIEW">               ';
    htmlRegder += '        </div>                                                            ';

    htmlRegder += '        <h3 class="h5">' + itemTitleBDH + '</h3>                                 ';
    htmlRegder += '        <div class="row align-items-center" id="BDH-VIEW">                ';
    htmlRegder += '        </div>                                                            ';
    htmlRegder += '    </div>                                                                ';
    htmlRegder += '</section>                                                                ';
    $('#banner-top').html(htmlRegder);

}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    //console.log(str.replace(" ", "-").replace(" ", "-").replace(" ", "-"));
    return str.replace(" ", "-").replace(" ", "-").replace(" ", "-");
}