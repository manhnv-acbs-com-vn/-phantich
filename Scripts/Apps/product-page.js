
renderTypeList();
function renderTypeList() {
    $.post(data_api_url + "/product-page/get-type-list",function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var jsDataDVCK = response.ResponseData.filter(obj => {
                        return obj.PSCode === "1048.1050";
                    });
                    var htmlDVCK = '';
                    $.map(jsDataDVCK, function (item) {
                        $.map(JSON.parse(item.DataList), function (itemsub) {
                            if (itemsub.Key == 'Name')
                                itemName = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID1.Banner')
                                itemID1Banner = lang === 'EN' ? cdn_url + itemsub.Image : cdn_url + itemsub.Image;
                            if (itemsub.Key == 'ID1.Name')
                                itemID1Name = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID1.Description')
                                itemID1Description = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID2.Banner')
                                itemID2Banner = lang === 'EN' ? cdn_url + itemsub.Image : cdn_url + itemsub.Image;
                            if (itemsub.Key == 'ID2.Name')
                                itemID2Name = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID2.Description')
                                itemID2Description = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID3.Banner')
                                itemID3Banner = lang === 'EN' ? cdn_url + itemsub.Image : cdn_url + itemsub.Image;
                            if (itemsub.Key == 'ID3.Name')
                                itemID3Name = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID3.Description')
                                itemID3Description = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'Breadcrumb')
                                itemBreadcrumb = lang === 'EN' ? itemsub.Name : itemsub.NameVN;

                        });

                         htmlDVCK = '                <h1 class="section-number">01</h1>' +
                            '<div class="container px-4 px-md-3 product-section-t1">                                              ' +
                            '    <div class="row">                                                                                ' +
                            '        <div class="section-normal-title">                                                           ' +
                            '            <h2 class="h1 fw-bold text-primary mb-0">                                                ' +
                             '               ' + itemName + '                       ' +
                            '            </h2>                                                                                    ' +
                            '        </div>                                                                                       ' +
                            '        <div class="col-12 col-lg-4 product-section-t1-item align-self-stretch mb-3">                ' +
                            '            <div class="product-section-t1-item-container h-100 p-4 pb-5"                            ' +
                             '                 style="background:url(' + itemID1Banner+')">           ' +
                             '                <h3 class="text-primary-2 pb-4">' + itemID1Name+'</h3>                            ' +
                             '                ' + itemID1Description+'                                                                                ' +
                            '            </div>                                                                                   ' +
                            '        </div>                                                                                       ' +
                            '        <div class="col-12 col-lg-4 product-section-t1-item align-self-stretch mb-3">                ' +
                            '            <div class="product-section-t1-item-container h-100 p-4 pb-5"                            ' +
                             '                 style="background:url(' + itemID2Banner+')">           ' +
                            '                <h3 class="text-primary-2 pb-4">                                                     ' +
                             '                    ' + itemID2Name+'                                                        ' +
                            '                </h3>                                                                                ' +
                            '                <ul class="list-unstyled">                                                           ' +
                             '                    ' + itemID2Description +'                                                                           ' +
                            '                </ul>                                                                                ' +
                            '            </div>                                                                                   ' +
                            '        </div>                                                                                       ' +
                            '        <div class="col-12 col-lg-4 product-section-t1-item align-self-stretch mb-3">                ' +
                            '            <div class="product-section-t1-item-container h-100 p-4 pb-5"                            ' +
                             '                 style="background:url(' + itemID3Banner +')">           ' +
                            '                <h3 class="text-primary-2 pb-4">                                                     ' +
                             '                    ' + itemID3Name +'                                                         ' +
                            '                </h3>                                                                                ' +
                            '                <ul class="list-unstyled">                                                           ' +
                             '                    ' + itemID3Description +'                                                                            ' +
                            '                </ul>                                                                                ' +
                            '            </div>                                                                                   ' +
                            '        </div>                                                                                       ' +
                            '    </div>                                                                                           ' +
                            '</div>                                                                                               ' 

                            
                    });
                    
                    $("#dvck-id").html(htmlDVCK);
                    $("#breadcrumd-id").html(itemBreadcrumb);

                    var jsDataTCGD = response.ResponseData.filter(obj => {
                        return obj.PSCode === "1048.1051";
                    });
                    var htmlTCGD = '';
                    $.map(jsDataTCGD, function (item) {
                        $.map(JSON.parse(item.DataList), function (itemsub) {
                            if (itemsub.Key == 'Name')
                                itemName = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID1.Banner')
                                itemID1Banner = lang === 'EN' ? cdn_url + itemsub.Image : cdn_url + itemsub.Image;
                            if (itemsub.Key == 'ID1.Name')
                                itemID1Name = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID1.Description')
                                itemID1Description = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID2.Banner')
                                itemID2Banner = lang === 'EN' ? cdn_url + itemsub.Image : cdn_url + itemsub.Image;
                            if (itemsub.Key == 'ID2.Name')
                                itemID2Name = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID2.Description')
                                itemID2Description = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID3.Banner')
                                itemID3Banner = lang === 'EN' ? cdn_url + itemsub.Image : cdn_url + itemsub.Image;
                            if (itemsub.Key == 'ID3.Name')
                                itemID3Name = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'ID3.Description')
                                itemID3Description = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                        });
                        htmlTCGD =  ' <h1 class="section-number">02</h1>'+
                                    '<div class="container px-4 px-md-3 product-section-t1">                            ' +                      
                                    '    <div class="row">                                                                                     '+
                                    '        <div class="section-normal-title">                                                                '+
                                    '            <h2 class="h1 fw-bold text-primary mb-0">                                                     '+
                                    '                ' + itemName+'                               '+
                                    '            </h2>                                                                                         '+
                                    '        </div>                                                                                            '+
                                    '        <a href="" class="col-12 col-lg-4 product-section-t1-item align-self-stretch mb-3">               '+
                                    '            <div class="product-section-t1-item-container h-100 p-4 pb-5"                                 '+
                                    '                 style="background:url(' + itemID1Banner+')">                '+
                                    '                <h3 class="text-primary-2 pb-4">' + itemID1Name +'</h3>                                    '+
                                    '                ' + itemID1Description+'                                                                                     '+
                                    '            </div>                                                                                        '+
                                    '        </a>                                                                                              '+
                                    '        <a href="" class="col-12 col-lg-4 product-section-t1-item align-self-stretch mb-3">               '+
                                    '            <div class="product-section-t1-item-container h-100 p-4 pb-5"                                 '+
                                    '                 style="background:url(' + itemID2Banner +')">                '+
                                    '                <h3 class="text-primary-2 pb-4">                                                          '+
                                    '                    ' + itemID2Name +'                                                                           '+
                                    '                </h3>                                                                                     '+
                                    '                ' + itemID2Description +'                                                                                       '+
                                    '            </div>                                                                                        '+
                                    '        </a>                                                                                              '+
                                    '        <a href="" class="col-12 col-lg-4 product-section-t1-item align-self-stretch mb-3">               '+
                                    '            <div class="product-section-t1-item-container h-100 p-4 pb-5"                                 '+
                                    '                 style="background:url(' + itemID3Banner +')">                '+
                                    '                <h3 class="text-primary-2 pb-4">                                                          '+
                                    '                    ' + itemID3Name +'                                                                       '+
                                    '                </h3>                                                                                     '+
                                    '                ' + itemID3Description +'                                                                                       '+
                                    '            </div>                                                                                        '+
                                    '        </a>                                                                                              '+
                                    '    </div>                                                                                                '+
                                    '</div>                                                                                                    '

                    });

                    $("#tcgd-id").html(htmlTCGD);

                    var jsDataTIHT = response.ResponseData.filter(obj => {
                        return obj.PSCode === "1048.1052";
                    });
                    var htmlTIHT = '';
                    $.map(jsDataTIHT, function (item) {
                        $.map(JSON.parse(item.DataList), function (itemsub) {
                            if (itemsub.Key == 'Name')
                                itemName = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'Description')
                                itemDescription = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'List')
                                itemList = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            
                        });
                        htmlTIHT = '' +
                            '<h1 class="section-number">03</h1>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ' +
                            '<div class="container px-4 px-md-3 product-section-t1">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ' +
                            '    <div class="row">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ' +
                            '        <div class="section-normal-title">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ' +
                            '            <h2 class="h1 fw-bold text-primary mb-0">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ' +
                                                    '                ' + itemName+'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ' +
                            '            </h2>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ' +
                            '        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ' +
                            '       ' + itemDescription +'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ' +
                            '    </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ' +
                            '    ' + itemList+'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ' +
                            '</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ' +                        
                            ''
                    });

                    $("#tiht-id").html(htmlTIHT);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
        });
}



