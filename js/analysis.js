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
    $('#stock_code').select2({
      tags: false,
      maximumSelectionLength: 5, // Set the maximum number of selections
      allowClear: false, // Cho phép xóa lựa chọn
      closeOnSelect: true,
      language: {
        maximumSelected: function (args) {
          return 'Bạn đã vượt quá giới hạn';
        },
        noResults: function () {
          return 'Không tìm thấy kết quả phù hợp'; // Custom message for no matching results
        },
        searching: function () {
          return 'Đang tìm kiếm...'; // Custom message for searching
        },
      },

    });
  }
}

function handleOptions(data) {
  return `<option value="${data}">${data}</option>`

}
let table = $('#listStockCode');
let tbody = table.find('tbody');
$('#dataContainer').pagination({
  dataSource: function (done) {
    let response = getstockcode;
    if (response.result_code === 0 && response.data.data.length > 0) {
      let data = response.data.data;
      done(data);
    }
  },
  pageSize: 10,
  totalNumber: 100,
  totalPage: 100,
  showSizeChanger: true,
  callback: function (data, pagination) {
    tbody.empty(); // Clear existing table rows
    $.each(data, function (index, item) {
      var row = '<tr>' +
        '<td>' + item.item_id + '</td>' +

        '</tr>';
      tbody.append(row);
    });
  },
  pageNumber: 1, // Initial page number
  pageOnClick: function (pageNumber) {
    console.log("Nguyen van manh")
  },
});

showListStockCode()


