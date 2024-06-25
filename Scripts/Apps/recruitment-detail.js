function initPage() {
    var langKeys = ['Common_Text_2', 'Common_Text_3', 'Common_Text_4', 'Common_Text_5', 'Recruitment_Text_4', 'Recruitment_Text_21', 'Recruitment_Text_25', 'Recruitment_Text_26', 'Recruitment_Text_27', 'Recruitment_Text_28', 'Recruitment_Text_29', 'Recruitment_Text_30', 'Recruitment_Text_31', 'Recruitment_Text_32', 'Recruitment_Text_33', 'Recruitment_Text_37', 'Recruitment_Text_38', 'Recruitment_Text_40', 'Recruitment_Text_41', 'Recruitment_Text_42', 'Recruitment_Text_43', 'Recruitment_Text_44', 'Recruitment_Text_45', 'Recruitment_Text_46', 'Recruitment_Text_47', 'Recruitment_Text_48', 'Recruitment_Text_49', 'Recruitment_Text_50', 'Recruitment_Text_51', 'Recruitment_Text_52', 'Recruitment_Text_53', 'Recruitment_Text_54', 'Recruitment_Text_55', 'Recruitment_Text_56', 'Recruitment_Text_57', 'Recruitment_Text_58', 'Recruitment_Text_59', 'Recruitment_Text_60', 'Recruitment_Text_71'];
    loadDefaultLanguage(langKeys);
    var id = $('#Id').val();
    renderHotNews();
    renderContent(id);
    renderFormSubmit();
    
}

function loadCustomContent(uri, strId, extContent) {
    fetch('/Common/LoadExtenalContent?contentUrl=' + uri).then(function (response) {
        response.text().then(function (text) {
            document.getElementById(strId).innerHTML = extContent + text;
        });
    });
}

function renderContent(id) {
    $.post(data_api_url + "/recruitment/single",
        { ItemId: id, Lang: lang }
        , function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var item = response.ResponseData[0];
                    var jsSkill = JSON.parse(item.JsSkill);
                    var jsLocation = JSON.parse(item.JsLocation);
                    var jsDegree = JSON.parse(item.JsDegree);
                    var jsCareer = JSON.parse(item.JsCareer);
                    var jsWelfare = JSON.parse(item.JsWelfare);

                    $('.recruitment-title').html(item.ItemName);

                    var htmlSkill = showLang('Recruitment_Text_22') + ':';
                    if (Array.isArray(jsSkill)) {
                        $.map(jsSkill, function (skill) {
                            htmlSkill += ' <span>' + (lang === 'VN' ? skill.NameVN : skill.Name) + '</span> ';
                        });
                    }
                    $('.recruitment-skill').html(htmlSkill);

                    var htmlLocation = '';
                    if (Array.isArray(jsLocation)) {
                        $.map(jsLocation, function (location) {
                            htmlLocation += htmlLocation === '' ? (lang == 'VN' ? location.NameVN : location.Name) : ', ' + (lang == 'VN' ? location.NameVN : location.Name);
                        });
                    }
                    $('.job-location').html(htmlLocation);

                    $('.job-title').html(item.JobTitleName);

                    $('.job-form').html(item.JobFormName);

                    var htmlDegree = '';
                    if (Array.isArray(jsDegree)) {
                        $.map(jsDegree, function (degree) {
                            htmlDegree += htmlDegree === '' ? (lang == 'VN' ? degree.NameVN : degree.Name) : ', ' + (lang == 'VN' ? degree.NameVN : degree.Name);
                        });
                    }
                    $('.job-degree').html(htmlDegree);

                    $('.job-experience').html(item.Experience);

                    if (item.SalaryFrom == 0 || item.SalaryTo == 0) {
                        $('.job-salary').html(showLang('Recruitment_Text_23'));
                    }
                    else {
                        $('.job-salary').html(formatToCurrency(item.SalaryFrom) + ' - ' + formatToCurrency(item.SalaryTo) + ' ' + item.SalaryCurrency);
                    }

                    var htmlCareer = '';
                    if (Array.isArray(jsCareer)) {
                        $.map(jsCareer, function (career) {
                            htmlCareer += htmlCareer === '' ? (lang === 'VN' ? career.NameVN : career.Name) : ', ' + (lang === 'VN' ? career.NameVN : career.Name);
                        });
                    }
                    $('.job-career').html(htmlCareer);

                    $('.job-expdate').html(item.ExpDate);

                    $('.job-expdate-popup').html(showLang('Recruitment_Text_10') + ' ' + item.ExpDate);

                    var htmlBenefit = '<h5 class="mb-3">' + showLang('Recruitment_Text_24') + '</h5>';
                    if (Array.isArray(jsWelfare)) {
                        $.map(jsWelfare, function (welfare) {
                            htmlBenefit += '<div class="acbs-benefit--item d-flex align-items-start mb-2">';
                            htmlBenefit += '    <img class="w-lg-10" src="/Templates/img/Export/tuyendung-chitiet-icon-phucloi.svg">';
                            htmlBenefit += '        <p class="w-lg-90 ps-3 mb-0">' + (lang === 'VN' ? welfare.NameVN : welfare.Name) + '</p>';
                            htmlBenefit += '</div>';
                        });
                    }
                    $('.acbs-benefit').html(htmlBenefit);

                    loadCustomContent(item.ItemDescription, 'job-desc', '<h3>' + showLang('Recruitment_Text_34') + '</h3>');
                    loadCustomContent(item.Requirement, 'job-requirement', '<h3>' + showLang('Recruitment_Text_35') + '</h3>');
                    loadCustomContent(item.ApplicationForm, 'job-apply-form', '<h3>' + showLang('Recruitment_Text_36') + '</h3>');
                    $('#EmailRegister').attr('placeholder', showLang('Recruitment_Text_39'));
                }
            }
    });
}

function renderHotNews() {
    $.post(data_api_url + "/recruitment/hot",
        { Lang: lang }
        , function (response) {
            var html = '';
            if (Array.isArray(response.ResponseData)) {
                $.map(response.ResponseData, function (item) {
                    var jsLocation = JSON.parse(item.JsLocation);
                    var htmlLocation = '';
                    if (Array.isArray(jsLocation)) {
                        if (jsLocation.length > 3) {
                            htmlLocation += htmlLocation == '' ? (lang === 'VN' ? jsLocation[0].NameVN : jsLocation[0].Name) : ', ' + (lang === 'VN' ? jsLocation[0].NameVN : jsLocation[0].Name)
                            htmlLocation += htmlLocation == '' ? (lang === 'VN' ? jsLocation[1].NameVN : jsLocation[1].Name) : ', ' + (lang === 'VN' ? jsLocation[1].NameVN : jsLocation[1].Name)
                            htmlLocation += htmlLocation == '' ? (lang === 'VN' ? jsLocation[2].NameVN : jsLocation[2].Name) : ', ' + (lang === 'VN' ? jsLocation[2].NameVN : jsLocation[2].Name)
                            htmlLocation += ' và ' + (jsLocation.length - 1) + '  tỉnh thành khác';
                        }
                        else {
                            $.map(jsLocation, function (location) {
                                htmlLocation += htmlLocation == '' ? (lang === 'VN' ? location.NameVN : location.Name) : ', ' + (lang === 'VN' ? location.NameVN : location.Name);
                            });
                        }
                    }
                    html += '<li class="py-3">';
                    html += '    <a href="' + item.SeoURL + '" class="mb-2">' + item.ItemName + '</a>';
                    html += '     <div class="job-overview-detail">';
                    html += '        <img src="/Templates/img/Export/tuyendung-chitiet-icon-location.svg">';
                    html += '           <span class="ms-2">' + htmlLocation + '</span>';
                    html += '   </div>';
                    html += '</li>';
                })
            }
            $('.relevant-jobs-list').html(html);
        })
}

function renderFormSubmit() {

    $('#Gender')
        .append($("<option></option>")
            .attr("value", "")
            .text(showLang("AnalysisCenter_Combobox_1")));
    $('#Gender')
        .append($("<option></option>")
            .attr("value", 1)
            .text(showLang('Recruitment_Text_46')));
    $('#Gender')
        .append($("<option></option>")
            .attr("value", 2)
            .text(showLang('Recruitment_Text_47')));
    $('#Gender')
        .append($("<option></option>")
            .attr("value", 3)
            .text(showLang('Recruitment_Text_48')));

    
    $('#AULocationCode')
        .append($("<option></option>")
            .attr("value", "")
            .text(showLang("AnalysisCenter_Combobox_1")));

    $.post(data_api_url + "/categories/category-bycode", { categoryGroup: "Recruitment_Location" }, function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                $.map(response.ResponseData, function (item) {
                    var itemName = lang === 'EN' ? item.CategoryNameEN : item.CategoryNameVN;
                    $('#AULocationCode')
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

    $('input[name="FullName"]').attr('placeholder', showLang('Recruitment_Text_61'));
    $('input[name="Gender"]').attr('placeholder', showLang('Recruitment_Text_45'));
    $('input[name="Address"]').attr('placeholder', showLang('Recruitment_Text_62'));
    $('input[name="AULocationCode"]').attr('placeholder', showLang('Recruitment_Text_52'));
    $('input[name="Experience"]').attr('placeholder', showLang('Recruitment_Text_53'));
    $('input[name="Degree"]').attr('placeholder', showLang('Recruitment_Text_28'));
    $('input[name="Specialized"]').attr('placeholder', showLang('Recruitment_Text_54'));
    $('input[name="NameOfUniversity"]').attr('placeholder', showLang('Recruitment_Text_55'));
    $('input[name="Certificate"]').attr('placeholder', showLang('Recruitment_Text_56'));
    $('input[name="ExtDegree"]').attr('placeholder', showLang('Recruitment_Text_57'));
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

