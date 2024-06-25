
LoadBanner();
function LoadData() {
    var itemvl = $('#iditem').val().split("-")[0];
    $.post(data_api_url + "/executive-board-page/get-list", function (response) {        
        if (response.ResponseCode === '00_00') {
            var HData = response.ResponseData.filter(obj => {
                return obj.ItemCode === itemvl;
            });
    
            var htmlRegder = "";
            $.map(HData, function (item) {
                htmlRegder += '          <div class="staff-detail-img" style="background-image:url(' + (cdn_url + JSON.parse(item.Avatar).Val) + ');"></div>               ';
                htmlRegder += '          <div class="staff-detail-info">                                        ';
                htmlRegder += '            <p class="staff-gender text-center mb-0 mt-5">' + item.Gender + '</p>                ';
                htmlRegder += '            <h3 class="staff-name text-center text-primary">' + (lang == "VN" ? item.ItemNameVN : item.ItemName) + '</h3> ';
                htmlRegder += '            <p class="staff-role text-center text-gray-500">' + (lang == "VN" ? item.TitleVN : item.Title) + '</p>    ';
                htmlRegder += '          </div>                                                                 ';
                htmlRegder += '                      ' + (lang == "VN" ? item.ProfileVN : item.Profile) + '                                                         ';

            });
            $('#containId').html(htmlRegder);
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
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
    htmlRegder += '<div class="acbs-breadcrumb ">                                            ';
    htmlRegder += '    <nav aria-label="breadcrumb" class="container px-4 px-md-3">          ';
    htmlRegder += '        ' + itemBreadcrumb+'                                          ';
    htmlRegder += '</div>                                                                    ';
    htmlRegder += '<section class="bdh-section section-normal less-space">                          ';
    htmlRegder += '    <div class="container px-4 px-md-3">                                         ';
    htmlRegder += '      <div class="row">                                                          ';
    htmlRegder += '        <div class="staff-detail-container" id="containId">                                     ';

    htmlRegder += '        </div>                                                                   ';
    htmlRegder += '      </div>                                                                     ';
    htmlRegder += '    </div>                                                                       ';
    htmlRegder += '  </section>                                                                     ';

    $('#banner-top').html(htmlRegder);

    LoadData();
}

