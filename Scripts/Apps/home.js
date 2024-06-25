LoadData();

function LoadData() {
    $.post(data_api_url + "/home-page/get-list", function (response) {        
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                $.map(response.ResponseData, function (item) {
                    if (item.PSCode == "1010.1019")
                        ViewS1(item);
                    if (item.PSCode == "1010.1020")
                        ViewS2(item);
                    if (item.PSCode == "1010.1021")
                        ViewS3(item);
                    if (item.PSCode == "1010.1022")
                        ViewS4(item);
                    if (item.PSCode == "1010.1023")
                        ViewS5(item);
                    if (item.PSCode == "1010.1031")
                        ViewS6(item);
                });                
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function ViewS1(data) {
    var htmlRegder = '';   
    var itemImage = '';
    var itemTitle = '';
    var itemDescription = '';
    var itemButtonText = '';
    var itemButtonLink = '';
    var itemCardTitle = '';
    var itemCardLoginTitle = '';
    var itemCardLoginUrl = '';
    var itemCardRegister = '';
    var itemCardRegisterLink = '';
    var itemCardUserGuide = '';
    console.log(data.DataList);
    $.map(JSON.parse(data.DataList), function (item) {
        
        if (item.Key == 'Image')
             itemImage = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Title')
            itemTitle = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Name')
            itemName = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Description')
            itemDescription = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'ButtonText')
            itemButtonText = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'ButtonLink')
            itemButtonLink = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card.Title')
            itemCardTitle = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card.LoginTitle')
            itemCardLoginTitle = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card.LoginUrl')
            itemCardLoginUrl = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card.Register')
            itemCardRegister = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card.RegisterLink')
            itemCardRegisterLink = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card.UserGuide')
            itemCardUserGuide = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card.UserGuideLink')
            itemCardUserGuideLink = lang === 'EN' ? item.Name : item.NameVN;
                                                                                                                                                                                                                           
    });
    var imgLink = cdn_url + itemImage; 
    var itemOr = lang === 'EN' ? 'or' : 'hoặc';
    //htmlRegder += '  <section class="acb-hero" style="background-image: url(' + imgLink + ');"> ';
    htmlRegder += '    <div class="container px-4 px-md-3">                                                                                                                                                                                       ';
    htmlRegder += '        <div class="row align-items-center">                                                                                                                                                                                   ';
    htmlRegder += '            <div class="col-12 col-lg-7 position-relative" style="z-index: 1;">                                                                                                                                                ';
    htmlRegder += '                <h1 class="text-primary-2 title">                                                                                                                                                                              ';
    htmlRegder += '                                                                                                                                                                                                                               ';
    htmlRegder += '                    <span class="d-block text-white fw-normal">' + itemTitle + '</span>            ';
    htmlRegder += '                    ' + itemName + '                                                               ';
    htmlRegder += '                </h1>                                                                                                                                                                                                          ';
    htmlRegder += '                <p class="lead fw-light mt-3">                                                                                                                                                                                 ';
    htmlRegder += '                    ' + itemDescription + '                                                ';
    htmlRegder += '                </p>                                                                                                                                                                                                           ';
    htmlRegder += '                <div class="mt-3 mt-lg-5">                                                                                                                                                                                     ';
    htmlRegder += '                    <a href="' + itemButtonLink+'" class="btn btn-lg btn-primary-2 text-primary fw-bold cta">                                                                                                                           ';
    htmlRegder += '                        <span>' + itemButtonText + '</span>                                   ';
    htmlRegder += '                    </a>                                                                                                                                                                                                  ';
    htmlRegder += '                </div>                                                                                                                                                                                                         ';
    htmlRegder += '                <img class="hero-bg-logo" src="/Templates/img/bg-acbs-logo.png " />                                                                                                                                            ';
    htmlRegder += '            </div>                                                                                                                                                                                                             ';
    htmlRegder += '            <div class="col-12 col-lg-5">                                                                                                                                                                                      ';
    htmlRegder += '                <div class="hero-register">                                                                                                                                                                                    ';
    htmlRegder += '                    <h2 class="text-primary-2 text-center mb-4 title">                                                                                                                                                         ';
    htmlRegder += '                        ' + itemCardTitle + '                                             ';
    htmlRegder += '                                                                                                                                                                                                                               ';
    htmlRegder += '                    </h2>                                                                                                                                                                                                      ';
    htmlRegder += '                    <a href="' + itemCardLoginUrl+'" class="btn btn-c1 w-100 d-block btn-light btn-lg font-sm fw-bold">                                                                                                                                 ';
    htmlRegder += '                        ' + itemCardLoginTitle + '                                    ';
    htmlRegder += '                    </a>                                                                                                                                                                                                  ';
    htmlRegder += '                    <div class="text-center fs-12 py-3">                                                                                                                                                                       ';
    htmlRegder += '                        ' + itemOr + '                                                                                                                                                                    ';
    htmlRegder += '                                                                                                                                                                                                                               ';
    htmlRegder += '                    </div>                                                                                                                                                                                                     ';
    htmlRegder += '                    <a href="' + itemCardRegisterLink +'" class="btn btn-c1 w-100 d-block btn-primary btn-lg font-sm fw-bold">                                                                                                                               ';
    htmlRegder += '                        ' + itemCardRegister + '                                          ';
    htmlRegder += '                    </a>                                                                                                                                                                                                  ';
    htmlRegder += '                    <div class="text-center mt-3">                                                                                                                                                                             ';
    htmlRegder += '                        <a class="link-primary-2 htu fs-14" href="' + itemCardUserGuideLink+'">                                                                                                                                                          ';
    htmlRegder += '                            ' + itemCardUserGuide + '                                   ';
    htmlRegder += '                        </a>                                                                                                                                                                                                   ';
    htmlRegder += '                    </div>                                                                                                                                                                                                     ';
    htmlRegder += '                </div>                                                                                                                                                                                                         ';
    htmlRegder += '            </div>                                                                                                                                                                                                             ';
    htmlRegder += '        </div>                                                                                                                                                                                                                 ';
    htmlRegder += '    </div>                                                                                                                                                                                                                     ';
    //htmlRegder += '</section>                                                                                                                                                                                                                     ';
    $('#views1').html(htmlRegder);
    document.getElementById("views1").style.backgroundImage = "url('" + imgLink+"')";
}

function ViewS2(data) {
    var htmlRegder = '';
    var itemImage = '';
    var itemTitle = '';
    var itemName = '';
    var itemButtonText = '';
    var itemButtonLink = '';
    //htmlRegder += '<section class="acbs-quickaccess">                                                                                                                                                                                                                   ';
    htmlRegder += '    <div class="container-fluid">                                                                                                                                                                                                                    ';
    htmlRegder += '        <div class="row">                                                                                                                                                                                                                            ';
    var textKey = '';
    $.map(JSON.parse(data.DataList), function (item) {        
        
        if (textKey == "" || item.Key.split('.')[0] == textKey) {
            textKey = item.Key.split('.')[0];
            if (item.Key.split('.')[1] == 'Image')
                itemImage = lang === 'EN' ? item.Name : item.NameVN;
            if (item.Key.split('.')[1] == 'Title')
                itemTitle = lang === 'EN' ? item.Name : item.NameVN;
            if (item.Key.split('.')[1] == 'Name')
                itemName = lang === 'EN' ? item.Name : item.NameVN;
            if (item.Key.split('.')[1] == 'ButtonText')
                itemButtonText = lang === 'EN' ? item.Name : item.NameVN;
            if (item.Key.split('.')[1] == 'ButtonLink')
                itemButtonLink = lang === 'EN' ? item.Name : item.NameVN;
        }

        if (item.Key.split('.')[0] != textKey) {
            textKey = item.Key.split('.')[0];
            var imgLink = cdn_url + itemImage;
            htmlRegder += '                    <div class="col-6 col-md-6 col-lg-6 col-xl-3 acbs-quickaccess__item">                                                                                                                                                            ';
            htmlRegder += '                        <a href="' + itemButtonLink+'" class="acbs-quickaccess__item__content link-dark-blue">';
            htmlRegder += '                            <div class="acbs-quickaccess__item__content__icon">                                                                                                                                                                      ';
            htmlRegder += '                                <img src="' + imgLink + '" />                                    ';
            htmlRegder += '                            </div>                                                                                                                                                                                                                   ';
            htmlRegder += '                            <h2 class="h4">                                                                                                                                                                                                          ';
            htmlRegder += '                                ' + itemName + '                                                                        ';
            htmlRegder += '                            </h2>                                                                                                                                                                                                                    ';
            htmlRegder += '                                                                                                                                                                                                                                                     ';
            htmlRegder += '                            <p class="mb-0">                                                                                                                                                                                                         ';
            htmlRegder += '                                ' + itemTitle + '                                                                      ';
            htmlRegder += '                            </p>                                                                                                                                                                                                                     ';
            htmlRegder += '                            <button class="quickaccess-button acbs-button-bold">                                                                                                                                                                     ';
            htmlRegder += '                                ' + itemButtonText + '                                                            ';
            htmlRegder += '                            </button>                                                                                                                                                                                                                ';
            htmlRegder += '                        </a>                                                                                                                                                                                                                         ';
            htmlRegder += '                    </div>                                                                                                                                                                                                                           ';

            if (item.Key.split('.')[1] == 'Image')
                itemImage = lang === 'EN' ? item.Name : item.NameVN;
            if (item.Key.split('.')[1] == 'Title')
                itemTitle = lang === 'EN' ? item.Name : item.NameVN;
            if (item.Key.split('.')[1] == 'Name')
                itemName = lang === 'EN' ? item.Name : item.NameVN;
            if (item.Key.split('.')[1] == 'ButtonText')
                itemButtonText = lang === 'EN' ? item.Name : item.NameVN;
            if (item.Key.split('.')[1] == 'ButtonLink')
                itemButtonLink = lang === 'EN' ? item.Name : item.NameVN;
        }        

    });
    htmlRegder += '                    <div class="col-6 col-md-6 col-lg-6 col-xl-3 acbs-quickaccess__item">                                                                                                                                                            ';
    htmlRegder += '                        <a href="' + itemButtonLink + '" class="acbs-quickaccess__item__content link-dark-blue">';
    htmlRegder += '                            <div class="acbs-quickaccess__item__content__icon">                                                                                                                                                                      ';
    htmlRegder += '                                <img src="' + cdn_url + itemImage + '" />                                    ';
    htmlRegder += '                            </div>                                                                                                                                                                                                                   ';
    htmlRegder += '                            <h2 class="h4">                                                                                                                                                                                                          ';
    htmlRegder += '                                ' + itemName + '                                                                        ';
    htmlRegder += '                            </h2>                                                                                                                                                                                                                    ';
    htmlRegder += '                                                                                                                                                                                                                                                     ';
    htmlRegder += '                            <p class="mb-0">                                                                                                                                                                                                         ';
    htmlRegder += '                                ' + itemTitle + '                                                                      ';
    htmlRegder += '                            </p>                                                                                                                                                                                                                     ';
    htmlRegder += '                            <button class="quickaccess-button acbs-button-bold">                                                                                                                                                                     ';
    htmlRegder += '                                ' + itemButtonText + '                                                            ';
    htmlRegder += '                            </button>                                                                                                                                                                                                                ';
    htmlRegder += '                        </a>                                                                                                                                                                                                                         ';
    htmlRegder += '                    </div>                                                                                                                                                                                                                           ';
    htmlRegder += '        </div>                                                                                                                                                                                                                                       ';
    htmlRegder += '    </div>                                                                                                                                                                                                                                           ';
    //htmlRegder += '</section>                                                                                                                                                                                                                                           ';

    $('#views2').html(htmlRegder);
}

function ViewS3(data) {
    var htmlRegder = '';
    var itemImage = '';
    var itemTitle = '';
    var itemName = '';
    var itemCard1Text = '';
    var itemCard1Link = '';
    var itemCard2Text = '';
    var itemCard2Link = '';
    var itemCard3Text = '';
    var itemCard3Link = '';
    $.map(JSON.parse(data.DataList), function (item) {
        if (item.Key == 'Image')
            itemImage = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Title')
            itemTitle = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Name')
            itemName = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card1.Text')
            itemCard1Text = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card1.Link')
            itemCard1Link = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card2.Text')
            itemCard2Text = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card2.Link')
            itemCard2Link = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card3.Text')
            itemCard3Text = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Card3.Link')
            itemCard3Link = lang === 'EN' ? item.Name : item.NameVN;
        

    });
    var imgLink = cdn_url + itemImage;

    var itemOr = lang === 'EN' ? 'or' : 'hoặc';
    //htmlRegder += '<section class="acbs-newcomer" style="background-image: url(' + imgLink + ');"> ';
    htmlRegder += '    <div class="container px-4 px-md-3">                                                                                                                                                                                          ';
    htmlRegder += '        <div class="acbs-newcomer__container">                                                                                                                                                                                    ';
    htmlRegder += '            <div class="acbs-newcomer__container__description">                                                                                                                                                                   ';
    htmlRegder += '                <h1 class="acbs-display-big-light">                                                                                                                                                                               ';
    htmlRegder += '                    ' + itemName + '                                                                   ';
    htmlRegder += '                </h1>                                                                                                                                                                                                             ';
    htmlRegder += '                <p class="acbs-body-1 mb-0">                                                                                                                                                                                      ';
    htmlRegder += '                    ' + itemTitle + '                                                                 ';
    htmlRegder += '                </p>                                                                                                                                                                                                              ';
    htmlRegder += '            </div>                                                                                                                                                                                                                ';
    htmlRegder += '            <div class="acbs-newcomer__container__question">                                                                                                                                                                      ';
    htmlRegder += '                <div class="question-item">                                                                                                                                                                                       ';
    htmlRegder += '                    <h1 class="question-item__title">1.</h1>                                                                                                                                                                      ';
    htmlRegder += '                    <a class="link-dark-blue h5 fs-light" href="' + itemCard1Link + '">         ';
    htmlRegder += '                        ' + itemCard1Text + '                                                   ';
    htmlRegder += '                    </a>                                                                                                                                                                                                          ';
    htmlRegder += '                </div>                                                                                                                                                                                                            ';
    htmlRegder += '                <div class="question-item">                                                                                                                                                                                       ';
    htmlRegder += '                    <h1 class="question-item__title">2.</h1>                                                                                                                                                                      ';
    htmlRegder += '                    <a class="link-dark-blue h5 fs-light" href="' + itemCard2Link + '">         ';
    htmlRegder += '                        ' + itemCard2Text + '                                                   ';
    htmlRegder += '                    </a>                                                                                                                                                                                                          ';
    htmlRegder += '                </div>                                                                                                                                                                                                            ';
    htmlRegder += '                <div class="question-item">                                                                                                                                                                                       ';
    htmlRegder += '                    <h1 class="question-item__title">3.</h1>                                                                                                                                                                      ';
    htmlRegder += '                    <a class="link-dark-blue h5 fs-light" href="' + itemCard3Link + '">         ';
    htmlRegder += '                        ' + itemCard3Text + '                                                   ';
    htmlRegder += '                    </a>                                                                                                                                                                                                          ';
    htmlRegder += '                </div>                                                                                                                                                                                                            ';
    htmlRegder += '            </div>                                                                                                                                                                                                                ';
    htmlRegder += '        </div>                                                                                                                                                                                                                    ';
    htmlRegder += '    </div>                                                                                                                                                                                                                        ';
    //htmlRegder += '</section>                                                                                                                                                                                                                        ';
    $('#views3').html(htmlRegder);
    document.getElementById("views3").style.backgroundImage = "url('" + imgLink + "')";
}

function ViewS4(data) {
    var htmlRegder = '';
    var itemImagetLink = '';
    //htmlRegder += '<section class="acbs-banners">                                                                      ';
    htmlRegder += '    <div class="swiper-banner">                                                                     ';
    htmlRegder += '        <div class="swiper-wrapper">                                                                ';

    $.map(JSON.parse(data.DataList), function (item) {
        itemImagetLink = lang === 'EN' ? cdn_url + item.Name : cdn_url + item.NameVN;
        
        htmlRegder += '                <div class="swiper-slide">                                                          ';
        htmlRegder += '                    <a href="' + item.Link + '">                                                                     ';
        htmlRegder += '                    <img src="' + itemImagetLink+'" /> ';
        htmlRegder += '                    </a>                                                                            ';
        htmlRegder += '                </div>                                                                              ';
        
    });

    htmlRegder += '        </div>                                                                                      ';
    htmlRegder += '        <div class="swiper-pagination"></div>                                                       ';
    htmlRegder += '        <div class="swiper-shadow swiper-shadow--prev"></div>                                       ';
    htmlRegder += '        <div class="swiper-shadow swiper-shadow--next"></div>                                       ';
    htmlRegder += '        <div class="swiper-button-prev">                                                            ';
    htmlRegder += '            <img src="/Templates/img/Arrow-left.svg" alt="" />                                      ';
    htmlRegder += '        </div>                                                                                      ';
    htmlRegder += '        <div class="swiper-button-next">                                                            ';
    htmlRegder += '            <img src="/Templates/img/Arrow-right.svg" alt="" />                                     ';
    htmlRegder += '        </div>                                                                                      ';
    htmlRegder += '    </div>                                                                                          ';
    //htmlRegder += '</section>                                                                                          ';
    $('#views4').html(htmlRegder);
}

function ViewS5(data) {
    var htmlRegder = '';
    var itemTabpillshome = '';
    var itemTabpillsprofile = '';
    var itemName = '';
    var itemButton = '';
    var itemTop10stocks = '';
    var itemLinkHomeTTPT = '';
    $.map(JSON.parse(data.DataList), function (item) {
        if (item.Key == 'Tab-pills-home')
            itemTabpillshome = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Tab-pills-profile')
            itemTabpillsprofile = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Name')
            itemName = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Button')
            itemButton = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Top-10-stocks')
            itemTop10stocks = lang === 'EN' ? item.Name : item.NameVN;   
        if (item.Key == 'Tab-pills-bctq')
            itemTabpillbctq = lang === 'EN' ? item.Name : item.NameVN;
        if (item.Key == 'Link.home.ttpt')
            itemLinkHomeTTPT = lang === 'EN' ? item.Name : item.NameVN;   
    });
    
    htmlRegder += '    <div class="container px-4 px-md-3">                                                                                                                                                                          ';
    htmlRegder += '        <div class="section-normal-title">                                                                                                                                                                        ';
    htmlRegder += '            <h2 class="h1 fw-bold text-primary text-center mb-0">                                                                                                                                                 ';
    htmlRegder += '                ' + itemName + '                                                      ';
    htmlRegder += '            </h2>                                                                                                                                                                                                 ';
    htmlRegder += '            </div>                                                                                                                                                                                                ';
    htmlRegder += '        <div class="row">                                                                                                                                                                                         ';
    htmlRegder += '            <div class="col-12">                                                                                                                                                                                  ';
    htmlRegder += '                <ul class="nav nav-pills mb-3 mb-lg-4 acb-nav-pills" id="pills-tab" role="tablist">                                                                                                               ';
    htmlRegder += '                    <li class="nav-item" role="presentation">                                                                                                                                                     ';
    htmlRegder += '                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">          ';
    htmlRegder += '                            <img class="icon me-1 me-md-2" src="/Templates/img/phan-tich-co-phieu-ACTIVE.svg" />                                                                                                  ';
    htmlRegder += '                            <span>' + itemTabpillshome+'</span>          ';
    htmlRegder += '                        </button>                                                                                                                                                                                 ';
    htmlRegder += '                    </li>                                                                                                                                                                                         ';
    htmlRegder += '                    <li class="nav-item ms-1" role="presentation">                                                                                                                                                ';
    htmlRegder += '                        <button class="nav-link" id="pills-profile-bctq-tab" data-bs-toggle="pill" data-bs-target="#pills-profile-bctq" type="button" role="tab" aria-controls="pills-profile-bctq" aria-selected="false">       ';
    htmlRegder += '                            <img class="icon me-1 me-md-2" src="/Templates/img/ban-tin-chung-quyen-NORMAL.svg" />                                                                                                 ';
    htmlRegder += '                            <span>' + itemTabpillbctq + '</span>    ';
    htmlRegder += '                        </button>                                                                                                                                                                                 ';
    htmlRegder += '                    </li>                                                                                                                                                                                         ';
    htmlRegder += '                    <li class="nav-item ms-1" role="presentation">                                                                                                                                                ';
    htmlRegder += '                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">       ';
    htmlRegder += '                            <img class="icon me-1 me-md-2" src="/Templates/img/bao-cao-chung-quyen-NORMAL.svg" />                                                                                                 ';
    htmlRegder += '                            <span>' + itemTabpillsprofile  + '</span>    ';
    htmlRegder += '                        </button>                                                                                                                                                                                 ';
    htmlRegder += '                    </li>                                                                                                                                                                                         ';

    htmlRegder += '                </ul>                                                                                                                                                                                             ';
    htmlRegder += '            </div>                                                                                                                                                                                                ';
    htmlRegder += '            <div class="col-12 col-xl-9">                                                                                                                                                                         ';
    htmlRegder += '                <div class="tab-content" id="pills-tabContent">                                                                                                                                                   ';
    htmlRegder += '                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"></div>                                                                                                                                  ';
    htmlRegder += '                    <div class="tab-pane fade" id="pills-profile-bctq" role="tabpanel" aria-labelledby="pills-profile-bctq-tab"> </div>                                                                                                                                 ';
    htmlRegder += '                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"> </div>                                                                                                                                 ';
    htmlRegder += '                </div>                                                                                                                                                                                            ';
    htmlRegder += '            </div>                                                                                                                                                                                                ';
    htmlRegder += '            <div class="col-12 col-xl-3">                                                                                                                                                                         ';
    htmlRegder += '                <div class="ranking">                                                                                                                                                                             ';
    htmlRegder += '                    <h4 class="h5">                                                                                                                                                                               ';
    htmlRegder += '                        ' + itemTop10stocks + '                            ';
    htmlRegder += '                    </h4>                                                                                                                                                                                         ';
    htmlRegder += '                    <div id="TopStocks"></div>                                                                                                                                                        ';
    htmlRegder += '                </div>                                                                                                                                                                                            ';
    htmlRegder += '            </div>                                                                                                                                                                                                ';
    htmlRegder += '        </div>                                                                                                                                                                                                    ';
    htmlRegder += '        <div class="text-center mt-3 mt-lg-4">                                                                                                                                                                    ';
    htmlRegder += '            <a href="' + itemLinkHomeTTPT+'" class="btn btn-primary btn-sm fw-bold btn-c1 px-md-5 px-4">                                                                                                                                ';
    htmlRegder += '                ' + itemButton + '                                                 ';
    htmlRegder += '            </a>                                                                                                                                                                                                  ';
    htmlRegder += '        </div>                                                                                                                                                                                                    ';
    htmlRegder += '    </div>                                                                                                                                                                                                        ';
    htmlRegder += '</div>                                                                                                                                                                                                        ';

    $('#views5').html(htmlRegder);
}

LoadAPTKT();
LoadGBCCQ();
LoadGBCTQ();
LoadStocks();

function LoadAPTKT() {
    var htmlRegder = '';
    $.post(data_api_url + "/home-page/get-news-list?code=G-BCDN", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                htmlRegder += '    <div class="row">                                                                                                                                                        ';
                console.log(response.ResponseData);
                $.map(response.ResponseData, function (item) {
                    var today = new Date(item.EventDate);
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();
                    var Time = Date() - today;
                    today = dd + '/' + mm + '/' + yyyy;
                    var a = new Date(item.EventDate);
                    var b = new Date();
                    var hours = Math.abs(b.getHours() - a.getHours());
                    //var hours = Math.abs(b - a) / 36e5;
                    //console.log(hours)
                    htmlRegder += '            <div class="col-12 col-md-6 col-xl-6 col-xxl-4 d-flex">                                                                                                          ';
                    htmlRegder += '                <div class="new-t4 w-100">                                                                                                                                   ';
                    htmlRegder += '                    <div class="ratio ratio-16x9 bg-light">                                                                                                                  ';
                    htmlRegder += '                        <div class="new-wrap">                                                                                                                               ';
                    htmlRegder += '                            <img src="' + (item.MobileImg != "" ? (cdn_url + JSON.parse(item.MobileImg).Val):"") +'" loading="lazy" class="img-fluid new-img" alt="" />                                     ';
                    htmlRegder += '                            <div class="new-content">                                                                                                                        ';
                    htmlRegder += '                                <div class="meta font-sm">                                                                                                                   ';
                    htmlRegder += '                                    <span class="eyebrow text-primary-2">                                                                                                    ';
                    htmlRegder += '                                        ' + today+'                                                                                       ';
                    htmlRegder += '                                    </span>                                                                                                                                  ';
                    htmlRegder += '                                    -                                                                                                                                        ';
                    //htmlRegder += '                                    @{                                                                                                                                       ';
                    //htmlRegder += '                                        TimeSpan Time = DateTime.Now - item.DatetimeCreated;                                                                                 ';
                    //htmlRegder += '                                    }                                                                                                                                        ';
                    htmlRegder += '                                    <span class="time">' + item.CreatedTime+'</span>                                                                          ';
                    htmlRegder += '                                </div>                                                                                                                                       ';
                    htmlRegder += '                                <h4 class="title h6">                                                                                                                        ';
                    htmlRegder += '                                    <a href="' + item.SeoURL + '" class="link-white-lemon">                                          ';
                    htmlRegder += '                                        '+(lang == "VN" ? item.ItemNameVN : item.ItemName)+'                                                                                ';
                    htmlRegder += '                                    </a>                                                                                                                                     ';
                    htmlRegder += '                                </h4>                                                                                                                                        ';
                    htmlRegder += '                            </div>                                                                                                                                           ';
                    htmlRegder += '                        </div>                                                                                                                                               ';
                    htmlRegder += '                    </div>                                                                                                                                                   ';
                    htmlRegder += '                    <div class="sapo-content">                                                                                                                               ';
                    htmlRegder += '                        <div class="sapo fs-14">                                                                                                                             ';
                    htmlRegder += '                            '+(lang == "VN" ? item.ItemDescriptionVN : item.ItemDescription) +'                                                                            ';
                    htmlRegder += '                        </div>                                                                                                                                               ';
                    htmlRegder += '                        <div class="action">                                                                                                                                 ';
                    htmlRegder += '                            <a href="' + item.SeoURL +'" class="btn btn-sm btn-primary-2 stretched-link fw-bold">Xem thêm</a>       ';
                    htmlRegder += '                        </div>                                                                                                                                               ';
                    htmlRegder += '                    </div>                                                                                                                                                   ';
                    htmlRegder += '                </div>                                                                                                                                                       ';
                    htmlRegder += '            </div>                                                                                                                                                           ';
                });
                htmlRegder += '    </div>                                                                                                                                                                   ';
                $('#pills-home').html(htmlRegder);
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}
function LoadGBCCQ() {
    var htmlRegder = '';
    $.post(data_api_url + "/home-page/get-news-list?code=G-BCCQ", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                htmlRegder += '    <div class="row">  ';
                $.map(response.ResponseData, function (item) {
                    var today = new Date(item.EventDate);
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
                    var yyyy = today.getFullYear();
                    today = dd + '/' + mm + '/' + yyyy;
                    var a = new Date(item.EventDate);
                    var b = new Date();
                    var hours = Math.abs(b.getHours() - a.getHours());
                    //var hours = Math.abs(b - a) / 36e5;
                    //console.log(hours)

                    htmlRegder += '            <div class="col-12 col-md-6 col-xl-6 col-xxl-4 d-flex">                                                                                                          ';
                    htmlRegder += '                <div class="new-t4 w-100">                                                                                                                                   ';
                    htmlRegder += '                    <div class="ratio ratio-16x9 bg-light">                                                                                                                  ';
                    htmlRegder += '                        <div class="new-wrap">                                                                                                                               ';
                    htmlRegder += '                            <img src="' + (item.MobileImg != "" ? (cdn_url + JSON.parse(item.MobileImg).Val) : "") + '" loading="lazy" class="img-fluid new-img" alt="" />                                     ';
                    htmlRegder += '                            <div class="new-content">                                                                                                                        ';
                    htmlRegder += '                                <div class="meta font-sm">                                                                                                                   ';
                    htmlRegder += '                                    <span class="eyebrow text-primary-2">                                                                                                    ';
                    htmlRegder += '                                        ' + today + '                                                                                       ';
                    htmlRegder += '                                    </span>                                                                                                                                  ';
                    htmlRegder += '                                    -                                                                                                                                        ';
                    htmlRegder += '                                    <span class="time">' + item.CreatedTime + '</span>                                                                          ';
                    htmlRegder += '                                </div>                                                                                                                                       ';
                    htmlRegder += '                                <h4 class="title h6">                                                                                                                        ';
                    htmlRegder += '                                    <a href="' + item.SeoURL +' " class="link-white-lemon">                                          ';
                    htmlRegder += '                                        ' + (lang == "VN" ? item.ItemNameVN : item.ItemName) + '                                                                                ';
                    htmlRegder += '                                    </a>                                                                                                                                     ';
                    htmlRegder += '                                </h4>                                                                                                                                        ';
                    htmlRegder += '                            </div>                                                                                                                                           ';
                    htmlRegder += '                        </div>                                                                                                                                               ';
                    htmlRegder += '                    </div>                                                                                                                                                   ';
                    htmlRegder += '                    <div class="sapo-content">                                                                                                                               ';
                    htmlRegder += '                        <div class="sapo fs-14">                                                                                                                             ';
                    htmlRegder += '                            ' + (lang == "VN" ? item.ItemDescriptionVN : item.ItemDescription) + '                                                                            ';
                    htmlRegder += '                        </div>                                                                                                                                               ';
                    htmlRegder += '                        <div class="action">                                                                                                                                 ';
                    htmlRegder += '                            <a href="' + item.SeoURL +' " class="btn btn-sm btn-primary-2 stretched-link fw-bold">Xem thêm</a>       ';
                    htmlRegder += '                        </div>                                                                                                                                               ';
                    htmlRegder += '                    </div>                                                                                                                                                   ';
                    htmlRegder += '                </div>                                                                                                                                                       ';
                    htmlRegder += '            </div>                                                                                                                                                           ';
                });
                htmlRegder += '    </div>                                                                                                                                                                   ';
                $('#pills-profile').html(htmlRegder);
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}
function LoadGBCTQ() {
    var htmlRegder = '';
    $.post(data_api_url + "/home-page/get-news-list?code=G-BCTQ", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                htmlRegder += '    <div class="row">  ';
                $.map(response.ResponseData, function (item) {
                    var today = new Date(item.EventDate);
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0');
                    var yyyy = today.getFullYear();
                    today = dd + '/' + mm + '/' + yyyy;
                    var a = new Date(item.EventDate);
                    var b = new Date();
                    var hours = Math.abs(b.getHours() - a.getHours());

                    htmlRegder += '            <div class="col-12 col-md-6 col-xl-6 col-xxl-4 d-flex">                                                                                                          ';
                    htmlRegder += '                <div class="new-t4 w-100">                                                                                                                                   ';
                    htmlRegder += '                    <div class="ratio ratio-16x9 bg-light">                                                                                                                  ';
                    htmlRegder += '                        <div class="new-wrap">                                                                                                                               ';
                    htmlRegder += '                            <img src="' + (item.MobileImg != "" ? (cdn_url + JSON.parse(item.MobileImg).Val) : "") + '" loading="lazy" class="img-fluid new-img" alt="" />                                     ';
                    htmlRegder += '                            <div class="new-content">                                                                                                                        ';
                    htmlRegder += '                                <div class="meta font-sm">                                                                                                                   ';
                    htmlRegder += '                                    <span class="eyebrow text-primary-2">                                                                                                    ';
                    htmlRegder += '                                        ' + today + '                                                                                       ';
                    htmlRegder += '                                    </span>                                                                                                                                  ';
                    htmlRegder += '                                    -                                                                                                                                        ';
                    htmlRegder += '                                    <span class="time">' + item.CreatedTime + '</span>                                                                          ';
                    htmlRegder += '                                </div>                                                                                                                                       ';
                    htmlRegder += '                                <h4 class="title h6">                                                                                                                        ';
                    htmlRegder += '                                    <a href="' + item.SeoURL + ' " class="link-white-lemon">                                          ';
                    htmlRegder += '                                        ' + (lang == "VN" ? item.ItemNameVN : item.ItemName) + '                                                                                ';
                    htmlRegder += '                                    </a>                                                                                                                                     ';
                    htmlRegder += '                                </h4>                                                                                                                                        ';
                    htmlRegder += '                            </div>                                                                                                                                           ';
                    htmlRegder += '                        </div>                                                                                                                                               ';
                    htmlRegder += '                    </div>                                                                                                                                                   ';
                    htmlRegder += '                    <div class="sapo-content">                                                                                                                               ';
                    htmlRegder += '                        <div class="sapo fs-14">                                                                                                                             ';
                    htmlRegder += '                            ' + (lang == "VN" ? item.ItemDescriptionVN : item.ItemDescription) + '                                                                            ';
                    htmlRegder += '                        </div>                                                                                                                                               ';
                    htmlRegder += '                        <div class="action">                                                                                                                                 ';
                    htmlRegder += '                            <a href="' + item.SeoURL + ' " class="btn btn-sm btn-primary-2 stretched-link fw-bold">Xem thêm</a>       ';
                    htmlRegder += '                        </div>                                                                                                                                               ';
                    htmlRegder += '                    </div>                                                                                                                                                   ';
                    htmlRegder += '                </div>                                                                                                                                                       ';
                    htmlRegder += '            </div>                                                                                                                                                           ';
                });
                htmlRegder += '    </div>                                                                                                                                                                   ';
                $('#pills-profile-bctq').html(htmlRegder);
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}
function LoadStocks() {
    var htmlRegder = '';
    $.post(data_api_url + "/home-page/get-top-stocks-list", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {
                htmlRegder += '<table class="ranking__table">                                                                       ';
                htmlRegder += '    <tbody>                                                                                          ';
                htmlRegder += '        <tr>                                                                                         ';
                htmlRegder += '            <th class="font-sm">Hạng</th>                                                            ';
                htmlRegder += '            <th class="stock-code font-sm">Mã CP</th>                                          ';
                htmlRegder += '            <th class="stock-code font-sm">Giá hiện tại</th>                                          ';
                htmlRegder += '            <th class="rate-header font-sm">Mức tăng trưởng</th>                                     ';
                htmlRegder += '        </tr>                                                                                        ';

                var numforeach = 0;
                $.map(response.ResponseData, function (item) {
                    var strCalss = ""; 
                    if (item.RateOfPriceIncrease < 0) {
                        strCalss = "rate--descrease";
                    }
                    else {
                        strCalss = "rate--increase";
                    }
                    numforeach += 1;
                    htmlRegder += '            <tr>                                                                                     ';
                    htmlRegder += '                <td>                                                                                 ';
                    htmlRegder += '                    <div class="rank-number acbs-body-1">' + numforeach +'</div>                           ';
                    htmlRegder += '                </td>                                                                                ';
                    htmlRegder += '                <td class="rate rate--increase acbs-body-1">' + (lang == "VN" ? item.ItemNameVN : item.ItemName) + '</td>   ';
                    htmlRegder += '                <td class="acbs-body-1">' + formatToCurrency(item.CurrentPrice) +'</td>   ';
                    htmlRegder += '                <td class="rate ' + strCalss+' acbs-body-1">                                              ';
                    htmlRegder += '                    <span class="rate-amount">' + item.RateOfPriceIncrease.toFixed(2)+'%</span>                    ';
                    htmlRegder += '                </td>                                                                                ';
                    htmlRegder += '            </tr>                                                                                    ';
                    });
                htmlRegder += '    </tbody>                                                                                         ';
                htmlRegder += '</table>                                                                                                                                             ';
                $('#TopStocks').html(htmlRegder);
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}

function ViewS6(data) {
    var htmlRegder = '';
    var itemName = '';
    $.map(JSON.parse(data.DataList), function (item) {       
        if (item.Key == 'Name')
            itemName = lang === 'EN' ? item.Name : item.NameVN;
    });
    //htmlRegder += '<section class="section-normal bg-light overflow-hidden">                                                                                                     ';
    htmlRegder += '    <div class="container px-4 px-md-3">                                                                                                                      ';
    htmlRegder += '        <div class="section-normal-title">                                                                                                                    ';
    htmlRegder += '            <h2 class="h1 fw-bold text-primary text-center mb-0">                                                                                             ';
    htmlRegder += '                ' + itemName + ' ';
    htmlRegder += '            </h2>                                                                                                                                             ';
    htmlRegder += '        </div>                                                                                                                                                ';
    htmlRegder += '<div class="row">                                 ';
    htmlRegder += '    <div class="col-12">                          ';
    htmlRegder += '        <div class="swiper swiper-news">          ';
    htmlRegder += '            <div class="swiper-wrapper" id="swiperid">          ';
    htmlRegder += '			   </div>                                   ';
    htmlRegder += '            <div class="swiper-pagination"></div> ';
    htmlRegder += '        </div>                                    ';
    htmlRegder += '    </div>                                        ';
    htmlRegder += '</div>                                            ';
    htmlRegder += '    </div>                                                                                                                                                    ';
    //htmlRegder += '</section>                                                                                                                                                    ';
    $('#views6').html(htmlRegder);
}

LoadEvent();
function LoadEvent() {
    var htmlRegder = '';
    $.post(data_api_url + "/home-page/get-news-event-list", function (response) {
        if (response.ResponseCode === '00_00') {
            if (Array.isArray(response.ResponseData)) {                
                var htmlRegder = '';
                var numforeach = 0;
                $.map(response.ResponseData, function (item) {    
                    var today = new Date(item.EventDate);
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0');
                    var yyyy = today.getFullYear();
                    today = dd + '/' + mm + '/' + yyyy;
                    numforeach += 1;
                    if ((numforeach % 2) == 0) {
                        htmlRegder += '<div class="swiper-slide">                                                                                                 ';
                        htmlRegder += '	<div class="new-t5 d-flex flex-nowrap">                                                                                   ';
                        htmlRegder += '		<div class="new-date flex-shrink-0 d-flex align-items-center bg-primary-2">                                           ';
                        htmlRegder += '			<div class="ratio ratio-1x1">                                                                                     ';
                        htmlRegder += '				<div class="new-date-content bg-primary-2 d-flex flex-column flex align-items-center justify-content-center"> ';
                        htmlRegder += '					<div class="h2 fw-bold mb-0 text-dark">' + dd+'</div>                            ';
                        htmlRegder += '					<div class="fw-normal h6 text-dark">Tháng ' + mm +' '+ yyyy+' </div>                   ';
                        htmlRegder += '				</div>                                                                                                        ';
                        htmlRegder += '			</div>                                                                                                            ';
                        htmlRegder += '		</div>                                                                                                                ';
                        htmlRegder += '		<div class="new-content flex-grow-1">                                                                                 ';
                        htmlRegder += '			<h4 class="title h6 lh-sm">                                                                                       ';
                        htmlRegder += '				<a href="' + item.SeoURL +' " class="link-dark-blue">                                                                            ';
                        htmlRegder += '					' + (lang == "VN" ? item.ItemNameVN : item.ItemName)+'                                                     ';
                        htmlRegder += '				</a>                                                                                                          ';
                        htmlRegder += '			</h4>                                                                                                             ';
                        htmlRegder += '			<div class="sapo-content">                                                                                        ';
                        htmlRegder += '				<div class="sapo fs-14">                                                                                      ';
                        htmlRegder += '					'+(lang == "VN" ? item.ItemDescriptionVN : item.ItemDescription) +'                                      ';
                        htmlRegder += '				</div>                                                                                                        ';
                        htmlRegder += '			</div>                                                                                                            ';
                        htmlRegder += '		</div>                                                                                                                ';
                        htmlRegder += '		<a href="' + item.SeoURL +'" class="stretched-link"></a>                                                                                ';
                        htmlRegder += '	</div>                                                                                                                    ';
                        htmlRegder += '</div>                                                                                                                     ';
                    } else {
                        htmlRegder += '<div class="swiper-slide">                                                                                                ';
                        htmlRegder += '	<div class="new-t5 d-flex flex-nowrap position-relative">                                                                ';
                        htmlRegder += '		<div class="new-date flex-shrink-0 d-flex align-items-center bg-primary">                                            ';
                        htmlRegder += '			<div class="ratio ratio-1x1">                                                                                    ';
                        htmlRegder += '				<div class="new-date-content bg-primary d-flex flex-column flex align-items-center justify-content-center">  ';
                        htmlRegder += '					<div class="h2 fw-bold mb-0 text-white">'+dd+'</div>                          ';
                        htmlRegder += '					<div class="fw-normal h6">Tháng '+mm +' '+ yyyy+'</div>                             ';
                        htmlRegder += '				</div>                                                                                                       ';
                        htmlRegder += '			</div>                                                                                                           ';
                        htmlRegder += '		</div>                                                                                                               ';
                        htmlRegder += '		<div class="new-content flex-grow-1">                                                                                ';
                        htmlRegder += '			<h4 class="title h6 lh-sm">                                                                                      ';
                        htmlRegder += '				<a href="' + item.SeoURL +' " class="link-dark-blue">                                                                           ';
                        htmlRegder += '					'+(lang == "VN" ? item.ItemNameVN : item.ItemName)+'                                                    ';
                        htmlRegder += '				</a>                                                                                                         ';
                        htmlRegder += '			</h4>                                                                                                            ';
                        htmlRegder += '			<div class="sapo-content">                                                                                       ';
                        htmlRegder += '				<div class="sapo fs-14">                                                                                     ';
                        htmlRegder += '					'+(lang == "VN" ? item.ItemDescriptionVN : item.ItemDescription)+'                                      ';
                        htmlRegder += '				</div>                                                                                                       ';
                        htmlRegder += '			</div>                                                                                                           ';
                        htmlRegder += '		</div>                                                                                                               ';
                        htmlRegder += '		<a href="' + item.SeoURL +' " class="stretched-link"></a>                                                                               ';
                        htmlRegder += '	</div>                                                                                                                   ';
                        htmlRegder += '</div>                                                                                                                    ';
                    }
                });
                                                                                                                                                      
                $('#swiperid').html(htmlRegder);
            }
        }
        else {
            console.log(response.ResponseMessage);
        }
    });
}