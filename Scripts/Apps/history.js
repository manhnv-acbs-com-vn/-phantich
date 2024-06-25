
LoadData();
function LoadData() {
    $.post(data_api_url + "/history-page/get-list", function (response) {        
        if (response.ResponseCode === '00_00') {
            ViewHistory(response.ResponseData);            
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
    $.post(data_api_url + "/history-page/get-title", function (response) {
        if (response.ResponseCode === '00_00') {
            $.map(response.ResponseData, function (item) {
                if (item.PSCode == "1039.1041")
                    ViewTitle(item);
            });

        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function ViewHistory(data) {
    var htmlRegder = '';
    var itemNumber = 0;

    htmlRegder += '<div class="acbs-breadcrumb" id="breadcrumb-id">                                                            ';
    htmlRegder += '</div>                                                                                   ';
    htmlRegder += '<section class="bdh-section section-normal less-space">                                  ';
    htmlRegder += '    <div class="container px-4 px-md-3" id="title-history">                                                 ';
    htmlRegder += '    </div>                                                                               ';
    htmlRegder += '    <div class="ls-list">                                                                ';
    htmlRegder += '        <div class="ls-line-dash">                                                       ';
    htmlRegder += '            <img src="/Templates/img/ls/line-dash.svg"                                   ';
    htmlRegder += '                 class="img-fluid d-block mx-auto"                                       ';
    htmlRegder += '                 alt="" />                                                               ';
    htmlRegder += '        </div>                                                                           ';
    htmlRegder += '                                                                                         ';
    $.map(data, function (item) {
        itemNumber += 1;        
        var itemNameVal = lang === 'EN' ? item.ItemName : item.ItemNameVN;
        var itemImageLink = cdn_url + JSON.parse(item.Avatar).Val;
        if (itemNumber === 1) {
            htmlRegder += '        <div class="ls-item is-current" style="background-image: none">                  ';
            htmlRegder += '            <div class="ls-col container px-4 px-md-3">                                  ';
            htmlRegder += '                <div class="ls-content">                                                 ';
            htmlRegder += '                    <h2 class="text-primary fw-bold reveal" data-reveal-delay="200">     ';
            htmlRegder += '                        ' + item.Year + '                                                             ';
            htmlRegder += '                    </h2>                                                                ';
            htmlRegder += '                    ' + itemNameVal + '                                                                 ';
            htmlRegder += '                </div>                                                                   ';
            htmlRegder += '                <div class="ls-space">                                                   ';
            htmlRegder += '                    <div class="dot"></div>                                              ';
            htmlRegder += '                </div>                                                                   ';
            htmlRegder += '                <div class="ls-img"></div>                                               ';
            htmlRegder += '            </div>                                                                       ';
            htmlRegder += '        </div>                                                                           ';

        } else  {
            htmlRegder += '        <div class="ls-item">                  ';
            htmlRegder += '            <div class="ls-col container px-4 px-md-3">                                  ';
            htmlRegder += '                <div class="ls-content">                                                 ';
            htmlRegder += '                    <h2 class="text-primary fw-bold reveal" data-reveal-delay="200">     ';
            htmlRegder += '                        ' + item.Year + '                                                             ';
            htmlRegder += '                    </h2>                                                                ';
            htmlRegder += '                    ' + itemNameVal + '                                                                 ';
            htmlRegder += '                </div>                                                                   ';
            htmlRegder += '                <div class="ls-space">                                                   ';
            htmlRegder += '                    <div class="dot"></div>                                              ';
            htmlRegder += '                </div>                                                                   ';
            htmlRegder += '                <div class="ls-img"><img src="' + itemImageLink+'" class="img-fluid" loading="lazy" /></div>                                               ';
            htmlRegder += '            </div>                                                                       ';
            htmlRegder += '        </div>                                                                           ';
        }
       });   

    htmlRegder += '    </div>                                                                               ';
    htmlRegder += '</section>                                                                               ';
    $('#HISTORY-VIEW').html(htmlRegder);
}

function ViewTitle(data) {
    var htmlRegder = '';
    var itemTitle = '';
    var itemBreadCrumb = '';
    $.map(JSON.parse(data.DataList), function (item) {
        if (item.Key == 'Title')
            itemTitle = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'BreadCrumb')
            itemBreadCrumb = lang === 'EN' ? item.Name : item.NameVN;
    });
    $('#breadcrumb-id').html(itemBreadCrumb);
    htmlRegder += '<h1 class="text-center">' + itemTitle+'</h1>';
    $('#title-history').html(htmlRegder);
}

if (!!window.IntersectionObserver) {
    let observer = new IntersectionObserver(
        (entries, item) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.contains("reveal-auto-hide") &&
                        entry.target.classList.remove("show");
                }
            });
        },
        { threshold: 0 }
    );

    document.querySelectorAll(".reveal").forEach((item) => {
        setTimeout(function () {
            observer ? observer.observe(item) : item.classList.add("show");
        }, Number(item.dataset.revealDelay) || 300);
    });
}
