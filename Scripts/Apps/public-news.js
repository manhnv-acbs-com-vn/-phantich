var CateCode = "RP-FI";
var itemTextTypeReport = "";
var url_string = window.location.href;
var url = new URL(url_string);
var codeUrl = url.searchParams.get("code");
if (codeUrl != null)
    CateCode = codeUrl;

var OPJDataFilter;
renderList();
function renderList(pageIndex = 1, textCateCode = CateCode, textSearch = '', textOrder = 1) {
    var customPageSize = 6;
    CateCode = textCateCode;

    var itemName = "";
    var itemBanner = "";
    var itemTitleFilter = "";
    var itemTextNewFilter = "";
    var itemTextOldFilter = "";
    var itemTextSearchFilter = "";
    var itemBreadCrumb = "";
    var htmlfilter = "";
    var htmlTitle = "";
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
                            itemBreadCrumb = lang === 'EN' ?  itemsub.Name :  itemsub.NameVN;
                        if (itemsub.Key == 'TitleFilter')
                            itemTitleFilter = lang === 'EN' ?  itemsub.Name :  itemsub.NameVN;
                        if (itemsub.Key == 'TextNewFilter')
                            itemTextNewFilter = lang === 'EN' ?  itemsub.Name :  itemsub.NameVN;
                        if (itemsub.Key == 'TextOldFilter')
                            itemTextOldFilter = lang === 'EN' ?  itemsub.Name :  itemsub.NameVN;
                        if (itemsub.Key == 'TextSearchFilter')
                            itemTextSearchFilter = lang === 'EN' ?  itemsub.Name :  itemsub.NameVN;
                        if (itemsub.Key == 'TextTypeReport')
                            itemTextTypeReport = lang === 'EN' ?  itemsub.Name :  itemsub.NameVN;
                    });
                }
            });
            
            htmlTitle += '<section class="page-heading" style="background-image: url(' + itemBanner+')">';
            htmlTitle += '    <div class="container px-4 px-md-3 text-center">                                        ';
            htmlTitle += '        <h1 class="text-white">' + itemName +'</h1>                                       ';
            htmlTitle += '    </div>                                                                                  ';
            htmlTitle += '</section>                                                                                  ';
            htmlTitle += '<div class="acbs-breadcrumb">                                                               ';
            htmlTitle += '    ' + itemBreadCrumb+' ';
            htmlTitle += '</div>                                                                                      ';
            $('#title-id').html(htmlTitle);    

            htmlfilter += '<div class="col-12 col-sm" id="title-type-report">                                                                                                                                                                                                                ';
            htmlfilter += '    <h3 class="h5 mb-0">' + itemTitleFilter+'</h3>                                                                                                                                                                                             ';
            htmlfilter += '</div>                                                                                                                                                                                                                                     ';
            htmlfilter += '<div class="col-12 col-sm-auto font-sm d-flex">                                                                                                                                                                                            ';
            htmlfilter += '    <div class="dropdown text-end align-self-center me-3">                                                                                                                                                                                 ';
            htmlfilter += '    </div>                                                                                                                                                                                                                                 ';
            htmlfilter += '    <form class="acbs-input-group">                                                                                                                                                                                                        ';
            htmlfilter += '        <input type="text" id="text-filter-search" class="form-control form-control-sm acbs-input" placeholder="' + itemTextSearchFilter + '"  onkeyup="filterSearch()" />                                                                                                                                       ';
            htmlfilter += '        <a class="acbs-input-icon" href="javascript:void(0);" onClick="filterSearch()">                                                                                                                                                                                     ';
            htmlfilter += '            <img src="/Templates/img/icon-search.svg" class="" />                                                                                                                                                                          ';
            htmlfilter += '        </a>                                                                                                                                                                                                                          ';
            htmlfilter += '    </form>                                                                                                                                                                                                                                ';
            htmlfilter += '</div>                                                                                                                                                                                                                                     ';
            $('#filter-id').html(htmlfilter);
        }
        else {
            console.log(response.ResponseMessage);
        }
    });

    $.post(data_api_url + "/public-news-page/get-list",
        { pageSize: customPageSize, pageNum: pageIndex, lang: lang, category: CateCode, keyorder: textOrder },
        function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    OPJDataFilter = response.ResponseData;
                    var html = '';
                    var totalCount = 0;
                    var filterData = textSearch != "" ? response.ResponseData.filter(obj => {
                        return obj.ItemName.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1;
                    }) : response.ResponseData;    
                    if (filterData.length <= 0) {
                        html = 'Không tìm thấy kết quả';
                    }
                    $.map(filterData, function (item) {
                        var imgObj = (item.MobileImg != null && item.MobileImg != "") ? JSON.parse(item.MobileImg.toString()):null;
                        var fileObj = item.AttachFiles != null? JSON.parse(item.AttachFiles):null;               
                        var fileLink = fileObj != null ? cdn_url + fileObj[0].Val :"";   
                        var imgLink = imgObj != null ? cdn_url + imgObj.Val : "/Templates/img/tintuc/nacbs-1.png";
                        console.log(item);
                        totalCount = item.TotalRec;

                        html += '<div class="col-12 col-md-6 col-lg-4">                                       ';
                        html += '	<div class="nacbs-item">                                                  ';
                        html += '		<div class="ratio ratio-16x9 position-relative overflow-hidden">      ';
                        html += '			<img src="' + imgLink+'"                                  ';
                        html += '				 class="img-fluid nacbs-img"                                  ';
                        html += '				 loading="lazy" />                                            ';
                        html += '			<a class="nacbs-download" download target="_blank" href="' + fileLink +'"> Tải báo cáo </a>                       ';
                        html += '		</div>                                                                ';
                        html += '                                                                             ';
                        html += '		<div class="mt-3">                                                    ';
                        html += '			<a download target="_blank"  href="' + fileLink +'" class="nacbs-title d-block stretched-link link-dark-blue mb-0">';
                        html += '				' + item.ItemName+'     ';
                        html += '			</a>                                                              ';
                        html += '		</div>                                                                ';
                        html += '		<div class="font-sm mt-2 text-gray-600">' + item.DatetimeCreated+'</div>              ';
                        html += '	</div>                                                                    ';
                        html += '</div>     <iframe id="my_iframe" style="display:none;"></iframe>                                                                  ';
                        
                    });
                    if (pageIndex > 1) {
                        $('#list-news-content').append(html);
                    } else {
                        $('#list-news-content').html(html);
                    }
                    //debugger;
                    var page = pageIndex;
                    var iTotalPage = Math.ceil(totalCount / customPageSize);
                    var iTotalCon = Math.ceil(totalCount - (page * customPageSize));
                    var strHtmlPt = "";
                    //if (iTotalPage > 1) {
                    //    strHtmlPt += "<ul class='pagination justify-content-center'>";
                    //    if (page > 1) {
                    //        strHtmlPt += "<li class='page-item func nav'><a class='page-link' href='javascript:void(0);' onClick='filterCate(\"" + CateCode +"\"," + (parseInt(page) - 1) + ")'><svg xmlns='http://www.w3.org/2000/svg' class='svg-icon' viewBox='0 0 20 20' fill='currentColor'> <path fillRule='evenodd' d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z' clipRule='evenodd' /> </svg></a></li>";
                    //    }

                    //    var iStart = 0, iEnd = 0;
                    //    iStart = (parseInt(page) - 4) <= 1 ? 1 : parseInt(page) - 4;
                    //    iEnd = iStart + 4 >= iTotalPage ? iTotalPage : iStart + 4;
                        
                    //    for (var j = iStart; j <= iEnd; j++)
                    //        strHtmlPt += (parseInt(j) === parseInt(page)) ? "<li class='page-item  active'><a class='page-link' href='javascript:void(0);' onClick='filterCate(\"" + CateCode + "\"," + j + ")'>" + j + "</a></li>" : "<li class='page-item '><a class='page-link' href='javascript:void(0);' onClick='filterCate(\"" + CateCode +"\"," + j + ")'>" + j + "</a></li>";
                    //    strHtmlPt += (parseInt(page) < iTotalPage) ? "<li  class='page-item func nav'><a class='page-link' href='javascript:void(0);' onClick='filterCate(\"" + CateCode +"\"," + (parseInt(page) + 1 >= iTotalPage ? iTotalPage : parseInt(page) + 1) + ")'><svg xmlns='http://www.w3.org/2000/svg' class='svg-icon' viewBox='0 0 20 20' fill='currentColor'> <path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd' /></svg></a></li>" : "";
                    //    strHtmlPt += "</ul>";
                    //}
                    if (iTotalCon > 0) {
                        strHtmlPt += '<div class="mt-4 d-flex flex-column justify-content-center">';
                        strHtmlPt += "    <div class='loadmore-cta loadmore-cta-n-tbacb'  style='cursor: pointer;'  onClick='filterCate(\"" + CateCode + "\"," + (parseInt(page) + 1 >= iTotalPage ? iTotalPage : parseInt(page) + 1) + ")'>";
                        strHtmlPt += '        <span class="stretched-link"></span>';
                        strHtmlPt += '        <div class="icon">';
                        strHtmlPt += '            <img src="/Templates/img/tintuc/icon-more.svg" class="img-fluid">';
                        strHtmlPt += '        </div>';
                        strHtmlPt += '        <div class="conte ms-3">';
                        strHtmlPt += "            <div class='h5 mb-0'><span class='Common_Text_3'>Hiển thị thêm</span></div>";
                        strHtmlPt += '            <div class="fs-12 conte-sub"><span class="Common_Text_4">Còn</span> <strong class="text-dark total-remain-n-tbacb">' + (iTotalCon <= 0 ? "0" : iTotalCon) + '</strong> <span class="Common_Text_5"></span></div>';
                        strHtmlPt += '        </div>';
                        strHtmlPt += '    </div>';
                        strHtmlPt += '</div>';
                    }
                    
                    $("#show-page").html(strHtmlPt);

                    renderTypeList();

                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });
}

function renderTypeList() {
    $.post(data_api_url + "/public-news-page/get-type-list",function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {

                    var jsData = response.ResponseData.filter(obj => {
                        return obj.CategoryCode !== "DMKQ-Thang" && obj.CategoryCode !== "DMKQ-Quy" && obj.CategoryCode !== "DMKQ-Ngay";
                    });
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

                    var jsDataDMKQ = response.ResponseData.filter(obj => {
                        return obj.CategoryCode === "DMKQ-Thang" || obj.CategoryCode === "DMKQ-Quy" || obj.CategoryCode === "DMKQ-Ngay";
                    });
                    var linkDMKQ = '';
                    $.map(jsData, function (item) {
                        var clActive = item.CategoryCode == CateCode ? "active" : "";
                        html += '            <li class="nav-item">                                                                                                                                             ';
                        if (item.CategoryCode === "RP-MP") {
                            html += '<a class="nav-link text-primary fw-bold ' + clActive + ' "  data-bs-toggle="collapse" href="#collapseEx" role="button" aria-expanded="false" aria-controls="collapseEx"  href="javascript:void(0);">' + (lang == "VN" ? item.CategoryNameVN : item.CategoryNameEN) + ' <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></a>';
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
                                html += '            <a href="/cong-bo-thong-tin/' + linkDMKQ+'" class="link-secondary d-block py-1"> ';
                                html += '                ' + (lang == "VN" ? itemDMKQ.CategoryNameVN : itemDMKQ.CategoryNameEN)+'                    ';
                                html += '                    </a>                                    ';
                                html += '        </li>                                               ';

                            });
                            html += '    </ul>                                                   ';
                            html += '</div>                                                      ';

                        } else {
                            html += '<a class="nav-link ' + clActive + ' text-primary fw-bold" aria-current="page"  href="javascript:void(0);" onClick="filterCate(\'' + item.CategoryCode + '\')">' + (lang == "VN" ? item.CategoryNameVN : item.CategoryNameEN) + '</a>                                                                  ';
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
                            htmlMobile += '            <li class="nav-item  have-child ' + clActive + '">                                                                                                                                             ';
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
                                htmlMobile += '            <a href="/cong-bo-thong-tin/' + linkDMKQ + '" target="_blank" class="link-secondary sidebar-second-link d-block py-1 fw-bold"> ';
                                htmlMobile += '                ' + (lang == "VN" ? itemDMKQ.CategoryNameVN : itemDMKQ.CategoryNameEN) + '                    ';
                                htmlMobile += '                    </a>                                    ';
                                htmlMobile += '        </li>                                               ';

                            });
                            htmlMobile += '    </ul>                                                   ';
                            htmlMobile += '</div>                                                      ';
                            htmlMobile += '</li>                                                                                                                                                             ';

                        } else {
                            
                            htmlMobile += '            <li class="nav-item ' + clActive + '">                                                                                                                                             ';
                            htmlMobile += '<a class="nav-link fw-bold sidebar-first-link text-primary ' + clActive + '"  aria-current="page" href="javascript:void(0);"  onClick="filterCate(\'' + item.CategoryCode + '\')">' + (lang == "VN" ? item.CategoryNameVN : item.CategoryNameEN) + ' </a>';                                                               
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
}


function filterSearch() {
    var textSearchval = $("#text-filter-search").val();
    console.log(textSearchval + "" + CateCode);

    if (Array.isArray(OPJDataFilter)) {
        var html = '';
        var totalCount = 0;
        var filterData = textSearchval != "" ? OPJDataFilter.filter(obj => {
            return obj.ItemName.toLowerCase().indexOf(textSearchval.toLowerCase()) !== -1;
        }) : OPJDataFilter;
        if (filterData.length <= 0) {
            html = 'Không tìm thấy kết quả';
        }
        $.map(filterData, function (item) {
            var imgObj = item.MobileImg != "" ? JSON.parse(item.MobileImg.toString()) : null;
            var fileObj = item.AttachFiles != "" ? JSON.parse(item.AttachFiles) : null;
            var fileLink = fileObj != null ? cdn_url + fileObj[0].Val : "";
            var imgLink = imgObj != null ? cdn_url + imgObj.Val : "/Templates/img/tintuc/nacbs-1.png";

            totalCount = item.TotalRec;

            html += '<div class="col-12 col-md-6 col-lg-4">                                       ';
            html += '	<div class="nacbs-item">                                                  ';
            html += '		<div class="ratio ratio-16x9 position-relative overflow-hidden">      ';
            html += '			<img src="' + imgLink + '"                                  ';
            html += '				 class="img-fluid nacbs-img"                                  ';
            html += '				 loading="lazy" />                                            ';
            html += '			<a class="nacbs-download" download target="_blank" href="' + fileLink + '"> Tải báo cáo </a>                       ';
            html += '		</div>                                                                ';
            html += '                                                                             ';
            html += '		<div class="mt-3">                                                    ';
            html += '			<a  download target="_blank" href="' + fileLink + '" class="nacbs-title d-block stretched-link link-dark-blue mb-0">';
            html += '				' + item.ItemName + '     ';
            html += '			</a>                                                              ';
            html += '		</div>                                                                ';
            html += '		<div class="font-sm mt-2 text-gray-600">' + item.DatetimeCreated + '</div>              ';
            html += '	</div>                                                                    ';
            html += '</div>     <iframe id="my_iframe" style="display:none;"></iframe>                                                                  ';

        });
        $('#list-news-content').html(html);

        var page = 1;
        var iTotalPage = Math.ceil(totalCount / 6);
        var iTotalCon = Math.ceil(totalCount - (page * 6));
        var strHtmlPt = "";
        //if (iTotalPage > 1) {
        //    strHtmlPt += "<ul class='pagination justify-content-center'>";
        //    if (page > 1) {
        //        strHtmlPt += "<li class='page-item func nav'><a class='page-link' href='javascript:void(0);' onClick='filterCate(\"" + CateCode +"\"," + (parseInt(page) - 1) + ")'><svg xmlns='http://www.w3.org/2000/svg' class='svg-icon' viewBox='0 0 20 20' fill='currentColor'> <path fillRule='evenodd' d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z' clipRule='evenodd' /> </svg></a></li>";
        //    }
        //    for (var j = 1; j <= iTotalPage; j++)
        //        strHtmlPt += (parseInt(j) === parseInt(page)) ? "<li class='page-item  active'><a class='page-link' href='javascript:void(0);' onClick='filterCate(\"" + CateCode + "\"," + j + ")'>" + j + "</a></li>" : "<li class='page-item '><a class='page-link' href='javascript:void(0);' onClick='filterCate(\"" + CateCode +"\"," + j + ")'>" + j + "</a></li>";
        //    strHtmlPt += (parseInt(page) < iTotalPage) ? "<li  class='page-item func nav'><a class='page-link' href='javascript:void(0);' onClick='filterCate(\"" + CateCode +"\"," + (parseInt(page) + 1 >= iTotalPage ? iTotalPage : parseInt(page) + 1) + ")'><svg xmlns='http://www.w3.org/2000/svg' class='svg-icon' viewBox='0 0 20 20' fill='currentColor'> <path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd' /></svg></a></li>" : "";
        //    strHtmlPt += "</ul>";
        //}                                                                                                                                                                                                           

        if (iTotalCon > 0 && textSearchval == "") {
            strHtmlPt += '<div class="mt-4 d-flex flex-column justify-content-center">';
            strHtmlPt += "    <div class='loadmore-cta loadmore-cta-n-tbacb'  style='cursor: pointer;'  onClick='filterCate(\"" + CateCode + "\"," + (parseInt(page) + 1 >= iTotalPage ? iTotalPage : parseInt(page) + 1) + ")'>";
            strHtmlPt += '        <span class="stretched-link"></span>';
            strHtmlPt += '        <div class="icon">';
            strHtmlPt += '            <img src="/Templates/img/tintuc/icon-more.svg" class="img-fluid">';
            strHtmlPt += '        </div>';
            strHtmlPt += '        <div class="conte ms-3">';
            strHtmlPt += "            <div class='h5 mb-0'><span class='Common_Text_3'>Hiển thị thêm</span></div>";
            strHtmlPt += '            <div class="fs-12 conte-sub"><span class="Common_Text_4">Còn</span> <strong class="text-dark total-remain-n-tbacb">' + (iTotalCon <= 0 ? "0" : iTotalCon) + '</strong> <span class="Common_Text_5"></span></div>';
            strHtmlPt += '        </div>';
            strHtmlPt += '    </div>';
            strHtmlPt += '</div>';
        }

        $("#show-page").html(strHtmlPt);


    }
}



function filterCate(cate,page=1) {
    var textSearchval = $("#text-filter-search").val();
    renderList(page, cate, textSearchval, 1)
}


