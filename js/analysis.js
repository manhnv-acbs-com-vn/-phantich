$(".nav-link").each(function (index, event) {
  $(this).click(function () {
    let id = $(this).attr("id");
    $(".nav-link").removeClass("active");
    $(".tab-pane").removeClass("show active")
    $(".tab-pane").each(function () {
      if ($(this).attr("aria-labelledby") === id) {
        $("#" + id).addClass("active");
        $(this).addClass("show active")
      }
    })
  })
});

function showListStockCode() {
  let response = arrayMK;
  if (response.result_code == 0) {
    if (Array.isArray(response.data)) {
      $.map(response.data, function (item) {
        $('#stock_code').append(handleOptions(item));
      });
    }
  }


}

$(document).on('click', '.remove-option', function(e) {
  e.stopPropagation();
  var optionText = $(this).parent().text().trim();
  var $select = $(this).closest('.bootstrap-select').find('select');
  $select.find('option').filter(function() {
      return $(this).text() === optionText;
  }).prop('selected', false);
  $select.selectpicker('refresh');
});


function handleOptions(data) {
  return `<option value=${data} data-content="<span>${data}<span class='remove-option'>&times;</span></span>"></option>`

}
showListStockCode()