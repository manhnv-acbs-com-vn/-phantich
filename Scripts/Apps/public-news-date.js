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
                        if (itemsub.Key == 'TitleDMCK')
                            itemTitleDMCK = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleCNNgay')
                            itemTitleCNNgay = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleGTV')
                            itemTitleGTV = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleTLN')
                            itemTitleTLN = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleQD')
                            itemTitleQD = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleTLBS')
                            itemTitleTLBS = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleTLXL')
                            itemTitleTLXL = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleSAN')
                            itemTitleSAN = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleTBC')
                            itemTitleTBC = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'LinkTBC')
                            itemLinkTBC = lang === 'EN' ? itemsub.Link : itemsub.Link;
                        if (itemsub.Key == 'TitleTableMCK')
                            itemTitleTableMCK = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        if (itemsub.Key == 'TitleTableTLCV')
                            itemTitleTableTLCV = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                    });
                }
            });
            $('#title-dmck-id').html(itemTitleDMCK);
            
            $('#title-cnngay-id').html(itemTitleCNNgay +
                ' <div class="ptcp-widget w-auto d-inline-block">' +
                '   <div class="">' +
                '       <div class="acbs-dropdown-list cbtt-dropdown ">' +
                '          <select class="acbs-dropdown style2 selectpicker form-control-sm show-tick show-menu-arrow bs-select" id="sl-date" onchange="GetListStock()">' +
                '          </select>' +
                '     </div>' +
                ' </div>' +
                '</div>');
            $('#title-gtv-id').html(itemTitleGTV);
            $('#title-tln-id').html(itemTitleTLN);
            $('#title-qd-id').html(itemTitleQD);
            $('#title-tlbs-id').html(itemTitleTLBS +' Tln >= <strong class="text-primary" id="tlkqbs-id">0%</strong>');
            $('#title-tlxl-id').html(itemTitleTLXL + ' Tln >= <strong class="text-primary" id="tlxl-id">0%</strong>');
            
            
            
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

    $.post(data_api_url + "/public-news-page/get-type-list",function (response) {
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
        GetListStock();
}
var OPJDataFilter;
function GetListStock() {
    $.post(data_api_url + "/public-news-page/get-list-stock", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                
                var html = '';             
                var myDate = [];
                $.map(response.ResponseData, function (item) {
                    myDate.push(item.EventDate);
                });
                var listDate = myDate.filter((v, i, a) => a.indexOf(v) === i);
                $.map(listDate, function (itemDate) {
                    $("#sl-date").append('<option value="' + itemDate + '">' + itemDate + '</option>');
                });

                var dateVL = $("#sl-date").val();
                $('#title-tbc-id').html(
                    ' <ul class="list-inline">' +
                    '    <li class="list-inline-item">' +
                    '        <a href="javascript:void(0);" class="btn btn-file">' + itemTitleTBC + ' ' + dateVL + '</a>' +
                    '    </li>' +
                    '</ul>');
                OPJDataFilter = response.ResponseData.filter(obj => {
                    return obj.EventDate === dateVL;
                });
                
                var myArray = [];
                $.map(OPJDataFilter, function (item) {
                    myArray.push(item.StockExchange);
                });

                if (Array.isArray(OPJDataFilter)) {                  
                       
                        html += '<div class="col-12 col-md-12">                                                                ';
                        html += '    <div class="d-flex justify-content-end align-items-center mb-2">                                ';
                        html += '        <form class="acbs-input-group">                                                                 ';
                    html += '            <input type="text" class="form-control form-control-sm acbs-input" placeholder="Tìm kiếm" id="text-search-id" onkeyup="filterData()" />';
                    html += '            <a class="acbs-input-icon" href="javascript:void(0);" onClick="filterData()">                                              ';
                        html += '                <img src="/Templates/img/icon-search.svg" class="" />                                   ';
                        html += '            </a>                                                                                   ';
                        html += '        </form>                                                                                         ';
                        html += '    </div>                                                                                              ';
                        html += '    <table class="table acbs-table  mb-3">                                                                    ';
                        html += '        <thead class="acbs-table-header">                                                               ';
                        html += '            <tr>                                                                                        ';
                        html += '                <th scope="col" class="w-auto">STT</th>                                                 ';
                        html += '                <th scope="col" class="w-40">' + itemTitleTableMCK+'</th>                                                 ';
                        html += '                <th scope="col" class="w-25">' + itemTitleTableTLCV+'</th>                                         ';
                        html += '                <th scope="col" class="w-25">' + itemTitleSAN+'</th>                                                      ';
                        html += '                <th scope="col" class="w-25"></th>                                                      ';
                        html += '            </tr>                                                                                       ';
                        html += '        </thead>                                                                                        ';
                        html += '        <tbody id="show-search-id">                                                                                         ';
                        var sttNumber = 0;
                    $.map(OPJDataFilter, function (item) {
                        this.console.log(item);
                            sttNumber = sttNumber + 1;
                            html += '            <tr>                                                                                        ';
                            html += '                <td scope="row">' + sttNumber + '</th>                                                                  ';
                            html += '                <td>' + item.StockCode + '</td>                                                                            ';
                            html += '                <td class="rate">' + item.MarginRate + '%</td>                                                               ';
                            html += '                <td>' + item.StockExchange + '</td>                                                               ';
                        html += '                <td class="text-end"><a href="javascript:void(0);" onClick="FillItem(' + item.ReferencePrices + ',' + item.MarginRate + ',' + item.MarginRateAdd + ',' + item.MarginLiquidationRate + ')" class="choose-stock">Chọn</a></td>                                       ';
                            html += '            </tr>                                                                                       ';
                            
                            if (item.AttachFiles != "" && item.AttachFiles != null) {
                                var fileObj = item.AttachFiles != "" ? JSON.parse(item.AttachFiles) : null;
                                var fileLink = fileObj != null ? cdn_url + fileObj[0].Val : "";
                               
                                $('#title-tbc-id').html(
                                    ' <ul class="list-inline">' +
                                    '    <li class="list-inline-item">' +
                                    '        <a href="' + fileLink + '"  download target="_blank" class="btn btn-file">' + itemTitleTBC + ' ' + dateVL+'</a>' +
                                    '    </li>' +
                                    '</ul>');
                            }
                            $("#tlkqbs-id").html(item.MarginRateAdd + '%');
                            $("#tlxl-id").html(item.MarginLiquidationRate + '%');

                        });
                        html += '        </tbody>                                                                                        ';
                        html += '    </table>                                                                                            ';
                        html += '</div>                                                                                                  ';
                };
                $("#list-stock-id").html(html);    
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function FillItem(price, marginrate, marginRateAdd, marginLiquidationRate) {
    $("#gia-id").val(formatToCurrency(price));
    $("#tlcv-id").val(formatToCurrency(marginrate));
    $("input[name=gia-id]").val(price);
    $("input[name=tlcv-id]").val(marginrate);
    $("#tlkqbs-id").html(marginRateAdd + '%');
    $("#tlxl-id").html(marginLiquidationRate + '%');
    $("input[name=tlkqbs-id]").val(marginRateAdd);
    $("input[name=tlxl-id]").val(marginLiquidationRate);
    changeSL();
    changeTN();
}
function changeSL() {
    var gtvVL = 0;
    var sl = $("#slck-id").val();
    $("#slck-id").val(formatPrice(sl));
    var tongsoluong = Number($("#slck-id").val().split(',').join(""));
    $("input[name=slck-id]").val(tongsoluong);
    if (sl.length > 1) {
        gtvVL = tongsoluong * Number($("input[name=gia-id]").val()) * (Number($("input[name=tlcv-id]").val() / 100));
    }
    $("#tong-gtv-id").val(formatPrice(gtvVL));
    $("input[name=tong-gtv-id]").val(gtvVL);
    $("#gtv-id").html('<span class="text-black">= </span>' + formatPrice(gtvVL)+' VND');
}
function changeTN() {
    var tongNoVL = 0;
    var sl = $("#tong-no-id").val();
    $("#tong-no-id").val(formatPrice(sl));
    var tongno = Number($("#tong-no-id").val().split(',').join(""));
    if (sl.length > 1) {
        tongNoVL = (tongno / Number($("input[name=tong-gtv-id]").val())) * 100;
    }
    var tongmath = tongNoVL.toFixed(0);
    $("#tln-id").html(tongmath+'%');
}

function formatPrice(e) {
    e = String(e).split(',').join("");
    var text = String(e).replace(/^0+/, '');
    var l = text.length;
    if (l > 3) {
        var u = l % 3 === 0 ? Math.floor(l / 3) - 1 : Math.floor(l / 3);
        var text_new = text.substr(0, l - u * 3);
        for (let i = u - 1; i >= 0; i--) {
            text_new = text_new + ',' + text.substr(-3 * (i + 1), 3);
        }
        return text_new;
    } else {
        return text;
    }
}

function filterData() {
    if (Array.isArray(OPJDataFilter)) {
        var html = '';
        var textvl = $("#text-search-id").val();
        var OPJData = OPJDataFilter.filter(obj => {
            return textvl === "" || obj.StockCode.toLowerCase().indexOf(textvl.toLowerCase()) !== -1;
        });
        var sttNumber = 0;
        $.map(OPJData, function (item) {
            sttNumber = sttNumber + 1;
            html += '            <tr>                                                                                        ';
            html += '                <td scope="row">' + sttNumber + '</th>                                                                  ';
            html += '                <td>' + item.StockCode + '</td>                                                                            ';
            html += '                <td class="rate">' + item.MarginRate + '%</td>                                                               ';
            html += '                <td>' + item.StockExchange + '</td>                                                               ';
            html += '                <td class="text-end"><a href="javascript:void(0);" onClick="FillItem(' + item.ReferencePrices + ',' + item.MarginRate + ',' + item.MarginRateAdd + ',' + item.MarginLiquidationRate + ')" class="choose-stock">Chọn</a></td>                                       ';
            html += '            </tr>                                                                                       ';
        });
        $("#show-search-id").html(html);

    }
    
}