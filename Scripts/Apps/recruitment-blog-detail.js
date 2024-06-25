function initPage() {
    var langKeys = ['Common_Text_2', 'Recruitment_Text_1', 'Recruitment_Text_2', 'Recruitment_Text_3', 'Common_Text_6'];
    loadDefaultLanguage(langKeys);

    var itemId = $('#itemId').val();

    loadData(itemId);
    renderCategory('R-MTLV');
    renderCategory('R-GTTS');
    //var contentUri = $('#contentUri').val();
    //loadContent(cdn_url + contentUri);
}

function loadData(itemId) {
    $.post(data_api_url + "/recruitment-blog/single",
        { ItemId: itemId, lang: lang },
        function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var item = response.ResponseData[0];

                    $('#blog-title').html(item.ItemName);
                    $('#breadcrumb-title').html(item.ItemName);
                    $('.blog-detail-date').html(item.DatetimeCreated);

                    loadContent(item.ItemContent);

                    var attachFiles = JSON.parse(item.AttachFiles);
                    if (Array.isArray(attachFiles)) {
                        var html = '';
                        $.map(attachFiles, function (file) {
                            html += '<li class="list-inline-item">';
                            html += '    <a href="' + (cdn_url + file.Val) + '" class="btn btn-file">' + file.Name + '</a>';
                            html += '</li>';
                        });
                        $('.blog-attachment').html(html);
                    }
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });
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