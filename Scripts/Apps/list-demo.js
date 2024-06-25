function initPage() {
    var langKeys = ['Common_Text_2', 'Common_Text_3', 'Common_Text_4', 'Common_Text_5', 'Common_Text_7', 'Recruitment_Text_38', 'Recruitment_Text_40', 'Recruitment_Text_41', 'Recruitment_Text_67', 'Recruitment_Text_68'];
    loadDefaultLanguage(langKeys);
    renderList(1, false);
}

function renderList(pageIndex = 1, isReset = false, isSearch = false) {
    var customPageSize = 8;
    if (isReset) {
        $('#acbsAccordion').html('');
    }
    $.post(data_api_url + "/list-demo/filter",
        { pageSize: customPageSize, pageNum: pageIndex, lang: lang },
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

function loadMore() {
    currentIndex++;
    renderList(currentIndex, false);
}