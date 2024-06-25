
var CateCode = "";
var itemTextTypeReport = "";
renderTypeList();
function renderTypeList() {

    $.post(data_api_url + "/public-news-page/get-title", function (response) {
        if (response.ResponseCode === '00_00') {
            $.map(response.ResponseData, function (item) {
                if (item.PSCode == "1043.1045") {
                    $.map(JSON.parse(item.DataList), function (itemsub) {
                        if (itemsub.Key == 'Name')
                            itemName = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'Banner')
                            itemBanner = lang === 'EN' ? cdn_url + itemsub.Name : cdn_url + itemsub.NameVN;
                    });
                }
                if (item.PSCode == "1043.1046") {

                    $.map(JSON.parse(item.DataList), function (itemsub) {
                        if (itemsub.Key == 'BreadCrumb')
                            itemBreadCrumb = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleFilter')
                            itemTitleFilter = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TextNewFilter')
                            itemTextNewFilter = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TextOldFilter')
                            itemTextOldFilter = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TextSearchFilter')
                            itemTextSearchFilter = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TextTypeReport')
                            itemTextTypeReport = lang === 'EN' ? itemsub.Name : itemsub.NameVN;

                        if (itemsub.Key == 'TitleDMCKMonth')
                            itemTitleDMCKMonth = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleCNMonth')
                            itemTitleCNMonth = lang === 'EN' ? itemsub.Name : itemsub.NameVN;

                        if (itemsub.Key == 'LinkTBCMonth') {
                            itemTitleTBCMonth = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            itemLinkTBCMonth = lang === 'EN' ? itemsub.Link : itemsub.Link;
                        }
                        if (itemsub.Key == 'TitleSAN')
                            itemTitleSAN = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleTableMCKBegin')
                            itemTitleTableMCKBegin = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleTableMCKRemove')
                            itemTitleTableMCKRemove = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleTableMCKAdd')
                            itemTitleTableMCKAdd = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleTableMCKEnd')
                            itemTitleTableMCKEnd = lang === 'EN' ? itemsub.Name : itemsub.NameVN;

                    });
                }
            });
            $('#title-dmck-id').html(itemTitleDMCKMonth);
            
            $('#title-cnt-id').html(itemTitleCNMonth +
                ' <div class="font-sm text-gray-600 datepicker-soju d-block d-sm-inline-block mb-3 mb-sm-0 ms-1">' +
                '    <input class="datepicker-soju-input datepicker-month" data-date-format="mm/yyyy" id="sl-month" onchange="FilterData()" />' +
                '    <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">' +
                '        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />' +
                '    </svg>' +
                '</div>');

            $('#title-san-id').html(itemTitleSAN +
                '<div class="ptcp-widget w-auto d-inline-block">' +
                '    <div class="">' +
                '        <div class="acbs-dropdown-list cbtt-dropdown ">' +
                '            <select class="acbs-dropdown style2 selectpicker form-control-sm show-tick show-menu-arrow bs-select " id="sl-Exchenge" onchange="FilterData()">' +
                '            </select>' +
                '        </div>' +
                '    </div>' +
                '</div>');

            var htmlTitle = '';
            htmlTitle += '<section class="page-heading" style="background-image: url(' + itemBanner + ')">';
            htmlTitle += '    <div class="container px-4 px-md-3 text-center">                                        ';
            htmlTitle += '        <h1 class="text-white">' + itemName + '</h1>                                       ';
            htmlTitle += '    </div>                                                                                  ';
            htmlTitle += '</section>                                                                                  ';
            htmlTitle += '<div class="acbs-breadcrumb">                                                               ';
            htmlTitle += '    ' + itemBreadCrumb + ' ';
            htmlTitle += '</div>                                                                                      ';
            $('#title-id').html(htmlTitle);
        }
        else {
            console.log(response.ResponseMessage);
        }
    });

    $.post(data_api_url + "/public-news-page/get-type-list", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                var html = '';
                var TitleTypeFilter = '';
                html += '<div class="mb-4">                                                                                                                                                            ';
                html += '    <div class="side-nav-action">                                                                                                                                             ';
                html += '        <h3 class="h5 flex-grow-1 mb-0">' + itemTextTypeReport + '</h3>                                                                                                                ';
                html += '        <a class="btn btn-lg py-0 px-0 stretched-link" data-bs-toggle="collapse" href="#collapseSideNav" role="button" aria-expanded="false" aria-controls="collapseExample"> ';
                html += '            <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">                                                  ';
                html += '                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />                                                                   ';
                html += '            </svg>                                                                                                                                                            ';
                html += '        </a>                                                                                                                                                                  ';
                html += '    </div>                                                                                                                                                                    ';
                html += '    <div class="collapse side-nav" id="collapseSideNav">                                                                                                                      ';
                html += '        <ul class="nav flex-column nav-sidebar">                                                                                                                              ';

                var jsData = response.ResponseData.filter(obj => {
                    return obj.CategoryCode !== "DMKQ-Thang" && obj.CategoryCode !== "DMKQ-Quy" && obj.CategoryCode !== "DMKQ-Ngay";
                });
                var jsDataDMKQ = response.ResponseData.filter(obj => {
                    return obj.CategoryCode === "DMKQ-Thang" || obj.CategoryCode === "DMKQ-Quy" || obj.CategoryCode === "DMKQ-Ngay";
                });
                var linkDMKQ = '';
                $.map(jsData, function (item) {
                    var clActive = item.CategoryCode == CateCode ? "active" : "";
                    html += '            <li class="nav-item">                                                                                                                                             ';
                    if (item.CategoryCode === "RP-MP") {

                        html += '<a class="nav-link text-primary fw-bold active "  data-bs-toggle="collapse" href="#collapseEx" role="button" aria-expanded="false" aria-controls="collapseEx"  href="javascript:void(0);">' + (lang == "VN" ? item.CategoryNameVN : item.CategoryNameEN) + ' <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></a>';
                        html += '<div class="collapse" id="collapseEx">                      ';
                        html += '    <ul class="list-unstyled font-sm ms-4 mb-2">            ';

                        $.map(jsDataDMKQ, function (itemDMKQ) {
                            if (itemDMKQ.CategoryCode === "DMKQ-Thang")
                                linkDMKQ = 'theo-thang';
                            if (itemDMKQ.CategoryCode === "DMKQ-Quy")
                                linkDMKQ = 'theo-quy';
                            if (itemDMKQ.CategoryCode === "DMKQ-Ngay")
                                linkDMKQ = 'theo-ngay';
                            html += '        <li>                                                ';
                            html += '            <a href="/cong-bo-thong-tin/' + linkDMKQ + '" class="link-secondary d-block py-1"> ';
                            html += '                ' + (lang == "VN" ? itemDMKQ.CategoryNameVN : itemDMKQ.CategoryNameEN) + '                    ';
                            html += '                    </a>                                    ';
                            html += '        </li>                                               ';

                        });
                        html += '    </ul>                                                   ';
                        html += '</div>                                                      ';

                    } else {
                        html += '<a class="nav-link ' + clActive + ' text-primary fw-bold" aria-current="page"  href="/cong-bo-thong-tin?code=' + item.CategoryCode + '" onClick="filterCate(\'' + item.CategoryCode + '\')">' + (lang == "VN" ? item.CategoryNameVN : item.CategoryNameEN) + '</a>                                                                  ';
                    }


                    html += '            </li>                                                                                                                                                             ';
                    if (item.CategoryCode == CateCode)
                        TitleTypeFilter = lang === 'EN' ? item.CategoryNameVN : item.CategoryNameVN;
                });

                html += '        </ul>                                                                                                                                                                 ';
                html += '    </div>                                                                                                                                                                    ';
                html += '</div>                                                                                                                                                                        ';
                $("#type-list-id").html(html);

                $('#title-type-report').html('<h3 class="h5 mb-0">' + TitleTypeFilter + '</h3>');
                var htmlMobile = '';
                htmlMobile += '    <div class="side-nav-action side-nav-action-mobile">                                                                                                                                             ';
                htmlMobile += '        <h3 class="h5 flex-grow-1 mb-0 menubar-mobile-title py-2">Danh mục</h3>                                                                                                                ';
                htmlMobile += '          <a class="btn btn-lg py-0 px-0 stretched-link" data-bs-toggle="collapse" href="#collapseSideNavMobile" role="button" aria-expanded="false" aria-controls="collapseExample">';
                htmlMobile += '              <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">                                                       ';
                htmlMobile += '                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />                                                                        ';
                htmlMobile += '              </svg>                                                                                                                                                                 ';
                htmlMobile += '         </a>                                                                                                                                                                      ';
                htmlMobile += '    </div>                                                                                                                                                                    ';
                htmlMobile += '    <div class="collapse side-nav side-nav-mobile py-2" id="collapseSideNavMobile">                                                                                                                      ';
                htmlMobile += '        <ul class="nav flex-column px-2 mt-2">                                                                                                                              ';
                htmlMobile += '             <li class="nav-item mobile-lv1 active">                                                                                                                                                               ';
                htmlMobile += '    <div class="mb-2">                                                                                                                                                                                ';
                htmlMobile += '        <div class="side-nav-action side-nav-action-mobile-child">                                                                                                                                    ';
                htmlMobile += '            <h3 class="h5 flex-grow-1 mb-0">' + itemTextTypeReport + '</h3>                                                                                                                                    ';
                htmlMobile += '            <a class="btn btn-lg py-0 px-0 stretched-link" data-bs-toggle="collapse" href="#collapseSideNav"                                                                                          ';
                htmlMobile += '               role="button" aria-expanded="false" aria-controls="collapseExample">                                                                                                                   ';
                htmlMobile += '                <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon" fill="none" viewBox="0 0 24 24"                                                                                             ';
                htmlMobile += '                     stroke="currentColor">                                                                                                                                                           ';
                htmlMobile += '                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />                                                                                       ';
                htmlMobile += '                </svg>                                                                                                                                                                                ';
                htmlMobile += '            </a>                                                                                                                                                                                      ';
                htmlMobile += '        </div>                                                                                                                                                                                        ';
                htmlMobile += '                                                                                                                                                                                                      ';
                htmlMobile += '        <div class="collapse side-nav" id="collapseSideNav">                                                                                                                                          ';
                htmlMobile += '            <ul class="nav flex-column nav-sidebar">                                                                                                                                                  ';

                $.map(jsData, function (item) {
                    var clActive = item.CategoryCode == CateCode ? "active" : " ";
                    if (item.CategoryCode === "RP-MP") {
                        htmlMobile += '            <li class="nav-item  have-child active">                                                                                                                                             ';
                        htmlMobile += '<a class="nav-link fw-bold sidebar-first-link text-primary" data-bs-toggle="collapse" href="#collapseEx" role="button" aria-expanded="true" aria-controls="collapseEx"  href="javascript:void(0);">' + (lang == "VN" ? item.CategoryNameVN : item.CategoryNameEN) + ' <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon icon" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></a>';
                        htmlMobile += '<div class="collapse show py-2" id="collapseEx">                      ';
                        htmlMobile += '    <ul class="list-unstyled font-sm ms-4">            ';

                        $.map(jsDataDMKQ, function (itemDMKQ) {
                            if (itemDMKQ.CategoryCode === "DMKQ-Thang")
                                linkDMKQ = 'theo-thang';
                            if (itemDMKQ.CategoryCode === "DMKQ-Quy")
                                linkDMKQ = 'theo-quy';
                            if (itemDMKQ.CategoryCode === "DMKQ-Ngay")
                                linkDMKQ = 'theo-ngay';
                            htmlMobile += '        <li>                                                ';
                            htmlMobile += '            <a href="/cong-bo-thong-tin/' + linkDMKQ + '" class="link-secondary sidebar-second-link d-block py-1 fw-bold"> ';
                            htmlMobile += '                ' + (lang == "VN" ? itemDMKQ.CategoryNameVN : itemDMKQ.CategoryNameEN) + '                    ';
                            htmlMobile += '                    </a>                                    ';
                            htmlMobile += '        </li>                                               ';

                        });
                        htmlMobile += '    </ul>                                                   ';
                        htmlMobile += '</div>                                                      ';
                        htmlMobile += '</li>                                                                                                                                                             ';

                    } else {

                        htmlMobile += '            <li class="nav-item ' + clActive + '">                                                                                                                                             ';
                        htmlMobile += '<a class="nav-link fw-bold sidebar-first-link text-primary ' + clActive + '"  aria-current="page" href="/cong-bo-thong-tin?code=' + item.CategoryCode + '"  onClick="filterCate(\'' + item.CategoryCode + '\')">' + (lang == "VN" ? item.CategoryNameVN : item.CategoryNameEN) + ' </a>';
                        htmlMobile += '            </li>                                                                                                                                                             ';

                    }

                });

                htmlMobile += '        </ul>                                                                                                                                                                 ';
                htmlMobile += '    </div>                                                                                                                                                                    ';
                $("#type-list-mobile-id").html(htmlMobile);
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
    LoadDataDefault();
}
var OPJDataDefault;
function LoadDataDefault() {
    var htmlRegder = '';
    $.post(data_api_url + "/public-news-page/get-list-stock-month-quarter?strPeriod=MONTH", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                OPJDataDefault = response.ResponseData;
                var myArray = [];
                $.map(response.ResponseData, function (item) {
                    myArray.push(item.StockExchange);
                });
                var listExchenge = myArray.filter((v, i, a) => a.indexOf(v) === i);
                
                if (Array.isArray(listExchenge) && listExchenge.length >= 1) {
                    $.map(listExchenge, function (itemExchenge) {
                        $("#sl-Exchenge").append('<option value="' + itemExchenge + '">' + itemExchenge + '</option>');
                    });
                } else {
                    $("#sl-Exchenge").append('<option value="HNX">HNX</option>');
                }
                
                var myMonth = [];
                $.map(response.ResponseData, function (item) {
                    myMonth.push(item.ByMonth);
                });
                var listMonth = myMonth.filter((v, i, a) => a.indexOf(v) === i);
                var indexMonth = 0;
                $.map(listMonth, function (itemMonth) {
                    if (itemMonth != "" && itemMonth.length >= 6) {
                        indexMonth = indexMonth + 1;
                        if (indexMonth == 1) {
                            $('#sl-month').val('' + itemMonth.slice(4, 6) + '-' + itemMonth.slice(0, 4) + '');
                        }
                    }
                });
                var vlSlMonth = $('#sl-month').val();
                var monttext = vlSlMonth.split("-")[1] + '' + vlSlMonth.split("-")[0];
                $('#title-dmck-id').html('Báo cáo chứng khoán ký quỹ tháng ' + vlSlMonth.split("-")[0] + '/' + vlSlMonth.split("-")[1]);
         
                htmlRegder += '<table class="table acbs-table">                          ';
                htmlRegder += '    <thead class="acbs-table-header">                     ';
                htmlRegder += '        <tr class="">                                     ';
                htmlRegder += '            <th scope="col" class="align-middle">STT</th> ';
                htmlRegder += '            <th scope="col" class="align-middle">         ';
                htmlRegder += '                ' + itemTitleTableMCKBegin + '                           ';
                htmlRegder += '                    </th>                                 ';
                htmlRegder += '            <th scope="col" class="align-middle">         ';
                htmlRegder += '                ' + itemTitleTableMCKRemove + '                 ';
                htmlRegder += '                    </th>                                 ';
                htmlRegder += '            <th scope="col" class="align-middle">         ';
                htmlRegder += '                ' + itemTitleTableMCKAdd + '                ';
                htmlRegder += '                    </th>                                 ';
                htmlRegder += '            <th scope="col" class="align-middle">         ';
                htmlRegder += '                ' + itemTitleTableMCKEnd + '                 ';
                htmlRegder += '                    </th>                                 ';
                htmlRegder += '        </tr>                                             ';
                htmlRegder += '    </thead>                                              ';
                htmlRegder += '    <tbody>                                               ';
                var sttNumber = 0;
                
                var vlSlExchenge = $('#sl-Exchenge').val();
                var OPJData = response.ResponseData.filter(obj => {
                    return obj.StockExchange === vlSlExchenge && obj.ByMonth === monttext;
                });
                $('#title-tbc-id').html('<a href="javascript:void(0);" class="btn btn-file">' + ('Tải báo cáo tháng ' + vlSlMonth.split("-")[0] + ' năm ' + vlSlMonth.split("-")[1]) + '</a>');

                $.map(OPJData, function (item) {
                    sttNumber = sttNumber + 1;
                    htmlRegder += '        <tr>                                              ';
                    htmlRegder += '            <td scope="row" class="align-middle">' + sttNumber + '</th>   ';
                    htmlRegder += '            <td class="align-middle">' + (item.StockCodeBegin == null ? "" : item.StockCodeBegin) + '</td>             ';
                    htmlRegder += '            <td class="align-middle">' + (item.StockCodeRemove == null ? "" : item.StockCodeRemove) + '</td>                ';
                    htmlRegder += '            <td class="align-middle">' + (item.StockCodeAdd == null ? "" : item.StockCodeAdd) + '</td>                ';
                    htmlRegder += '            <td class="align-middle">' + (item.StockCodeEnd == null ? "" : item.StockCodeEnd) + '</td>             ';
                    htmlRegder += '        </tr>                                             ';

                    if (item.AttachFiles != "" && item.AttachFiles != null) {
                        var fileObj = item.AttachFiles != "" ? JSON.parse(item.AttachFiles) : null;
                        var fileLink = fileObj != null ? cdn_url + fileObj[0].Val : "";
                        $('#title-tbc-id').html('<a href="' + fileLink + '" download target="_blank"  class="btn btn-file">' + ('Tải báo cáo tháng ' + vlSlMonth.split("-")[0] + ' năm ' + vlSlMonth.split("-")[1]) + '</a>');

                    }
                });

                htmlRegder += '    </tbody>                                              ';
                htmlRegder += '</table>                                                  ';

                $('#list-stock-id').html(htmlRegder);
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function FilterData() {
    var htmlRegder = '';
    if (Array.isArray(OPJDataDefault)) {


        //var myMonth = [];
        //$.map(OPJDataDefault, function (item) {
        //    myMonth.push(item.ByMonth);
        //});
        //var listMonth = myMonth.filter((v, i, a) => a.indexOf(v) === i);
        //var indexMonth = 0;
        //$.map(listMonth, function (itemMonth) {
        //    if (itemMonth != "" && itemMonth.length >= 6) {
        //        indexMonth = indexMonth + 1;
        //        if (indexMonth == 1) {
        //            $('#sl-month').val('' + itemMonth.slice(4, 6) + '-' + itemMonth.slice(0, 4) + '');
        //        }
        //    }
        //});

        htmlRegder += '<table class="table acbs-table">                          ';
        htmlRegder += '    <thead class="acbs-table-header">                     ';
        htmlRegder += '        <tr class="">                                     ';
        htmlRegder += '            <th scope="col" class="align-middle">STT</th> ';
        htmlRegder += '            <th scope="col" class="align-middle">         ';
        htmlRegder += '                ' + itemTitleTableMCKBegin + '                           ';
        htmlRegder += '                    </th>                                 ';
        htmlRegder += '            <th scope="col" class="align-middle">         ';
        htmlRegder += '                ' + itemTitleTableMCKRemove + '                 ';
        htmlRegder += '                    </th>                                 ';
        htmlRegder += '            <th scope="col" class="align-middle">         ';
        htmlRegder += '                ' + itemTitleTableMCKAdd + '                ';
        htmlRegder += '                    </th>                                 ';
        htmlRegder += '            <th scope="col" class="align-middle">         ';
        htmlRegder += '                ' + itemTitleTableMCKEnd + '                 ';
        htmlRegder += '                    </th>                                 ';
        htmlRegder += '        </tr>                                             ';
        htmlRegder += '    </thead>                                              ';
        htmlRegder += '    <tbody>                                               ';
        var sttNumber = 0;

        var vlSlMonth = $('#sl-month').val();
        var monttext = vlSlMonth.split("-")[1] +''+ vlSlMonth.split("-")[0];
        var vlSlExchenge = $('#sl-Exchenge').val();
        $('#title-dmck-id').html('Báo cáo chứng khoán ký quỹ tháng ' + vlSlMonth.split("-")[0] + '/' + vlSlMonth.split("-")[1]);
                
        var OPJData = OPJDataDefault.filter(obj => {
                return obj.StockExchange === vlSlExchenge && obj.ByMonth === monttext;
            });
            $('#title-tbc-id').html('<a href="javascript:void(0);" class="btn btn-file">' + ('Tải báo cáo tháng ' + vlSlMonth.split("-")[0] + ' năm ' + vlSlMonth.split("-")[1]) + '</a>');

            $.map(OPJData, function (item) {
                sttNumber = sttNumber + 1;
                htmlRegder += '        <tr>                                              ';
                htmlRegder += '            <td scope="row" class="align-middle">' + sttNumber + '</th>   ';
                htmlRegder += '            <td class="align-middle">' + (item.StockCodeBegin == null ? "" : item.StockCodeBegin) + '</td>             ';
                htmlRegder += '            <td class="align-middle">' + (item.StockCodeRemove == null ? "" : item.StockCodeRemove) + '</td>                ';
                htmlRegder += '            <td class="align-middle">' + (item.StockCodeAdd == null ? "" : item.StockCodeAdd) + '</td>                ';
                htmlRegder += '            <td class="align-middle">' + (item.StockCodeEnd == null ? "" : item.StockCodeEnd) + '</td>             ';
                htmlRegder += '        </tr>                                             ';
                if (item.AttachFiles != "" && item.AttachFiles != null) {
                    var fileObj = item.AttachFiles != "" ? JSON.parse(item.AttachFiles) : null;
                    var fileLink = fileObj != null ? cdn_url + fileObj[0].Val : "";
                    $('#title-tbc-id').html('<a href="' + fileLink + '" download target="_blank"  class="btn btn-file">' + ('Tải báo cáo tháng ' + vlSlMonth.split("-")[0] + ' năm ' + vlSlMonth.split("-")[1]) + '</a>');

                }
                   
            });

            htmlRegder += '    </tbody>                                              ';
            htmlRegder += '</table>                                                  ';

            $('#list-stock-id').html(htmlRegder);
        }
}



