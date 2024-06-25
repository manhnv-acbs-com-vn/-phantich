
renderTypeList();
function renderTypeList() {
    $.post(data_api_url + "/terms-of-user/get-list",function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var jsDataBanner = response.ResponseData.filter(obj => {
                        return obj.PSCode === "1140.1141";
                    });
                    $.map(jsDataBanner, function (item) {
                        $.map(JSON.parse(item.DataList), function (itemsub) {
                            if (itemsub.Key == 'Name')
                                itemName = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'Image')
                                itemImage = cdn_url + itemsub.Image;
                            if (itemsub.Key == 'Breadcrumb')
                                itemBreadcrumb= lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        });                        
                    });
                   
                    $('#banner-top-id').append('<div class="container px-4 px-md-3 text-center">' +
                        '    <h1 class="text-primary-2">' + itemName+'</h1>' +
                        '</div>');

                    $('#bread-crumd-id').append(itemBreadcrumb);
                    document.getElementById("banner-top-id").style.backgroundImage = "url('" + itemImage + "')";

                    var jsDataContent = response.ResponseData.filter(obj => {
                        return obj.PSCode === "1140.1143";
                    });
                    $.map(jsDataContent, function (item) {
                        $.map(JSON.parse(item.DataList), function (itemsub) {
                            if (itemsub.Key == 'Content')
                                itemContent = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                           
                        });
                    });
                    $('#contain-id').append(itemContent);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
    });

}
