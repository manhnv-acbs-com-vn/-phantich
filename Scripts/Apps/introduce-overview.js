function initPage() {
    var langKeys = ['Introduce_Text_1'];

    loadDefaultLanguage(langKeys);
    loadData();
}

function loadData() {
    $.post(data_api_url + "/introduce/content",
        function (response) {
            console.log(response);
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var objBanner = response.ResponseData.filter(obj => {
                        return obj.PSID === 1001;
                    })[0];
                    var objKPI = response.ResponseData.filter(obj => {
                        return obj.PSID === 1002;
                    })[0];
                    var objBOD = response.ResponseData.filter(obj => {
                        return obj.PSID === 1003;
                    })[0];
                    var objProduct = response.ResponseData.filter(obj => {
                        return obj.PSID === 1006;
                    })[0];
                    var objBranch = response.ResponseData.filter(obj => {
                        return obj.PSID === 1007;
                    })[0];
                    var objProcess = response.ResponseData.filter(obj => {
                        return obj.PSID === 1008;
                    })[0];
                    var objOrg = response.ResponseData.filter(obj => {
                        return obj.PSID === 1018;
                    })[0];
                    var objTech = response.ResponseData.filter(obj => {
                        return obj.PSID === 1125;
                    })[0];
                    renderBanner(objBanner);
                    renderKPI(objKPI);
                    renderMessageBOD(objBOD);
                    renderProductBox(objProduct);
                    renderBrarchValue(objBranch);
                    renderProcess(objProcess);
                    renderOrg(objOrg);
                    renderTechnical(objTech);
                }
            }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function renderBanner(data) {
    var contentData = JSON.parse(data.DataList);

    var title = getNameByKey('Title', contentData);
    var name = getNameByKey('Name', contentData);
    var image = getNameByKey('Image', contentData);

    $('.banner-img').css('background-image', 'url(' + cdn_url + image.Image + ')');
    $('.banner-title').html((lang === 'VN' ? name.NameVN : name.Name));
    $('.banner-short-desc').html((lang === 'VN' ? title.NameVN : title.Name));
}

function renderKPI(data) {
    var contentData = JSON.parse(data.DataList);

    var iconVdl = getNameByKey('ID1.Image', contentData);
    var titleVdl = getNameByKey('ID1.Name', contentData);
    var valueVdl = getNameByKey('ID1.Value', contentData);

    var iconVcsh = getNameByKey('ID2.Image', contentData);
    var titleVcsh = getNameByKey('ID2.Name', contentData);
    var valueVcsh = getNameByKey('ID2.Value', contentData);

    var icontts = getNameByKey('ID3.Image', contentData);
    var titletts = getNameByKey('ID3.Name', contentData);
    var valuetts = getNameByKey('ID3.Value', contentData);

    $('.icon-vdl').html('<img src="' + (cdn_url + iconVdl.Name) + '" class="img-fluid" width="45" alt="' + iconVdl.ImageDisplay + '" />');
    $('.title-vdl').html(lang === 'VN' ? titleVdl.NameVN : titleVdl.Name);
    $('.value-vdl').html(lang === 'VN' ? valueVdl.NameVN : valueVdl.Name);

    $('.icon-vcsh').html('<img src="' + (cdn_url + iconVcsh.Name) + '" class="img-fluid" width="45" alt="' + iconVcsh.ImageDisplay + '" />');
    $('.title-vcsh').html(lang === 'VN' ? titleVcsh.NameVN : titleVcsh.Name);
    $('.value-vcsh').html(lang === 'VN' ? valueVcsh.NameVN : valueVcsh.Name);

    $('.icon-tts').html('<img src="' + (cdn_url + icontts.Name) + '" class="img-fluid" width="45" alt="' + icontts.ImageDisplay + '" />');
    $('.title-tts').html(lang === 'VN' ? titletts.NameVN : titletts.Name);
    $('.value-tts').html(lang === 'VN' ? valuetts.NameVN : valuetts.Name);
}

function renderMessageBOD(data) {
    var contentData = JSON.parse(data.DataList);

    var title = getNameByKey('Name', contentData);
    var image = getNameByKey('Image', contentData);
    var content = getNameByKey('Content', contentData);

    $('.image-tdbdh').html('<img src="' + cdn_url + image.Name + '" loading="lazy" class="d-block img-fluid mx-auto">');
    $('.title-tdbdh').html(lang === 'VN' ? title.NameVN : title.Name);
    $('.content-tdbdh').html(lang === 'VN' ? content.NameVN : content.Name);

}

function renderProductBox(data) {
    var contentData = JSON.parse(data.DataList);

    var title = getNameByKey('Name', contentData);
    var desc = getNameByKey('Description', contentData);

    $('.product-title').html(lang === 'VN' ? title.NameVN : title.Name);
    $('.product-desc').html(lang === 'VN' ? desc.NameVN : desc.Name);

    renderProducts();
}

function renderBrarchValue(data) {
    var contentData = JSON.parse(data.DataList);

    var title = getNameByKey('Name', contentData);
    var desc = getNameByKey('Description', contentData);
    var img = getNameByKey('Image', contentData);
    
    $('.branch-title').html(lang === 'VN' ? title.NameVN : title.Name);
    $('.branch-desc').html(lang === 'VN' ? desc.NameVN : desc.Name);
    $('.branch-img').html('<img src="' + cdn_url + img.Name + '" alt="" />');
}

function renderProcess(data) {
    var contentData = JSON.parse(data.DataList);

    var title = getNameByKey('Name', contentData);
    var desc = getNameByKey('Description', contentData);
    var img = getNameByKey('Image', contentData);

    $('.process-title').html(lang === 'VN' ? title.NameVN : title.Name);
    $('.process-desc').html(lang === 'VN' ? desc.NameVN : desc.Name);
    $('.process-img').html('<img src="' + cdn_url + img.Name + '" alt="" />');
}

function renderOrg(data) {
    var contentData = JSON.parse(data.DataList);

    var img = getNameByKey('ImageDesktop', contentData);
    $('.img-org').html('<img src="' + cdn_url + img.Name + '" class="d-block mx-auto img-fluid" loading="lazy" alt="" />');
}

function renderTechnical(data) {
    var contentData = JSON.parse(data.DataList);

    var title = getNameByKey('Name', contentData);
    var desc = getNameByKey('Description', contentData);
    var img = getNameByKey('Image', contentData);

    $('.technical-title').html(lang === 'VN' ? title.NameVN : title.Name);
    $('.technical-desc').html(lang === 'VN' ? desc.NameVN : desc.Name);
    $('.technical-img').html('<img src="' + cdn_url + img.Name + '" alt="" />');
}

function renderProducts() {
    $.post(data_api_url + "/introduce/products",
        function (response) {
            var html = '';
            $.map(response.ResponseData, function (item) {
                var icon = JSON.parse(item.Icon);
                html += '<div class="col-12 col-md-6 col-lg-3 d-flex">';
                html += '    <div class="gt-sp-item w-100">';
                html += '        <div class="img">';
                html += '           <img src="' + cdn_url + icon.Val + '" class="img-fluid" />';
                html += '       </div>';
                html += '        <div class="tt h5">' + (lang === 'VN' ? item.ItemNameVN : item.ItemName)  + '</div>';
                html += '       <div class="sp text-gray-600">';
                html += '           ' + (lang === 'VN' ? item.ItemDescriptionVN : item.ItemDescription) + '';
                html += '        </div>';
                html += '    </div>';
                html += '</div>';
            });
            $('.product-list').html(html);
        }
    )
}
