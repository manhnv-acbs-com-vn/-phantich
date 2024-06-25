////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Define Variable //////////////////////////////////////////////////////////////////////////////////////////////////// 

// Test
//const cdn_url = 'https://acbs.bps.vn';
//const data_api_url = 'http://gw-acbs.bps.vn/gateway/api-data';

// Dev
const cdn_url = 'https://acbs.bps.vn';
const data_api_url = 'http://data-api.acbs.com.vn/api';

// UAT
//const cdn_url = 'http://content.acbs.com.vn';
//const data_api_url = 'http://api-gw.acbs.com.vn/gateway/api-data';


const lang = typeof ($.cookie('lang')) === 'undefined' ? 'VN' : $.cookie('lang');
const defaultPageSize = 6;
var langContent = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Exec Function ////////////////////////////////////////////////////////////////////////////////////////////////////// 

loadMenu();
loadLang();
loadDisplayLanguage();
loadCommonLanguage();
loadFooter();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Define Function ////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// Start Menu /////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadMenu() {
    $.ajaxSetup({ async: false });
    $.post(data_api_url + "/layout/load-menu", function (response) {
        if (response.ResponseCode === '00_00') {
            webMenu(response.ResponseData);
            mobileMenu(response.ResponseData);
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function webMenu(data) {
    var htmlMenu = '';
    var parents = data.filter(obj => {
        return obj.MenuParent === 0;
    });
   
    $.map(parents, function (parent) {

        htmlMenu += '<li class="nav-item d-flex has-dropdown">';
        htmlMenu += '<a href="' + parent.Link + '" class="nav-link px-2 link-dark-blue d-flex align-items-center text-uppercase">';
        htmlMenu += (lang === 'VN' ? parent.MenuNameVN : parent.MenuName);
        htmlMenu += '<svg xmlns="http://www.w3.org/2000/svg" class="icon size-16 ms-1" viewBox="0 0 20 20" fill="currentColor">';
        htmlMenu += '<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />';
        htmlMenu += '</svg>';
        htmlMenu += '</a>';

        var childs = data.filter(obj => {
            return obj.MenuParent === parent.MenuID;
        });
        if (childs.length > 0) {
            htmlMenu += '<div class="main-nav-mega-wrap">';
            htmlMenu += '<div class="main-nav-mega container">';
            htmlMenu += '<div class="row">';

            $.map(childs, function (child) {
                htmlMenu += '<div class="col-3 megamenu__item">';
                htmlMenu += '<div class="megamenu__item__content">';
                htmlMenu += '<h3>' + (lang === 'VN' ? child.MenuNameVN : child.MenuName) + '</h3>';
                htmlMenu += '<p>' + (lang === 'VN' ? child.DescriptionVN : child.Description) + '</p>';

                var links = data.filter(obj => {
                    return obj.MenuParent === child.MenuID;
                });

                if (links.length > 0) {
                    htmlMenu += '<ul>';

                    $.map(links, function (link) {
                        htmlMenu += '<li>';
                        htmlMenu += '<a href="' + link.Link + '">' + (lang === 'VN' ? link.MenuNameVN : link.MenuName) + '</a>';
                        htmlMenu += '</li>';
                    });
                    htmlMenu += '</ul>';
                }
                htmlMenu += '</div>';
                htmlMenu += '</div>';
            });
        }
        htmlMenu += '</li>';
    });
    $('#main-menu').html(htmlMenu);
}

function mobileMenu(data) {
    var htmlMobile = '<div class="offcanvas-header"></div>';
    htmlMobile += '<div class="offcanvas-body p-0">';
    htmlMobile += '<div class="accordion accordion-flush" id="accordionFlushExample">';

    var parents = data.filter(obj => {
        return obj.MenuParent === 0;
    });
    $.map(parents, function (parent) {
        htmlMobile += ' <div class="accordion-item">';
        htmlMobile += '<h2 class="accordion-header" id="flush-headingOne">';
        htmlMobile += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse' + parent.MenuID + '" aria-expanded="false" aria-controls="flush-collapseOne">'
        htmlMobile += (lang === 'VN' ? parent.MenuNameVN : parent.MenuName);
        htmlMobile += '</button>';
        htmlMobile += '</h2>';

        var childs = data.filter(obj => {
            return obj.MenuParent === parent.MenuID;
        });
        if (childs.length > 0) {
            htmlMobile += '<div id="flush-collapse' + parent.MenuID + '" class="accordion-collapse collapse" aria-labelledby="flush-heading' + parent.MenuID + '" data-bs-parent="#accordionFlushExample">';
            htmlMobile += '<div class="accordion-body">';
            htmlMobile += '<div class="row">';

            $.map(childs, function (child) {
                htmlMobile += '<div class="col-xs-12 megamenu__item">';
                htmlMobile += '<div class="megamenu__item__content">';
                htmlMobile += '<h3>' + (lang === 'VN' ? child.MenuNameVN : child.MenuName) + '</h3>';
                htmlMobile += '<p>' + (lang === 'VN' ? child.DescriptionVN : child.Description) + '</p>';

                var links = data.filter(obj => {
                    return obj.MenuParent === child.MenuID;
                });

                if (links.length > 0) {
                    htmlMobile += '<ul>';

                    $.map(links, function (link) {
                        htmlMobile += '<li>';
                        htmlMobile += '<a href="' + link.Link + '">' + (lang === 'VN' ? link.MenuNameVN : link.MenuName) + '</a>';
                        htmlMobile += '</li>';
                    });
                    htmlMobile += '</ul>';
                }
                htmlMobile += '</div>';
                htmlMobile += '</div>';
            });
            htmlMobile += '</div>';
            htmlMobile += '</div>';
            htmlMobile += '</div>';
        }
        htmlMobile += '</div>';
    });
    $('.main-menu-offcanvas').html(htmlMobile);
}

function loadFooter() {
    $.post(data_api_url + "/layout/load-footer",
        { "DocumentID": 1000 },
        function (response) {
        var html = '';
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                try {
                    var objHotline = response.ResponseData.filter(obj => {
                        return obj.PSID === 1134;
                    })[0];
                    var hotlineContent = getNameByKey('Content', JSON.parse(objHotline.DataList));
                    html += lang === 'VN' ? hotlineContent.NameVN : hotlineContent.Name;

                    var objGuide = response.ResponseData.filter(obj => {
                        return obj.PSID === 1135;
                    })[0];
                    var hotlineGuide = getNameByKey('Content', JSON.parse(objGuide.DataList));
                    html += lang === 'VN' ? hotlineGuide.NameVN : hotlineGuide.Name;

                    var objProduct = response.ResponseData.filter(obj => {
                        return obj.PSID === 1136;
                    })[0];
                    var hotlineProduct = getNameByKey('Content', JSON.parse(objProduct.DataList));
                    html += lang === 'VN' ? hotlineProduct.NameVN : hotlineProduct.Name;

                    var objContact = response.ResponseData.filter(obj => {
                        return obj.PSID === 1137;
                    })[0];
                    var hotlineContact = getNameByKey('Content', JSON.parse(objContact.DataList));
                    html += lang === 'VN' ? hotlineContact.NameVN : hotlineContact.Name;

                    var objSocial = response.ResponseData.filter(obj => {
                        return obj.PSID === 1138;
                    })[0];
                    var hotlineSocial = getNameByKey('Content', JSON.parse(objSocial.DataList));
                    html += lang === 'VN' ? hotlineSocial.NameVN : hotlineSocial.Name;

                    $('.footer-wrap').html(html);
                }
                catch (err) {
                    console.log(err);
                }
                $('.footer-wrap').html(html);
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

////////////////////////////////////// End Menu ///////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////// Start Language /////////////////////////////////////////////////////////////////////////////////////////////////////
function loadLang() {
    if ($.cookie('langContent') === null || $.cookie('langContent') === undefined) {
        //no cookie
        $.ajaxSetup({ async: false });
        $.post(data_api_url + "/layout/load-language", function (response) {
            console.log('Language is reloaded!');
            langContent = JSON.stringify(response.ResponseData);
            var expDate = new Date();
            expDate.setTime(expDate.getTime() + (60 * 1000)); // add 24 hour
            $.cookie("langContent", langContent, { path: '/', expires: expDate });
        });
    } else {
        //have cookie
        langContent = $.cookie('langContent');
    }
}

function changeLang(mythis, lg) {
    return false;
    //$.cookie('lang', lg);
    //$.ajax({
    //    type: "POST",
    //    url: '/Home/ChangeLang',
    //    data: 'lang=' + lg,
    //    success: function (rep) {
    //        location.reload();
    //    }
    //});
}

function showLang(langKey) {
    try {
        var langObj = JSON.parse(langContent).filter(obj => {
            return obj.LangKey === langKey;
        });
        if ((typeof langObj === undefined || typeof langObj === 'undefined' || langObj === null) && langObj.length > 0) {
            return '';
        }
        return lang === 'VN' ? langObj[0].LangDisplayVN : langObj[0].LangDisplayEN;
    }
    catch (err) {
        console.log(err);
        return '';
    }
}

function loadDefaultLanguage(langKeys = []) {
    if (Array.isArray(langKeys)) {
        langKeys.push('Common_Text_8');
        langKeys.push('Common_Text_9');
        console.log(langKeys);
        $.map(langKeys, function (langKey) {
            $('.' + langKey).html(showLang(langKey));
        });
    }
}

function loadCommonLanguage(langKeys = []) {
    if (Array.isArray(langKeys)) {
        langKeys.push('Common_Text_8');
        langKeys.push('Common_Text_9');
        console.log(langKeys);
        $.map(langKeys, function (langKey) {
            $('.' + langKey).html(showLang(langKey));
        });
    }
}

function loadDisplayLanguage() {
    var lang = $.cookie('lang');
    $('.flag-language').removeClass('current');
    var html = '';
    if ($.cookie('lang') === null || $.cookie('lang') === undefined || lang === 'VN') {
        html += '<img src="/Templates/img/flag/flag-vn.svg" alt="Viet nam" class="" width="22" height="22" />';
        html += '                <div class="ms-2 me-1">VN</div>';
        html += '                 <svg xmlns="http://www.w3.org/2000/svg" class="icon size-16" viewBox="0 0 20 20" fill="currentColor">';
        html += '                   <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />';
        html += '               </svg>';
        $('.flag-language-vn').addClass('current');
    }
    else {
        $('.flag-language-en').addClass('current');
        html += '<img src="/Templates/img/flag/flag-gb.svg" alt="English" class="" width="22" height="22" />';
        html += '                <div class="ms-2 me-1">EN</div>';
        html += '                 <svg xmlns="http://www.w3.org/2000/svg" class="icon size-16" viewBox="0 0 20 20" fill="currentColor">';
        html += '                   <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />';
        html += '               </svg>';
        $('.flag-language-en').addClass('current');
    }
    $('.flag-language-active').html(html);
}

////////////////////////////////////// End Language ///////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////// Start Common /////////////////////////////////////////////////////////////////////////////////////////////////////

function formatToCurrency(amount) {
    return amount.toString().split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function loadContent(uri, strId = 'content-detail') {
    fetch('/Common/LoadExtenalContent?contentUrl=' + uri).then(function (response) {
        response.text().then(function (text) {
            document.getElementById(strId).innerHTML = text;
        });
    });
}

function readContent(uri) {
    var htmlContent = '';
    $.ajax({
        type: "POST",
        async: false,
        url: '/Common/LoadExtenalContent',
        data: 'contentUrl=' + uri,
        success: function (rep) {
            console.log(rep)
            htmlContent = rep;
        }
    });
    return htmlContent;
}

function fetchContent(uri, strId) {
    fetch('http://acbs.bps.vn/Files/Domains/ACBS/Contents/WFL-1585/0e5055a7-f174-4be2-8ddf-2bab97ee1942.html').then(function (response) {
        console.log(response);
        response.text().then(function (text) {
            document.getElementById(strId).innerHTML = text;
        });
    });
}

function getNameByKey(key, data) {
    var name = data.filter(obj => {
        return obj.Key === key;
    })[0];
    return name;
}

function replaceCdnUrl(strContent, strFind) {
    return strContent.replace('/' + strFind + '/g', cdn_url);
}

function base64encode(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
////////////////////////////////////// End Common ///////////////////////////////////////////////////////////////////////////////////////////////////////