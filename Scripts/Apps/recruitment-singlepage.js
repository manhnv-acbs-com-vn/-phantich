function initPage() {
    renderSearchForm();
    var langKeys = ['Common_Text_2', 'Common_Text_3', 'Common_Text_4', 'Common_Text_5', 'Common_Text_7', 'Recruitment_Text_3', 'Recruitment_Text_4', 'Recruitment_Text_5', 'Recruitment_Text_6', 'Recruitment_Text_11', 'Recruitment_Text_12', 'Recruitment_Text_14', 'Recruitment_Text_15', 'Recruitment_Text_16', 'Recruitment_Text_17', 'Recruitment_Text_18', 'Recruitment_Text_19', 'Recruitment_Text_20'];
    loadDefaultLanguage(langKeys);

    renderLastest();
    renderBlogRelatest();
}

function renderSearchForm() {

    $('#SearchVal').attr('placeholder', showLang('Recruitment_Text_7'));
    $('#SearchLocation').attr('placeholder', showLang('Recruitment_Text_8'));
    $('#SearchDepartment').attr('placeholder', showLang('Recruitment_Text_9'));

    $('#SearchLocation')
        .append($("<option></option>")
            .attr("value", "")
            .text(showLang("AnalysisCenter_Combobox_1")));

    $('#SearchDepartment')
        .append($("<option></option>")
            .attr("value", "")
            .text(showLang("AnalysisCenter_Combobox_1")));
    
    var htmlMain = '', htmlSub = '';
    $.post(data_api_url + "/categories/category-bycode",
        { categoryGroup: 'Recruitment_Location' }
        , function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {

                    $.map(response.ResponseData, function (item) {
                        var itemName = lang === 'EN' ? item.CategoryNameEN : item.CategoryNameVN;
                        $('#SearchLocation')
                            .append($("<option></option>")
                                .attr("value", item.CategoryCode)
                                .text(itemName));

                        // show rignt bar
                        if (item.CategoryCode.includes('MAIN')) {
                            htmlMain += '<li>';
                            htmlMain += '    <a href="#" class="mb-1 d-inline-block" onclick="clickLocation(this);" item-name="' + itemName + '" item-code="' + item.CategoryCode + '">' + itemName + ' (' + item.TotalItem  + ' ' + showLang('Recruitment_Text_69') + ')</a>';
                            htmlMain += '</li>';
                        }
                        else {
                            htmlSub += '<li>';
                            htmlSub += '    <a href="#" class="mb-1 d-inline-block" onclick="clickLocation(this);" item-name="' + itemName + '" item-code="' + item.CategoryCode + '">' + itemName + ' (' + item.TotalItem + ' ' + showLang('Recruitment_Text_69') + ')</a>';
                            htmlSub += '</li>';
                        }
                    });
                    $('.main-location').html(htmlMain);
                    $('.sub-location').html(htmlSub);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });

    $.post(data_api_url + "/categories/category-bycode",
        { categoryGroup: 'Recruitment_Department' }
        , function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    $.map(response.ResponseData, function (item) {
                        var itemName = lang === 'EN' ? item.CategoryNameEN : item.CategoryNameVN;
                        $('#SearchDepartment')
                            .append($("<option></option>")
                                .attr("value", item.CategoryCode)
                                .text(itemName));
                    });
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });

    $.post(data_api_url + "/categories/category-bycode",
        { categoryGroup: 'Recruitment_JobTitle' }
        , function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var htmlJobTitle = '';
                    $.map(response.ResponseData, function (item) {
                        var itemName = lang === 'EN' ? item.CategoryNameEN : item.CategoryNameVN;
                        htmlJobTitle += '<a href="#tab" class="me-3 mb-1" onclick="clickTab(this);" tabVal="' + item.CategoryCode + '" tabName="' + itemName + '">' + itemName + '</a>';
                    });
                    $('.relevant-position-list').html(htmlJobTitle);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });
}

function clickSearch(title, titlename, locationCode = '') {
    var searchVal = $('#SearchVal').val();
    var location = locationCode == '' ? $('#SearchLocation').val() : locationCode;
    var department = $('#SearchDepartment').val();

    var searchObj = {
        searchval: searchVal,
        location: location,
        department: department,
        title: title,
        titlename: titlename
    }

    var encryptCode = base64encode(JSON.stringify(searchObj));

    window.location.href  = '/tuyen-dung-' + encryptCode;
}

function clickTab(mythis) {
    var title = $(mythis).attr('tabVal');
    var titlename = $(mythis).attr('tabName');
    clickSearch(title, titlename);
}

function clickLocation(mythis) {
    var locationCode = $(mythis).attr('item-code');
    clickSearch('', '', locationCode);
}

function renderLastest() {
    $.post(data_api_url + "/recruitment/lastest",
        {  lang: lang },
        function (response) {
            console.log(response);
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var html = '<h3 class="h5 mt-5 mt-lg-2">' + showLang('Recruitment_Text_70') + '</h3>';
                    //html += '<h3 class="h5 mt-5 mt-lg-2">Công việc mới nhất</h3>';
                    $.map(response.ResponseData, function (item) {

                        var locations = JSON.parse(item.JsLocation);
                        var strLocation = '';
                        $.map(locations, function (lo) {
                            var loName = lang === 'VN' ? lo.NameVN : lo.Name;
                            strLocation += strLocation === '' ? loName : ', ' + loName;
                        });

                        html += '<div class="jobs-item py-4 px-4">';
                        html += '    <a href="' + item.SeoURL + '" class="acbs-recruit-title w-lg-auto d-inline-block mb-2 mb-lg-0">' + item.ItemName + '</a>';
                        if (item.IsHot) {
                            html += '   <span class="highlight-news ms-sm-2">' + showLang('Recruitment_Text_13') + '</span>';
                        }
                        html += '   <div class="d-flex flex-column flex-lg-row align-items-baseline align-items-lg-center mt-3">';
                        html += '      <div class="job-overview-detail mb-2 mb-lg-0">';
                        html += '       <img src="/Templates/img/Export/tuyendung-chitiet-icon-calendar.svg">';
                        html += '      <span class="ms-2">' + showLang('Recruitment_Text_10') + ' ' + item.ExpDate + '</span>';
                        html += '     </div>';

                        html += '       <div class="job-overview-detail mb-2 mb-lg-0 ms-lg-3">';
                        html += '      <img src="/Templates/img/Export/tuyendung-chitiet-icon-money.svg">';
                        if (item.SalaryFrom == 0 || item.SalaryTo == 0) {
                            html += '     <span class="ms-2">' + showLang('Recruitment_Text_23') + '</span>';
                        }
                        else {
                            html += '     <span class="ms-2">' + formatToCurrency(item.SalaryFrom) + ' - ' + formatToCurrency(item.SalaryTo) + ' ' + item.SalaryCurrency + '</span>';
                        }
                        html += '   </div>';

                        html += '     <div class="job-overview-detail mb-2 mb-lg-0 ms-lg-3">';
                        html += '        <img src="/Templates/img/Export/tuyendung-chitiet-icon-location.svg">';
                        html += '        <span class="ms-2">' + strLocation + '</span>';
                        html += '    </div>';
                        html += '   </div>';
                        html += ' </div>';
                    });
                    $('#lastest-job').html(html);
                }
            }
        }
    )
}

function renderBlogRelatest() {
    $.post(data_api_url + "/recruitment-blog/related",
        { category: 'R-MTLV', lang: lang }
        , function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var html_mtlv = '';
                    $.map(response.ResponseData, function (item) {

                        var imgLink = '';
                        try {
                            imgObj = JSON.parse(item.MobileImg);
                            imgLink = cdn_url + imgObj.Val;
                        }
                        catch (err) {
                            console.log(err);
                        }

                        html_mtlv += '<div class="col-12 col-lg-4 mb-4 mb-lg-0">';
                        html_mtlv += '    <a href="' + item.SeoURL + '" class="d-block position-relative">';
                        html_mtlv += '       <img src="' + imgLink + '" style="width:417px; height: 231px;" />';
                        html_mtlv += '           <div class="h6 mb-0 mt-3 text-black-dark">';
                        html_mtlv += '               ' + item.ItemName + '';
                        html_mtlv += '          </div>';
                        html_mtlv += '        <div class="news-date">' + item.DatetimeCreated + '</div>';
                        html_mtlv += '     </a>';
                        html_mtlv += '</div>';
                    });
                    $('.mtlv').html(html_mtlv);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });

    $.post(data_api_url + "/recruitment-blog/related",
        { category: 'R-GTTS', lang: lang }
        , function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var html_gtts = '';
                    $.map(response.ResponseData, function (item) {
                        var img = JSON.parse(item.MobileImg);
                        html_gtts += '<div class="col-12 col-lg-4 mb-4 mb-lg-0">';
                        html_gtts += '    <a href="' + item.SeoURL + '" class="d-block position-relative">';
                        html_gtts += '       <img src="' + cdn_url + img.Val + '" style="width:417px; height: 231px;" />';
                        html_gtts += '           <div class="h6 mb-0 mt-3 text-black-dark">';
                        html_gtts += '               ' + item.ItemName + '';
                        html_gtts += '          </div>';
                        html_gtts += '        <div class="news-date">' + item.DatetimeCreated + '</div>';
                        html_gtts += '     </a>';
                        html_gtts += '</div>';
                    });
                    $('.gtts').html(html_gtts);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });
}