function initPage() {
    var langKeys = ['AnalysisCenter_Text_14', 'AnalysisCenter_Text_15', 'AnalysisCenter_Text_16', 'Common_Text_2', 'AnalysisCenter_Text_28', 'AnalysisCenter_Text_29', 'AnalysisCenter_Text_30', 'Common_Text_6'];
    loadDefaultLanguage(langKeys);

    var contentUri = $('#contentUri').val();
    loadContent(contentUri);
}
