var tagsIndex = [1,1,1];

function initPage() {

    var tag = $('#tagIndex').val();

    renderAnalysisType();
    renderBusinessScope();
    renderStockCode();

    renderList('G-BCDN');
    renderList2('G-BCTQ');
    renderList2('G-BCCQ');
    renderList2('G-BCN');

    renderCompareStoreCode();
    renderLastestRecommend();

    var langKeys = ['AnalysisCenter_Text_13', 'AnalysisCenter_Text_14', 'AnalysisCenter_Text_15', 'AnalysisCenter_Text_16', 'AnalysisCenter_Text_17', 'AnalysisCenter_Text_21', 'AnalysisCenter_Text_22', 'AnalysisCenter_Text_23', 'AnalysisCenter_Text_34', 'Common_Text_3', 'Common_Text_4', 'Common_Text_5'];
    loadDefaultLanguage(langKeys);

    actionDirectTag(tag);
    var textName = lang === 'EN' ? "Day repots" : "Báo cáo ngày";
    $('.AnalysisCenter_Text_bcn').html(textName);
}

///////////////////////////////////////////////////////// Start Left Box //////////////////////////////////////////////////////////////////////////////////////////
function renderAnalysisType() {
    $('#AnalysisType')
        .append($("<option></option>")
            .attr("value", '')
            .text(showLang('AnalysisCenter_Text_18')));

    $.post(data_api_url + "/categories/analysis-type", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                var options = '';
                $.map(response.ResponseData, function (item) {
                    var itemName = lang === 'EN' ? item.CategoryNameEN : item.CategoryNameVN;
                    $('#AnalysisType')
                        .append($("<option></option>")
                            .attr("value", item.CategoryCode)
                            .text(itemName  + ' (' + item.TotalItem + ') '));
                });
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function renderBusinessScope() {
    $('#BusinessScope')
        .append($("<option></option>")
            .attr("value", '')
            .text(showLang('AnalysisCenter_Text_19')));

    $.post(data_api_url + "/categories/business-scope", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                var options = '';
                $.map(response.ResponseData, function (item) {
                    var itemName = lang === 'EN' ? item.CategoryNameEN : item.CategoryNameVN;
                    $('#BusinessScope')
                        .append($("<option></option>")
                            .attr("value", item.CategoryCode)
                            .text(itemName + ' (' + item.TotalItem + ') '));
                });
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function renderStockCode() {
    $('#StockCode')
        .append($("<option></option>")
            .attr("value", '')
            .text(showLang('AnalysisCenter_Text_20')));

    $.post(data_api_url + "/categories/stock-code", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                $.map(response.ResponseData, function (item) {
                    var itemName = lang === 'EN' ? item.ItemName : item.ItemNameVN;
                    $('#StockCode')
                        .append($("<option></option>")
                            .attr("value", item.ItemCode)
                            .text(itemName + ' (' + item.TotalItem + ') '));
                });
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function renderList(groupCode = 'A-BCDN', pageIndex = 1, isReset = false) {
    var analysisType = $('#AnalysisType').val();
    var businessScope = $('#BusinessScope').val();
    var stockCode = $('#StockCode').val();
    
    $.post(data_api_url + "/analysis/filter",
        { analysisGroup: groupCode, analysisType: analysisType, businessScope: businessScope, stockCode: stockCode, pageSize: defaultPageSize, pageNum: pageIndex, lang: lang },
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
                        var title = lang === 'VN' ? item.ItemNameVN : item.ItemName;
                        var recommendStatus = '';
                        if (item.RecommendStatus == 'SELL') {
                            recommendStatus = showLang('AnalysisCenter_Text_12');
                        }
                        else if (item.RecommendStatus == 'BUY') {
                            recommendStatus = showLang('AnalysisCenter_Text_34');
                        }
                        else if (item.RecommendStatus == 'HOLD') {
                            recommendStatus = showLang('AnalysisCenter_Text_11');
                        }
                        else {}
                       
                        if (item.TotalRec >= defaultPageSize * pageIndex) {
                            totalRemain = (item.TotalRec * 1) - (defaultPageSize * pageIndex);
                        }

                        html += '<div class="col-12 col-lg-6 col-xl-4">';
                        html += '     <div class="nacbs-item">';
                        html += '        <div class="ratio ratio-16x9 position-relative">';
                        html += '            <img src="' + imgLink + '" class="img-fluid nacbs-img"';
                        html += '                loading="lazy" />';
                        html += '            <div>';
                        html += '                <div class="nacbs-time">';
                        if (item.IsNewUpdate) {
                            html += '                     <span class="tag-red tag me-1">' + showLang('AnalysisCenter_Text_10') + '</span>';
                        }
                        //html += '                    <span class="timepost-count">' + item.CreatedTime + '</span>';
                        html += '                </div>';
                        html += '            </div>';
                        if (recommendStatus != '') {
                            html += '            <div class="mt-2 right-tag">';
                            html += '                 <span class="tag tag-green">' + recommendStatus + '</span>';
                            html += '           </div>';
                        }
                        html += '       </div>';
                        html += '       <div class="mt-3">';
                        html += '            <a href="' + item.SeoURL + '"';
                        html += '                class="nacbs-title d-block stretched-link link-dark-blue mb-0">';
                        html += '                 ' + title;
                        html += '            </a>';
                        html += '             <div class="news-date">' + item.DatetimeCreated + '</div>';
                        html += '        </div>';
                        html += '    </div>';
                        html += ' </div>';

                    });
                    if (isReset) {
                        $('#analysis-content-' + groupCode.toLowerCase()).html(html);
                        tagsIndex[0] = 1;
                    }
                    else {
                        $('#analysis-content-' + groupCode.toLowerCase()).append(html);
                    }
                    if (totalRemain > 0) {
                        $('.loadmore-cta-' + groupCode.toLowerCase()).show();
                    }
                    else {
                        $('.loadmore-cta-' + groupCode.toLowerCase()).hide();
                    }
                    $('.total-remain-' + groupCode.toLowerCase()).html(totalRemain);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
    });
}

function renderList2(groupCode = 'A-BCTQ', pageIndex = 1, isReset = false) {
    var analysisType = $('#AnalysisType').val();
    var businessScope = $('#BusinessScope').val();
    var stockCode = $('#StockCode').val();
    var localPageSize = 4;
    $.post(data_api_url + "/analysis/filter",
        { analysisGroup: groupCode, analysisType: analysisType, businessScope: businessScope, stockCode: stockCode, pageSize: localPageSize, pageNum: pageIndex, lang: lang },
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

                        var title = lang === 'VN' ? item.ItemNameVN : item.ItemName;
                        var recommendStatus = '';
                        if (item.RecommendStatus == 'SELL') {
                            recommendStatus = showLang('AnalysisCenter_Text_12');
                        }
                        else if (item.RecommendStatus == 'BUY') {
                            recommendStatus = showLang('AnalysisCenter_Text_34');
                        }
                        else if (item.RecommendStatus == 'HOLD') {
                            recommendStatus = showLang('AnalysisCenter_Text_11');
                        }
                        else { }
                        if (item.TotalRec >= localPageSize * pageIndex) {
                            totalRemain = (item.TotalRec * 1) - (localPageSize * pageIndex);
                        }
                        html += '<div class="col-12 col-lg-6 col-xl-3">';
                        html += '     <div class="nacbs-item">';
                        html += '        <div class="ratio ratio-16x9 position-relative">';
                        html += '            <img src="' + imgLink + '" class="img-fluid nacbs-img"';
                        html += '                loading="lazy" />';
                        html += '            <div>';
                        html += '                <div class="nacbs-time">';
                        if (item.IsNewUpdate) {
                            html += '                     <span class="tag-red tag me-1">' + showLang('AnalysisCenter_Text_10') + '</span>';
                        }
                        // html += '                    <span class="timepost-count">' + item.CreatedTime + '</span>';
                        html += '                </div>';
                        html += '            </div>';
                        if (recommendStatus != '') {
                            html += '            <div class="mt-2 right-tag">';
                            html += '                 <span class="tag tag-green">' + recommendStatus + '</span>';
                            html += '           </div>';
                        }
                        html += '       </div>';
                        html += '       <div class="mt-3">';
                        html += '            <a href="' + item.SeoURL + '"';
                        html += '                class="nacbs-title d-block stretched-link link-dark-blue mb-0">';
                        html += '                 ' + title;
                        html += '            </a>';
                        html += '             <div class="news-date">' + item.DatetimeCreated + '</div>';
                        html += '        </div>';
                        html += '    </div>';
                        html += ' </div>';
                    });
                    if (isReset) {
                        $('#analysis-content-' + groupCode.toLowerCase()).html(html);
                    }
                    else {
                        $('#analysis-content-' + groupCode.toLowerCase()).append(html);
                    }
                    if (totalRemain > 0) {
                        $('.loadmore-cta-' + groupCode.toLowerCase()).show();
                    }
                    else {
                        $('.loadmore-cta-' + groupCode.toLowerCase()).hide();
                    }
                    $('.total-remain-' + groupCode.toLowerCase()).html(totalRemain);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });
}

function loadMore(groupCode) {
    var currentIndex = tagsIndex[0];
    if (groupCode === 'G-BCDN') {
        currentIndex = tagsIndex[0] + 1;
        tagsIndex[0] = currentIndex;
        renderList(groupCode, currentIndex);
    }
    else if (groupCode === 'G-BCTQ') {
        currentIndex = tagsIndex[1] + 1;
        tagsIndex[1] = currentIndex;
        renderList2(groupCode, currentIndex);
    }
    else if (groupCode === 'G-BCCQ') {
        currentIndex = tagsIndex[2] + 1;
        tagsIndex[2] = currentIndex;
        renderList2(groupCode, currentIndex);
    }
    else { }
}

///////////////////////////////////////////////////////// End Left Box ////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////// Start Right Box /////////////////////////////////////////////////////////////////////////////////////////

function renderRightStockCode() {
    $('#StockCode1')
        .append($("<option></option>")
            .attr("value", "")
            .text(showLang("AnalysisCenter_Combobox_1")));
    $('#StockCode2')
        .append($("<option></option>")
            .attr("value", "")
            .text(showLang("AnalysisCenter_Combobox_1")));

    $.post(data_api_url + "/categories/stock-code", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                $.map(response.ResponseData, function (item) {
                    var itemName = lang === 'EN' ? item.ItemName : item.ItemNameVN;
                    $('#StockCode1')
                        .append($("<option></option>")
                            .attr("value", item.ItemCode)
                            .text(itemName));
                    $('#StockCode2')
                        .append($("<option></option>")
                            .attr("value", item.ItemCode)
                            .text(itemName));
                });
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function renderCompareStoreCode() {
    $('.AnalysisCenter_Text_1').html(showLang('AnalysisCenter_Text_1'));
    $('.AnalysisCenter_Button_1').html(showLang('AnalysisCenter_Button_1'));
    renderRightStockCode();
}

function renderCompareTable() {
    var code1 = $('#StockCode1').val();
    var code2 = $('#StockCode2').val();
    if (code1 === '' || code2 === '') {
        return false;
    }
    $.post(data_api_url + "/categories/stock-code", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                var obj1 = response.ResponseData.filter(obj => {
                    return obj.ItemCode === code1;
                })[0];

                var obj2 = response.ResponseData.filter(obj => {
                    return obj.ItemCode === code2;
                })[0];

                console.log(obj1);
                console.log(obj2);

                if (typeof obj1 != 'undefined' && typeof obj2 != 'undefined') {
                    var html = '<table class="table table-borderless ptcp-table">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th scope="col">' + showLang('AnalysisCenter_Text_2') + '</th>';
                    html += '<th scope="col" class="text-end">' + obj1.ItemName + '</th>';
                    html += '<th scope="col" class="text-end">' + obj2.ItemName + '</th>';
                    html += '</tr>';
                    html += '</thead>';

                    html += '<tbody>';
                    html += '<tr>';
                    html += '<th scope="row" class="fs-12">' + showLang('AnalysisCenter_Text_3') + '</th>';
                    html += '<td class="text-nowrap text-end">' + obj1.ProfitMargin + '%</td>';
                    html += '<td class="text-nowrap text-end">' + obj2.ProfitMargin + '%</td>';
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th scope="row" class="fs-12">' + showLang('AnalysisCenter_Text_4') + '</th>';
                    html += '<td class="text-nowrap text-end">' + obj1.RateOfPriceIncrease + '%</td>';
                    html += '<td class="text-nowrap text-end">' + obj2.RateOfPriceIncrease + '%</td>';
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th scope="row" class="fs-12">' + showLang('AnalysisCenter_Text_5') + '</th>';
                    html += '<td class="text-nowrap text-end">' + formatToCurrency(obj1.CurrentPrice) + ' VND</td>';
                    html += '<td class="text-nowrap text-end">' + formatToCurrency(obj2.CurrentPrice) + ' VND</td>';
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th scope="row" class="fs-12">' + showLang('AnalysisCenter_Text_6') + '</th>';
                    html += '<td class="text-nowrap text-end">' + formatToCurrency(obj1.TargetPrice) + ' VND</td>';
                    html += '<td class="text-nowrap text-end">' + formatToCurrency(obj2.TargetPrice) + ' VND</td>';
                    html += '</tr>';

                    html += '</tbody>';

                    html += '</table>';
                    $('#result-compare').html(html);
                }
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function renderLastestRecommend() {
    $.post(data_api_url + "/analysis/lastest-stock-code-recommend", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                var html = '';
                $.map(response.ResponseData, function (item) {
                    var itemName = lang === 'VN' ? item.ItemNameVN : item.ItemName;
                    console.log(item.RecommendStatus);
                    var recommendStatus = '';
                    if (item.RecommendStatus == 'SELL') {
                        recommendStatus = showLang('AnalysisCenter_Text_9');
                    }
                    else if (item.RecommendStatus == 'BUY') {
                        recommendStatus = showLang('AnalysisCenter_Text_36');
                    }
                    else if (item.RecommendStatus == 'HOLD') {
                        recommendStatus = showLang('AnalysisCenter_Text_8');
                    }
                    else { }

                   /* var recommendStatus = item.RecommendStatus === 'BUY' ? showLang('AnalysisCenter_Text_8') : showLang('AnalysisCenter_Text_9');*/
               
                    html += '<div class="card-kn mb-3">';
                    html += '<div class="d-flex justify-content-between">';
                    html += '<div class="card-kn-text">';
                    html += '<div class="label">' + item.RecommendDate + '</div>';
                    html += '<div class="txt h5 mb-0">' + itemName + '</div>';
                    html += '</div>';

                    html += '<div class="card-kn-text text-end">';
                    html += '<div class="label">' + showLang('AnalysisCenter_Text_7') + '</div>';
                    html += '<div class="txt h5 mb-0">' + recommendStatus + '</div>';
                    html += '</div>';
                    html += '</div>';

                    html += '<hr class="card-kn-hr" />';

                    html += '<div class="d-flex">';
                    html += '<div class="card-kn-text">';
                    html += '<div class="label">' + showLang('AnalysisCenter_Text_3') + '</div>';
                    html += '<div class="txt h6 mb-0">' + item.ProfitMargin + '%</div>';
                    html += '</div>';

                    html += '<div class="card-kn-text ms-4">';
                    html += '<div class="label">' + showLang('AnalysisCenter_Text_4') + '</div>';
                    html += '<div class="txt h6 mb-0">' + item.RateOfPriceIncrease + '%</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '<hr class="card-kn-hr opacity-0 mt-0" />';

                    html += '<div class="d-flex">';
                    html += '<div class="card-kn-text">';
                    html += '<div class="label">' + showLang('AnalysisCenter_Text_6') + '</div>';
                    html += '<div class="txt h6 mb-0">' + formatToCurrency(item.TargetPrice) + ' VND</div>';
                    html += '</div>';

                    html += '<div class="card-kn-text ms-4">';
                    html += '<div class="label">' + showLang('AnalysisCenter_Text_5') + '</div>';
                    html += '<div class="txt h6 mb-0">' + formatToCurrency(item.CurrentPrice) + ' VND</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                });

                $('#widget-recommend').html(html);
            }
        }
    });
}

///////////////////////////////////////////////////////// End Right Box ///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////// Start Action ////////////////////////////////////////////////////////////////////////////////////////////

function actionDirectTag(tag) {
    $('.nav-link').removeClass('active');
    $('#nav-link-' + tag).addClass('active');

    $('.tab-pane').removeClass('active');
    $('#AnalysisGroup' + tag).addClass('active');
    $('#AnalysisGroup' + tag).addClass('show');
}

///////////////////////////////////////////////////////// End Action //////////////////////////////////////////////////////////////////////////////////////////////