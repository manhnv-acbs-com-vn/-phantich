function initPage() {
    var langKeys = ['AnalysisCenter_Text_3', 'AnalysisCenter_Text_4', 'AnalysisCenter_Text_5', 'AnalysisCenter_Text_14', 'AnalysisCenter_Text_15', 'AnalysisCenter_Text_16', 'AnalysisCenter_Text_28', 'AnalysisCenter_Text_29', 'AnalysisCenter_Text_30', 'Common_Text_2', 'AnalysisCenter_Text_6', 'AnalysisCenter_Text_31', 'AnalysisCenter_Text_32', 'AnalysisCenter_Text_33', 'AnalysisCenter_Text_35', 'Common_Text_6', 'AnalysisCenter_Text_37', 'AnalysisCenter_Text_38', 'AnalysisCenter_Text_39'];
    loadDefaultLanguage(langKeys);

    var contentUri = $('#contentUri').val();
    loadContent(contentUri);
}
