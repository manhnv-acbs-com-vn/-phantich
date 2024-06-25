function initPage() {
    var langKeys = ['Common_Text_1', 'Common_Text_2', 'Common_Text_6'];
    loadDefaultLanguage(langKeys);
    var pageId = $('#PageId').val();
    getData(pageId);
}

function getData(pageId) {
    $.post(data_api_url + "/product-page/get-content",
        { "documentId": 1021 },
        function (response) {
            if (response.ResponseCode === '00_00') {
                if (Array.isArray(response.ResponseData)) {
                    renderLeftContent(response.ResponseData, pageId);
                    renderRightMenu(response.ResponseData, pageId);
                    renderRightMenuMobile(response.ResponseData, pageId);
                }
            }
        });
}

function renderLeftContent(pageList, pageId) {
    try {
        var pages = pageList.filter(obj => {
            return obj.PSID == pageId;
        });
        $('.main-title').html(getNameByObject(pages[0]));
        $('.breadcrumb-title').html(getNameByObject(pages[0]));
        if (pages[0].ControlType === "HtmlBox") {
            var contentObjs = JSON.parse(pages[0].DataList);
            console.log(contentObjs);
            if (contentObjs.length > 0) {
                var contentObj = contentObjs.filter(obj => {
                    return obj.Key == 'Content';
                });
                $('.left-bar').html(lang == 'VN' ? contentObj[0].NameVN.replace(/{CdnURL}/g, cdn_url) : contentObj[0].Name.replace(/{CdnURL}/g, cdn_url));
            }
        }
    }
    catch (err) {
        console.log(err);
        $('.left-bar').html('load content failed!');
    }
}

function renderRightMenu(pageList, pageId) {
    if (Array.isArray(pageList)) {
        var html = '';
        var parents = pageList.filter(obj => {
            return obj.PSParent === 1061;
        });
        reFillClass(pageList, pageId, 1061);
        $.map(parents, function (item) {
            html += '<div class="mb-4">';
            html += '    <div class="side-nav-action">';
            html += '        <h3 class="h5 flex-grow-1 mb-0">' + getNameByObject(item) + '</h3>';
            html += '        <a class="btn btn-lg py-0 px-0 stretched-link" data-bs-toggle="collapse" href="#collapseSideNav' + item.PSID + '"';
            html += '            role="button" aria-expanded="false" aria-controls="collapseExample">';
            //html += '            <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon" fill="none" viewBox="0 0 24 24"';
            //html += '                stroke="currentColor">';
            //html += '               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />';
            //html += '           </svg>';
            html += '       </a>';
            html += '   </div>';

            // sub menu 2
            var child1s = pageList.filter(obj => {
                return obj.PSParent === item.PSID;
            });

            if (child1s.length > 0) {
                html += '<div class="collapse side-nav" id="collapseSideNav' + item.PSID + '">';
                html += '    <ul class="nav flex-column nav-sidebar">';
                $.map(child1s, function (child) {
                    var child2s = pageList.filter(obj => {
                        return obj.PSParent === child.PSID;
                    });
                    if (child2s.length > 0) {
                        html += '<li class="nav-item ' + child.CSSClass + ' have-child">';
                        html += '     <a class="nav-link fw-bold sidebar-first-link text-primary" data-bs-toggle="collapse"';
                        html += '        href="#collapse-' + child.PSID + '" role="button" aria-expanded="false" aria-controls="collapseEx" href="#">';
                        html += '      ' + getNameByObject(child) + '';
                        if (child2s.length > 0) {
                            html += '      <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon icon" viewBox="0 0 20 20"';
                            html += '           fill="currentColor">';
                            html += '          <path fill-rule="evenodd"';
                            html += '             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"';
                            html += '                clip-rule="evenodd" />';
                            html += '       </svg>';
                        }
                        html += '     </a>';
                        if (child2s.length > 0) {
                            html += '<div class="collapse show py-1" id="collapse-' + child.PSID + '">';
                            html += '   <ul class="font-sm">';
                            $.map(child2s, function (child2) {

                                var child3s = pageList.filter(obj => {
                                    return obj.PSParent === child2.PSID;
                                });
                                if (child3s.length > 0) {
                                    html += '<li>';
                                    html += '    <a href="#collapse-' + child2.PSID + '" data-bs-toggle="collapse"';
                                    html += '       class="sidebar-third-link d-block py-1 ' + child2.CSSClass + '">';
                                    html += '        ' + getNameByObject(child2) + '';
                                    if (child3s.length > 0) {
                                        html += '         <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon icon" viewBox="0 0 20 20"';
                                        html += '                fill="currentColor">';
                                        html += '                <path fill-rule="evenodd"';
                                        html += '                   d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"';
                                        html += '                   clip-rule="evenodd" />';
                                        html += '         </svg>';
                                    }
                                    html += '    </a>';
                                    if (child3s.length > 0) {
                                        html += '<div class="collapse py-1 ' + (child2.CSSClass != '' ? 'show' : '') + '" id="collapse-' + child2.PSID + '">';
                                        html += '   <ul class="font-sm">';
                                        $.map(child3s, function (child3) {
                                            html += '<li>';
                                            html += '    <a href="' + child3.SeoURL + '"';
                                            html += '       class="sidebar-third-link d-block py-1 ' + child3.CSSClass + '">';
                                            html += '      ' + getNameByObject(child3) + '';
                                            html += '    </a>';
                                            html += '</li>';
                                        });
                                        html += '</ul>';
                                        html += '</div>';
                                    }
                                    html += '</li>';
                                }
                                else {
                                    html += '<li>';
                                    html += '    <a href="' + child2.SeoURL + '"';
                                    html += '       class="sidebar-third-link d-block py-1 ' + child2.CSSClass + '">';
                                    html += '        ' + getNameByObject(child2) + '';
                                    html += '    </a>';
                                    html += '</li>';
                                }
                            });
                            html += '   </ul >';
                            html += '</div>';
                        }
                        html += '</li>';
                    }
                    else {
                        html += '<li class="nav-item ' + child.CSSClass + ' have-child">';
                        html += '     <a class="nav-link fw-bold sidebar-first-link text-primary"';
                        html += '        href="' + child.SeoURL + '" role="button" aria-expanded="false" aria-controls="collapseEx">';
                        html += '      ' + getNameByObject(child) + '';
                        html += '     </a>';
                        html += '</li>';
                    }
                });
                html += '   </ul >';
                html += '</div>';
            }
        });
        $('.right-bar').html(html);
    }
}

function renderRightMenuMobile(pageList, pageId) {
    var html = '<ul class="nav flex-column px-2 mt-2">';

    if (Array.isArray(pageList)) {

        var parents = pageList.filter(obj => {
            return obj.PSParent === 1061;
        });
        reFillClass(pageList, pageId, 1061);
        $.map(parents, function (item) {

            // sub menu 2
            var child1s = pageList.filter(obj => {
                return obj.PSParent === item.PSID;
            });
            if (child1s.length > 0) {
                html += '<li class="nav-item mobile-lv1 ' + item.CSSClass + '">';
                html += '<div class="mb-2">';
                html += '    <div class="side-nav-action side-nav-action-mobile-child">';
                html += '        <h3 class="h5 flex-grow-1 mb-0">' + getNameByObject(item) + '</h3>';
                html += '        <a class="btn btn-lg py-0 px-0 stretched-link" data-bs-toggle="collapse" href="#collapseSideNav-' + item.PSID + '"';
                html += '            role="button" aria-expanded="false" aria-controls="collapseExample">';

                html += '           <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon" fill="none" viewBox="0 0 24 24"';
                html += '                stroke="currentColor">';
                html += '             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />';
                html += '           </svg>';

                html += '       </a>';
                html += '   </div>';
                html += '</div>';

                html += '<div class="collapse side-nav" id="collapseSideNav-' + item.PSID + '">';
                html += '     <ul class="nav flex-column nav-sidebar">';
                $.map(child1s, function (child1) {

                    var child2s = pageList.filter(obj => {
                        return obj.PSParent === child1.PSID;
                    });
                    if (child2s.length > 0) {
                        html += '<li class="nav-item have-child ' + child1.CSSClass + '">';
                        html += '    <a class="nav-link fw-bold sidebar-first-link text-primary" data-bs-toggle="collapse"';
                        html += '        href="#collapse-' + child1.PSID + '" role="button" aria-expanded="true" aria-controls="collapseEx" href="#">';
                        html += '      ' + getNameByObject(child1) + '';

                        html += '        <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon icon" viewBox="0 0 20 20"';
                        html += '            fill="currentColor">';
                        html += '           <path fill-rule="evenodd"';
                        html += '              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"';
                        html += '              clip-rule="evenodd" />';
                        html += '         </svg>';

                        html += '    </a>';

                        html += '<div class="collapse show py-2" id="collapse-' + child1.PSID + '">';
                        html += '   <ul class="list-unstyled font-sm ms-4 mb-2">';
                        $.map(child2s, function (child2) {

                            var child3s = pageList.filter(obj => {
                                return obj.PSParent === child2.PSID;
                            });
                            if (child3s.length > 0) {
                                html += '<li>';
                                html += '    <a class="fw-bold link-secondary sidebar-second-link ' + child2.CSSClass + ' py-1"';
                                html += '         data-bs-toggle="collapse" href="#collapse-' + child2.PSID + '" role="button" aria-expanded="false"';
                                html += '        aria-controls="collapse-1" href="#">';
                                html += '        ' + getNameByObject(child2) + '';
                                html += '       <svg xmlns="http://www.w3.org/2000/svg" class=" svg-icon icon" viewBox="0 0 20 20"';
                                html += '         fill="currentColor">';
                                html += '          <path fill-rule="evenodd"';
                                html += '               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"';
                                html += '             clip-rule="evenodd" />';
                                html += '     </svg>';
                                html += '   </a>';
                                html += '<div class="collapse show py-1" id="collapse-' + child2.PSID + '">';
                                html += '    <ul class="font-sm">';
                                $.map(child3s, function (child3) {
                                    html += '<li>';
                                    html += '    <a href="' + child3.SeoURL + '"';
                                    html += '        class="sidebar-third-link d-block py-1 active">';
                                    html += '        ' + getNameByObject(child3) + '';
                                    html += '     </a>';
                                    html += '</li>';
                                });
                                html += '   </ul>';
                                html += '</div>';
                                html += '</li>';
                            }
                            else {
                                html += '<li>';
                                html += '    <a href="' + child2.SeoURL + '"';
                                html += '        class="sidebar-third-link d-block py-1 active">';
                                html += '        ' + getNameByObject(child2) + '';
                                html += '     </a>';
                                html += '</li>';
                            }
                        });
                        html += '   </ul>';
                        html += '</div>';
                        html += '</li>';
                    }
                    else {
                        html += '<li>';
                        html += '    <a href="' + child1.SeoURL + '"';
                        html += '        class="sidebar-third-link d-block py-1 active">';
                        html += '        ' + getNameByObject(child1) + '';
                        html += '     </a>';
                        html += '</li>';
                    }
                });
                html += '   </ul>';
                html += '</div>';
                html += '</li>';
            }
            else {
                html += '<li>';
                html += '    <a href="' + item.SeoURL + '"';
                html += '        class="sidebar-third-link d-block py-1 active">';
                html += '        ' + getNameByObject(item) + '';
                html += '     </a>';
                html += '</li>';
            }
        });
        html += '</ul>';
        $('#collapseSideNavMobile').html(html);
    }
}

    function getNameByObject(obj) {
        try {
            var contentObjs = JSON.parse(obj.DataList);
            if (contentObjs.length > 0) {
                var contentObj = contentObjs.filter(obj => {
                    return obj.Key == 'Name';
                });
                console.log(contentObj[0].Name);
                return lang == 'VN' ? contentObj[0].NameVN : contentObj[0].Name;
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    function reFillClass(pageList, pageId, maxNode) {
        var arrActive = [];
        var parentId = pageId;
        var countLevel = 1;
        while (maxNode !== parentId && countLevel < 5) {
            var parents = pageList.filter(obj => {
                return obj.PSID == parentId;
            });
            if (parents.length > 0) {
                parentId = parents[0].PSParent;
                parents[0].CSSClass = 'active';
                arrActive.push(parentId);
            }
            countLevel++;
        }
    }