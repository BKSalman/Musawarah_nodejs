function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#imgPreview").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$(".owl-carousel").owlCarousel({
  rtl: true,
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});
