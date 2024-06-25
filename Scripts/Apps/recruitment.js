var currentIndex = 1;
var searchTabs = [];
function initPage() {
    var searchval = $('#searchval').val();
    var location = $('#location').val();
    var department = $('#department').val();
    var title = $('#title').val();
    var titlename = $('#titlename').val();

    if (searchval != '' || location != '' || department != '' || title != '' || titlename != '') {
        renderList(searchval, location, department, title, 1, true, true);
    }
    else {
        renderList(searchval, location, department, title, 1, false);
    }
    renderSearchForm(searchval, location, department, title, titlename);
    var langKeys = ['Common_Text_2', 'Common_Text_3', 'Common_Text_4', 'Common_Text_5', 'Common_Text_7', 'Recruitment_Text_38', 'Recruitment_Text_40', 'Recruitment_Text_41', 'Recruitment_Text_67', 'Recruitment_Text_68'];
    loadDefaultLanguage(langKeys);
}

function renderList(searchVal = '', locationCode = '', departmentCode = '', jobTitleCode = '', pageIndex = 1, isReset = false, isSearch = false) {
    var customPageSize = 8;
    if (isReset) {
        $('#acbsAccordion').html('');
    }
    $.post(data_api_url + "/recruitment/filter",
        { searchVal: searchVal, locationCode: locationCode, departmentCode: departmentCode, jobTitleCode: jobTitleCode,  pageSize: customPageSize, pageNum: pageIndex, lang: lang },
        function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var html = '';
                    var totalRemain = 0;
                    var totalRec = 0;
                    $.map(response.ResponseData, function (item) {
                        var locations = JSON.parse(item.JsLocation);
                        var strLocation = '';
                        $.map(locations, function (lo) {
                            var loName = lang === 'VN' ? lo.NameVN : lo.Name;
                            strLocation += strLocation === '' ? loName : ', ' + loName;
                        });
                        if (item.TotalRec >= customPageSize * pageIndex) {
                            totalRemain = (item.TotalRec * 1) - (customPageSize * pageIndex);
                        }
                        totalRec = item.TotalRec;
                        var skills = JSON.parse(item.JsSkill);
                        var uri = cdn_url + item.ItemContent;

                        html += '<div class="accordion-item">';
                        html += '    <div class="accordion-button collapsed py-4 px-3 pe-5" type="button" data-bs-toggle="collapse"';
                        html += '        data-bs-target="#collapse-' + item.ItemID + '" aria-expanded="true" aria-controls="collapse-1">';
                        html += '       <a href="" class="acbs-recruit-title">' + item.ItemName + '</a>';
                        html += '       <div class="job-overview-list mt-3">';
                        html += '            <div class="job-overview-detail">';
                        html += '              <img src="/Templates/img/Export/tuyendung-chitiet-icon-calendar.svg">';
                        html += '                 <span class="ms-2"> ' + showLang('Recruitment_Text_10') + ' ' + item.ExpDate + '</span>';
                        html += '            </div>';

                        html += '                <div class="job-overview-detail">';
                        html += '                  <img src="/Templates/img/Export/tuyendung-chitiet-icon-money.svg">';
                        if (item.SalaryFrom == 0 || item.SalaryTo == 0) {
                            html += '                       <span class="ms-2">' + showLang('Recruitment_Text_23') + '</span>';
                        }
                        else {
                            html += '                       <span class="ms-2">' + formatToCurrency(item.SalaryFrom) + ' - ' + formatToCurrency(item.SalaryTo) + ' ' + item.SalaryCurrency + '</span>';
                        }
                        html += '             </div>';

                        html += '                   <div class="job-overview-detail ms-3">';
                        html += '                       <img src="/Templates/img/Export/tuyendung-chitiet-icon-location.svg">';
                        html += '                           <span class="ms-2">' + strLocation + '</span>';
                        html += '               </div>';
                        html += '                   </div>';
                        html += '                </div>';
                        html += '                 <div id="collapse-' + item.ItemID + '" class="accordion-collapse collapse" data-bs-parent="#acbsAccordion">';
                        html += '                 <div class="accordion-body py-3 pb-4 px-3">';
                        html += '                    <div class="required-skill pb-4">';
                        html += '                          <b class="required-skill-title">' + showLang('Recruitment_Text_22') + ':</b>';
                        $.map(skills, function (s) {
                            var skillName = lang === 'VN' ? s.NameVN : s.Name;
                            html += '                           <span>' + skillName + '</span>';
                        });
                        html += '                        </div>';
                        html += '                      <div class="soju__prose article-maxWidth">';
                        html += '                          <h3>' + showLang('Recruitment_Text_34') + '</h3>';
                        html += '                          <div>';
                        html += '                            ' + readContent(item.ItemDescription) + '';
                        html += '                          </div>';
                        html += '                           <a href="' + item.SeoURL + '" class="btn w-100 btn-primary-2 fw-bold">';
                        html += '                             ' + showLang('Recruitment_Text_72') + '';
                        html += '                           </a>';
                        html += '                      </div>';
                        html += '                 </div>';
                        html += '              </div>';
                        html += '         </div>';
                        console.log(item.ItemContent);
                        console.log(readContent(item.ItemContent));
                    });
                    if (isReset) {
                        $('#acbsAccordion').html(html);
                        currentIndex = 1;
                    }
                    else {
                        $('#acbsAccordion').append(html);
                    }
                    if (totalRemain > 0) {
                        $('.loadmore-cta').show();
                    }
                    else {
                        $('.loadmore-cta').hide();
                    }
                    $('.total-remain').html(totalRemain);
                    if (isSearch) {
                        $('.search-result-display').show();
                    }
                    else {
                        $('.search-result-display').hide();
                    }
                    $('.total-result').html(totalRec);
                }
            }
            else {
                $('.loadmore-cta').hide();
                console.log(response.ResponseMessage);
            }
        });
}

function renderSearchForm(searchval, location, department, titleCode, titleName) {

    $('#SearchVal').attr('placeholder', showLang('Recruitment_Text_7'));
    $('#SearchLocation').attr('placeholder', showLang('Recruitment_Text_8'));
    $('#SearchDepartment').attr('placeholder', showLang('Recruitment_Text_9'));
    $('#EmailRegister').attr('placeholder', showLang('Recruitment_Text_39'));

    $('#SearchVal').val(searchval);

    $('#SearchLocation')
        .append($("<option></option>")
            .attr("value", "")
            .text(showLang("AnalysisCenter_Combobox_1")));

    $('#SearchDepartment')
        .append($("<option></option>")
            .attr("value", "")
            .text(showLang("AnalysisCenter_Combobox_1")));

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
                });

                $('#SearchLocation').val(location).trigger('change');
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

                    $('#SearchDepartment').val(department).trigger('change');
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

    if (title != '') {
        var tabSelect = {
            code: titleCode,
            name: titleName
        }
        if (titleCode != '') {
            addTabs(tabSelect);
            renderSearchTabs();
        }
    }
}

function loadMore() {
    currentIndex++;
    renderList('', '', '', '', currentIndex, false);
}

function clickTab(mythis) {
    var tabCode = $(mythis).attr('tabVal');
    var tabName = $(mythis).attr('tabName');
    var searchVal = $('#SearchVal').val();
    var location = $('#SearchLocation').val();
    var department = $('#SearchDepartment').val();

    if (searchTabs.indexOf(tabName) == -1) {
        var tabSelect = {
            code: tabCode,
            name: tabName
        }
        addTabs(tabSelect);
        renderSearchTabs();
    }
    var tabAll = '';
    $.map(searchTabs, function (tab) {
        tabAll += tabAll == '' ? tab.code : ',' + tab.code;
    })
    renderList(searchVal, location, department, tabAll, 1, true, true);
}

function clickSearch() {
    var searchVal = $('#SearchVal').val();
    var location = $('#SearchLocation').val();
    var department = $('#SearchDepartment').val();
    renderList(searchVal, location, department, '', 1, true, true);
}

function addTabs(tabSelect) {
    var isExists = false;
    $.map(searchTabs, function (tab) {
        if (tab.code == tabSelect.code) {
            isExists = true;
        }
    });
    if (!isExists) {
        searchTabs.push(tabSelect);
    }
}

function removeTab(mythis) {
    var searchVal = $('#SearchVal').val();
    var location = $('#SearchLocation').val();
    var department = $('#SearchDepartment').val();
    var tabCode = $(mythis).attr('tabCode');
    for (var i = 0; i < searchTabs.length; i++) {
        if (searchTabs[i].code == tabCode) {
            searchTabs.splice(i, 1);
        }
    }
    renderSearchTabs();
    var tabAll = '';
    $.map(searchTabs, function (tab) {
        tabAll += tabAll == '' ? tab.code : ',' + tab.code;
    })
    renderList(searchVal, location, department, tabAll, 1, true, true);
}

function removeAllTab() {
    var searchVal = $('#SearchVal').val();
    var location = $('#SearchLocation').val();
    var department = $('#SearchDepartment').val();
    searchTabs = [];
    renderSearchTabs();
    renderList(searchVal, location, department, '', 1, true, true);
}

function renderSearchTabs() {
    var htmlTabSearch = '';
    $.map(searchTabs, function (tab) {
        htmlTabSearch += '<li class="me-0 me-lg-2 mb-3 mb-lg-0">';
        htmlTabSearch += '        <div class="search-result-display-item">';
        htmlTabSearch += '           ' + tab.name + '';
        htmlTabSearch += '           <button class="search-result-display-item-close-btn px-0" onclick="removeTab(this);" tabCode="' + tab.code + '">';
        htmlTabSearch += '             <img src="/Templates/img/Export/searh-result-close-btn.svg">';
        htmlTabSearch += '          </button>';
        htmlTabSearch += '      </div>';
        htmlTabSearch += '    </li>';
    });
    if (searchTabs.length > 0) {
        htmlTabSearch += '    <li>';
        htmlTabSearch += '      <button class="delete-all-search-result" onclick="removeAllTab();">';
        htmlTabSearch += '          Xóa tất cả';
        htmlTabSearch += '       </button>';
        htmlTabSearch += '   </li>';
    }
    $('#tabSearch').html(htmlTabSearch);
}

function receiverInfo() {
    var emailAddress = $('#EmailRegister').val();
    if (emailAddress == '' || !ValidateEmail(emailAddress)) {
        return false;
    }
    $.post(data_api_url + "/recruitment/receiver-info",
        { emailAddress: emailAddress }
        , function (response) {
            console.log(response);
            if (Array.isArray(response.ResponseData)) {
                var obj = response.ResponseData[0];
                if (obj.Code == '00') {
                    $('.receiver-email-success').show();
                }
                else {
                    $('.receiver-email-success').hide();
                }
            }
        });
}

function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
        return true;
    }
    else {
        return false;
    }
}