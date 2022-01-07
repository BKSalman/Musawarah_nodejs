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

const updatePostStats = {
  Like: function (postId) {
    document.querySelector("#likes-count-" + postId).textContent++;
  },
  Unlike: function (postId) {
    document.querySelector("#likes-count-" + postId).textContent--;
  },
};

const toggleButtonText = {
  Like: function (button) {
    button.textContent = "Unlike";
  },
  Unlike: function (button) {
    button.textContent = "Like";
  },
};

const likePost = function (event) {
  const postId = event.target.dataset.postId;
  const action = event.target.textContent.trim();
  toggleButtonText[action](event.target);
  updatePostStats[action](postId);
  axios
    .post(`/post/like/${postId}`, {
      action: action,
      path: window.location.pathname,
    })
    .then((data) => {
      if (!data.isLoggedIn) {
        return window.location.replace("/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const comment = () => {
  const commentForm = document.getElementById("commentForm");
  if (commentForm.style.display === "none") {
    commentForm.style.display = "block";
  } else {
    commentForm.style.display = "none";
  }
};

const commentPOST = () => {
  const form = document.getElementById("commentForm");
  const input = document.getElementById("hidden");
  input.value = window.location.pathname;
  form.appendChild(input);
  form.submit();
};
