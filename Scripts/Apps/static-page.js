function initPage() {
    var langKeys = ['Common_Text_1', 'Common_Text_2', 'Common_Text_6'];
    loadDefaultLanguage(langKeys);
    loadPageContent();
}

function loadPageContent() {
    $.post(data_api_url + "/common/load-page-content",
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