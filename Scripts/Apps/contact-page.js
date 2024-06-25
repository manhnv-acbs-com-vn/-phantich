
renderTypeList();
function renderTypeList() {
    $.post(data_api_url + "/contact-page/get-type-list",function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    var jsData = response.ResponseData.filter(obj => {
                        return obj.PSCode === "1099.1100";
                    });
                    var htmlInner = '';
                    $.map(jsData, function (item) {
                        $.map(JSON.parse(item.DataList), function (itemsub) {
                            if (itemsub.Key == 'Name')
                                itemName = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'Banner')
                                itemBanner = lang === 'EN' ? cdn_url + itemsub.Image : cdn_url + itemsub.Image;
                            if (itemsub.Key == 'Breadcrumb')
                                itemBreadcrumb= lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'Description')
                                itemDescription = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'FormAction')
                                itemFormAction = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            if (itemsub.Key == 'SwiperSlide')
                                itemSwiperSlide = lang === 'EN' ? itemsub.Name : itemsub.NameVN;
                            
                        });
                        htmlInner = '' +
                             '<section class="page-heading" style="background-image: url(' + itemBanner+')">                          ' +
                            '    <div class="container px-4 px-md-3 text-center">                                                                                                      ' +
                             '        <h1 class="text-primary-2">' + itemName+'</h1>                                                                                                 ' +
                            '    </div>                                                                                                                                                ' +
                            '</section>                                                                                                                                                ' +
                            '<div class="acbs-breadcrumb">                                                                                                                             ' +
                             '    ' + itemBreadcrumb+'                                                                                                                                                ' +
                            '</div>                                                                                                                                                    ' +
                            '<section class="bdh-section section-normal less-space">                                                                                                   ' +
                            '    <div class="container px-4 px-md-3">                                                                                                                  ' +
                            '        <div class="row">                                                                                                                                 ' +
                             '            ' + itemDescription+'                                                                                                                                        ' +
                            '            <div class="col-12 col-lg-4 order-1 order-lg-2">                                                                                              ' +
                             '                ' + itemFormAction+'                                                                                                                                   ' +
                            '            </div>                                                                                                                                        ' +
                            '        </div>                                                                                                                                            ' +
                            '<div class="row">                                       ' +
                            '    <div class=" swiper swiper-location">               ' +
                            '       <div class="swiper-wrapper" id="swiper-wrapper-id"> ' +
                            '                                                        ' +
                            '       </div>                                          ' +
                            '       <div class="swiper-pagination"></div>           ' +
                            '    </div>                                              ' +
                            '</div>     ' + itemSwiperSlide +'                                              ' +
                            

                            '    </div>                                                                                                                                                ' +
                            '</section>                                                                                                                                                ' +
                                    
                            '<div class="container success-submit" id="success-popup">                             ' +
                            '    <img class="mb-3" src="/Templates/img/Export/tuyen-dung/success-icon.svg" alt=""> ' +
                            '    <p class="complete-sentence fw-bold">                                             ' +
                            '        Thông tin liên hệ đã gửi đến ACBS,<br>                                        ' +
                            '        xin cảm ơn quý khách hàng.                                                    ' +
                            '    </p>                                                                              ' +
                            '                                                                                      ' +
                            '</div>                                                                                ' +
                            '<div class="container success-submit" id="erro-popup">                                ' +
                            '    <img class="mb-3" src="/Templates/img/Export/tuyen-dung/error-icon.svg" alt="">   ' +
                            '    <p class="complete-sentence fw-bold">                                             ' +
                            '        chưa nhập đủ thông tin !!!                                                    ' +
                            '    </p>                                                                              ' +
                            '</div>                                                                                '
                    });
                    $('#content-id').append(htmlInner);
                }
            }
            else {
                console.log(response.ResponseMessage);
            }
    });

    GetListSlide();
}

function ActionForm() {
    var descriptionvl = $('#description-id').val();
    var titlevl = $('#title-id').val();
    var phonevl = $('#phone-id').val();
    var emailvl = $('#email-id').val();
    var fullnamevl = $('#full-name-id').val();

    if (descriptionvl == '') {
        $("#erro-popup").show().delay(1500).fadeOut("slow");
        return;
    }
    else if (titlevl == '') {
        $("#erro-popup").show().delay(1500).fadeOut("slow");
        return;
    }
    else if (phonevl == '') {
        $("#erro-popup").show().delay(1500).fadeOut("slow");
        return;
    }
    else if (emailvl == '') {
        $("#erro-popup").show().delay(1500).fadeOut("slow");
        return;
    }
    else if (fullnamevl == '') {
        $("#erro-popup").show().delay(1500).fadeOut("slow");
        return;
    }
    else {
        SaveContact(fullnamevl, emailvl, phonevl, descriptionvl, titlevl);
    }
}

function SaveContact(fullname, email, phone, description,title) {
    $.post(data_api_url + "/contact-page/save-contact",
        { Fullname: fullname, Email: email, Phone: phone, Description: description, Title: title },
        function (response) {
            console.log(response);
            $('#description-id').val('');
            $('#title-id').val('');
            $('#phone-id').val('');
            $('#email-id').val('');
            $('#full-name-id').val('');
            $("#success-popup").show().delay(1500).fadeOut("slow");
            
        });
}

function GetListSlide() {
    $.post(data_api_url + "/contact-page/get-list-slide", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                
                var htmlInner = '';
                var iNumber = 0;
                $.map(response.ResponseData, function (item) {                    
                    iNumber = iNumber + 1;
                    if (iNumber == 1) {
                        htmlInner += '<div class="swiper-slide">                                                   ';
                        htmlInner += '  <div class="col-12 col-lg-4 align-self-stretch map-location-container ">   ';
                        htmlInner += '    <div class="py-3 px-4 map-location active h-100">                        ';
                        htmlInner += '      <p class="fw-bold mb-2">' + (lang === 'EN' ? item.LocationName : item.LocationNameVN) + '</p>                                     ';
                        htmlInner += '      <a class="map-navigate fw-bold"                                        ';
                        htmlInner += '        data-src="' + item.GoogleMap + '">              ';
                        htmlInner += '        Số 41 Mạc Đĩnh Chi, Phường Đakao, Quận 1, TP.HCM                     ';
                        htmlInner += '      </a>                                                                   ';
                        htmlInner += '      <p class="mb-0">Điện thoại: ' + item.PhoneNumber + '</p>                        ';
                        htmlInner += '    </div>                                                                   ';
                        htmlInner += '  </div>                                                                     ';
                        htmlInner += '</div>                                                                       ';                                                                        

                    }
                    else {
                        htmlInner += '<div class="swiper-slide">                                                   ';
                        htmlInner += '  <div class="col-12 col-lg-4 align-self-stretch map-location-container ">   ';
                        htmlInner += '    <div class="py-3 px-4 map-location  h-100">                        ';
                        htmlInner += '      <p class="fw-bold mb-2">' + (lang === 'EN' ? item.LocationName : item.LocationNameVN) + '</p>                                     ';
                        htmlInner += '      <a class="map-navigate fw-bold" data-src="' + item.GoogleMap + '">              ';
                        htmlInner += '        ' + item.Address+'                     ';
                        htmlInner += '      </a>                                                                   ';
                        htmlInner += '      <p class="mb-0">Điện thoại: ' + item.PhoneNumber + '</p>                        ';
                        htmlInner += '    </div>                                                                   ';
                        htmlInner += '  </div>                                                                     ';
                        htmlInner += '</div>                                                                       ';                                                                        

                    }
                   
                });
                $('#swiper-wrapper-id').html(htmlInner);
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}


$('.map-navigate').each(function () {
    var mapNavigate = $(this);
    var iFrame = $('#map-iframe');
    var sourceMap = $(this).data('src');
    $(this).on('click', function () {
        $('.map-location').removeClass('active');
        mapNavigate.parent(".map-location").addClass('active');
        iFrame.attr('src', sourceMap);
    })
})

function onSubmit(token) {
    document.getElementById("demo-form").submit();
}