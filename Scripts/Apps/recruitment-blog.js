var tagIndex = 1;
function initPage() {
    var tagVal = $('#tagIndex').val() == 1 ? 'R-MTLV' : 'R-GTTS';
    var breadcrumb_link = '';
    if ($('#tagIndex').val() == 1) {
        breadcrumb_link = '<a href="/blog-tuyen-dung/moi-truong-lam-viec-acbs" class="link-dark-blue">' + showLang('Recruitment_Text_2') + '</a>';
    }
    else {
        breadcrumb_link = '<a href="/blog-tuyen-dung/goc-thuc-tap-sinh" class="link-dark-blue">' + showLang('Recruitment_Text_3') + '</a>';
    }
    $('.breadcrumb-item-link').html(breadcrumb_link);

    renderList(tagVal);
    renderCategory('R-MTLV');
    renderCategory('R-GTTS');

    var langKeys = ['Common_Text_1', 'Common_Text_2', 'Common_Text_3', 'Common_Text_4', 'Common_Text_5', 'Common_Text_6', 'Recruitment_Text_1', 'Recruitment_Text_2', 'Recruitment_Text_3'];
    loadDefaultLanguage(langKeys);
}

function renderList(category = '', pageIndex = 1) {
    var customPageSize = 6;
    $.post(data_api_url + "/recruitment-blog/filter",
        { Category: category, pageSize: customPageSize, pageNum: pageIndex, lang: lang },
        function (response) {
            console.log(response);
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var html = '';
                    var totalRemain = 0;
                    $.map(response.ResponseData, function (item) {
                        var imgLink = '/Templates/img/tintuc/nacbs-1.png';
                        try {
                            imgObj = JSON.parse(item.MobileImg.toString());
                            imgLink = cdn_url + imgObj.Val;
                        }
                        catch (err) {
                            console.log(err);
                        }

                        if (item.TotalRec >= customPageSize * pageIndex) {
                            totalRemain = (item.TotalRec * 1) - (customPageSize * pageIndex);
                        }

                        html += '<div class="col-12 col-lg-6 col-xl-4">';
                        html += '     <div class="nacbs-item">';
                        html += '         <div class="ratio ratio-16x9 position-relative">';
                        html += '            <img src="' + imgLink + '" class="img-fluid nacbs-img" loading="lazy" />';
                        html += '            <div>';
                        html += '                <div class="nacbs-time">';
                        if (item.IsNew) {
                            html += '               <span class="tag-red tag me-1">' + showLang('AnalysisCenter_Text_10') + '</span>';
                        }
                        html += '                   <span class="timepost-count">' + item.CreatedTime + '</span>';
                        html += '               </div>';
                        html += '           </div>';
                        html += '           <div class="mt-2 right-tag">';
                        //html += '             <span class="tag tag-green">Môi trường làm việc</span>';
                        html += '        </div>';
                        html += '      </div>';
                        html += '      <div class="mt-3">';
                        html += '         <a href="' + item.SeoURL + '" class="nacbs-title d-block stretched-link link-dark-blue mb-0">';
                        html += '              ' + item.ItemName + '';
                        html += '          </a>';
                        html += '        <div class="news-date">' + item.DatetimeCreated + '</div>';
                        html += '      </div>';
                        html += '    </div>';
                        html += ' </div>';
                    });
                    $('#recruitment-content').append(html);

                    if (totalRemain > 0) {
                        $('.loadmore-cta').show();
                    }
                    else {
                        $('.loadmore-cta').hide();
                    }
                    $('.total-remain').html(totalRemain);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });
}

function loadMore() {
    tagIndex++;
    var tagVal = $('#tagIndex').val() == 1 ? 'R-MTLV' : 'R-GTTS';
    renderList(tagVal, tagIndex);
}

function renderCategory(category) {
    $.post(data_api_url + "/recruitment-blog/related",
        { category: category, lang: lang },
        function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var html = '';
                    $.map(response.ResponseData, function (item) {
                        html += '<li class="py-3 px-3">';
                        html += '    <a href="' + item.SeoURL + '" class="nacbs-title d-block">';
                        html += '         ' + item.ItemName + '';
                        html += '     </a>';
                        html += '    <div class="news-date">';
                        html += '          ' + item.DatetimeCreated + '';
                        html += '    </div>';
                        html += ' </li>';
                    });
                    $('#cat-' + category.toLowerCase()).html(html);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });
}