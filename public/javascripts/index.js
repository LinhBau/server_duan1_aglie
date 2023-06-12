// Thong bao them san pham start
$("#form-add").submit(function (event) {
  alert("Add success");
  window.location.href = "/sp";
});
// Thong bao them san pham end

//Delete Product start
if (window.location.pathname == "/sp") {
  $ondelete = $(".table td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    var request = {
      url: `http://localhost:3000/sp/${id}`,
      method: "DELETE",
    };

    if (confirm("Bạn thực sự muốn xóa sản phẩm này")) {
      $.ajax(request).done(function () {
        alert("Xóa thành công!");
        location.reload();
      });
    }
  });
}
//Delete Product end

//Delete User start
if (window.location.pathname == "/users") {
  $ondelete = $(".table td a#delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    var request = {
      url: `http://localhost:3000/users${id}`,
      method: "DELETE",
    };

    if (confirm("Bạn thực sự muốn xóa người dùng này?")) {
      $.ajax(request).done(function () {
        alert("Xóa thành công!");
        window.location.reload();
      });
    }
  });
}
//Delete User end
