var tagsIndex = [1, 1];

function initPage() {

    var tag = $('#tagIndex').val();

    renderList('N-TBACB');
    renderList('N-TDN');
    //renderListEvent('N-TDN');

    var langKeys = ['AnalysisCenter_Text_10', 'NewsEvent_Text_1', 'Common_Text_2', 'AnalysisCenter_Text_22', 'AnalysisCenter_Text_23', 'NewsEvent_Text_2', 'NewsEvent_Text_3', 'Common_Text_3', 'Common_Text_4', 'Common_Text_5'];
    loadDefaultLanguage(langKeys);

    actionDirectTag(tag);
}

function renderList(caregory = 'N-TBACB', pageIndex = 1, isReset = false) {
    var customPageSize = 4;
    $.post(data_api_url + "/news/filter",
        { Category: caregory, pageSize: customPageSize, pageNum: pageIndex, lang: lang },
        function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var html = '';
                    var totalRemain = 0;
                    $.map(response.ResponseData, function (item) {
                        var imgLink = '/Templates/img/tintuc/nacbs-1.png';
                        try {
                            var imgObj = JSON.parse(item.MobileImg.toString());
                            imgLink = cdn_url + imgObj.Val;
                        }
                        catch (err) {
                            console.log(err);
                        }
                        if (item.TotalRec >= customPageSize * pageIndex) {
                            totalRemain = (item.TotalRec * 1) - (customPageSize * pageIndex);
                        }
                        html += '<div class="col-12 col-md-6 col-lg-4 col-xl-3">';
                        html += '    <div class="nacbs-item">';
                        html += '        <div class="ratio ratio-16x9 position-relative">';
                        html += '            <img src="' + imgLink + '" class="img-fluid nacbs-img" loading="lazy" />';
                        html += '             <div>';
                        html += '                  <div class="nacbs-time">';
                        if (item.IsNew) {
                            html += '                     <span class="tag-red tag me-1">' + showLang('AnalysisCenter_Text_10') + '</span>';
                        }
                        html += '                   ' + item.CreatedTime + '';
                        html += '               </div>';

                        html += '                <div class="nacbs-date">';
                        html += '                     <div class="h1 mb-0 fw-bold text-primary">';
                        html += '                       ' + item.NewsIndex + '';
                        html += '                  </div>';
                        html += '                ' + item.CreatedMonth + '';
                        html += '             </div>';
                        html += '         </div>';
                        html += '      </div>';
                        html += '      <div class="mt-3">';
                        html += '           <a href="' + item.SeoURL + '" class="nacbs-title d-block stretched-link link-dark-blue mb-0">';
                        html += '               ' + item.ItemName + '';
                        html += '           </a>';
                        html += '       </div>';
                        html += '   </div>';
                        html += '</div>';
                    });
                    if (isReset) {
                        $('#news-content-' + caregory.toLowerCase()).html(html);
                        tagsIndex[0] = 1;
                    }
                    else {
                        $('#news-content-' + caregory.toLowerCase()).append(html);
                    }
                    if (totalRemain > 0) {
                        $('.loadmore-cta-' + caregory.toLowerCase()).show();
                    }
                    else {
                        $('.loadmore-cta-' + caregory.toLowerCase()).hide();
                    }
                    $('.total-remain-' + caregory.toLowerCase()).html(totalRemain);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });
}

function renderListEvent(caregory = 'N-TDN', pageIndex = 1, isReset = false) {
    var customPageSize = 4;
    $.post(data_api_url + "/news/filter",
        { Category: caregory, pageSize: customPageSize, pageNum: pageIndex, lang: lang },
        function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var html = '';
                    var totalRemain = 0;
                    $.map(response.ResponseData, function (item) {
                        var imgLink = '/Templates/img/tintuc/nacbs-1.png';
                        try {
                            var imgObj = JSON.parse(item.MobileImg.toString());
                            imgLink = cdn_url + imgObj.Val;
                        }
                        catch (err) {
                            console.log(err);
                        }
                        if (item.TotalRec >= customPageSize * pageIndex) {
                            totalRemain = (item.TotalRec * 1) - (customPageSize * pageIndex);
                        }

                        html += '<div class="col-12 col-md-6 col-lg-4 col-xl-3">';
                        html += '    <div class="nacbs-item">';
                        html += '        <div class="ratio ratio-16x9 position-relative">';
                        html += '            <img src="' + imgLink + '" class="img-fluid nacbs-img" loading="lazy" />';
                        html += '            <div>';
                        html += '               <div class="nacbs-time">';
                        if (item.IsNew) {
                            html += '                     <span class="tag-red tag me-1">' + showLang('AnalysisCenter_Text_10') + '</span>';
                        }
                        html += '                   ' + item.CreatedTime + '';
                        html += '              </div>';
                        html += '          </div>';
                        html += '           <div class="mt-2 right-tag">';
                        if (item.SubCategoryName !== '') {
                            html += '             <span class="tag tag-green">' + item.SubCategoryName + '</span>';
                        }
                        html += '           </div>';
                        html += '    </div>';

                        html += '      <div class="mt-3">';
                        html += '          <a href="' +  item.SeoURL + '" class="nacbs-title d-block stretched-link link-dark-blue mb-0">';
                        html += '            ' + item.ItemName + '';
                        html += '          </a>';
                        html += '       <div class="news-date">' + item.DatetimeCreated + '</div>';
                        html += '      </div>';
                        html += '  </div>';
                        html += ' </div>';
                    });
                    if (isReset) {
                        $('#news-content-' + caregory.toLowerCase()).html(html);
                        tagsIndex[0] = 1;
                    }
                    else {
                        $('#news-content-' + caregory.toLowerCase()).append(html);
                    }
                    if (totalRemain > 0) {
                        $('.loadmore-cta-n-tdn').show();
                    }
                    else {
                        $('.loadmore-cta-n-tdn').hide();
                    }
                    $('.total-remain-' + caregory.toLowerCase()).html(totalRemain);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });
}


function loadMore(groupCode) {
    var currentIndex = tagsIndex[0];
    if (groupCode === 'N-TBACB') {
        currentIndex = tagsIndex[0] + 1;
        tagsIndex[0] = currentIndex;
        renderList(groupCode, currentIndex);
    }
    else if (groupCode === 'N-TDN') {
        currentIndex = tagsIndex[1] + 1;
        tagsIndex[1] = currentIndex;
        renderListEvent(groupCode, currentIndex);
    }
    else { }
}

///////////////////////////////////////////////////////// Start Action ////////////////////////////////////////////////////////////////////////////////////////////

function actionDirectTag(tag) {

    //console.log(tag);

    $('.nav-link').removeClass('active');
    $('#nav-link-' + tag).addClass('active');

    $('.tab-pane').removeClass('active');
    $('#navlink' + tag).addClass('active');
    $('#navlink' + tag).addClass('show');
}

///////////////////////////////////////////////////////// End Action //////////////////////////////////////////////////////////////////////////////////////////////