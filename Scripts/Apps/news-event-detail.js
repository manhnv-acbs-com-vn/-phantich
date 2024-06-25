function initPage() {
    var langKeys = ['NewsEvent_Text_1', 'Common_Text_2', 'AnalysisCenter_Text_29', 'Common_Text_1', 'NewsEvent_Text_2', 'NewsEvent_Text_3', 'Common_Text_6'];
    loadDefaultLanguage(langKeys);

    var contentUri = $('#contentUri').val();
    loadContent(contentUri, 'content-detail');
}