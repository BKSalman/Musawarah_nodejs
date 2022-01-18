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

const updateFollowStats = {
  Follow: function (username) {
    document.querySelector("#followers-count-" + username).textContent++;
  },
  Unfollow: function (username) {
    document.querySelector("#followers-count-" + username).textContent--;
  },
};

const toggleFollowButtonText = {
  Follow: function (button) {
    button.value = "Unfollow";
    button.textContent = "الغاء المتابعة";
  },
  Unfollow: function (button) {
    button.value = "Follow";
    button.textContent = "تابع";
  },
};

const follow = (event) => {
  const username = event.target.dataset.userUsername
  console.log(username);
  const action = document.getElementById("Follow-btn").value
  toggleFollowButtonText[action](event.target)
  updateFollowStats[action](username)
  axios.post(`/profile/follow/${username}`, {
      action: action,
      path: window.location.pathname,
    }).catch((err) => {
      console.log(err)
    })
}
  
const toggleFavButtonText = {
	Fav: function (button) {
		button.value = "Unfav";
		button.textContent = "احذف من المفضلة";
	},
	Unfav: function (button) {
		button.value = "Fav";
		button.textContent = "مفضلة";
	},
};

const favPost = (event) => {
	const postId = event.target.dataset.postId
	const action = document.querySelector(".fav-button").value
	toggleFavButtonText[action](event.target)
	axios.post(`/post/fav/${postId}`, {
		action: action,
		path: window.location.pathname,
		}).then((data) => {
			if (!data.isLoggedIn) {
			  return window.location.replace("/login");
			}
		  }).catch((err) => {
		console.log(err)
		})
}


const tagContainer = document.getElementById("tag-container")

const input = document.getElementById("tagsInput")

const message = document.querySelector(".alert-message")

let tags = []

const createTag = (label) => {
	const div = document.createElement('div')
	div.setAttribute("class", "tag")
	const span = document.createElement('span')
	span.setAttribute("data-submit", label)
	span.innerHTML = label
	const closeButton = document.createElement('i')
	closeButton.setAttribute("class", "fas fa-times")
	closeButton.setAttribute("data-item", label)

	div.appendChild(span)
	div.appendChild(closeButton)
	return div
}

const reset = () => {
	document.querySelectorAll(".tag").forEach((tag) => {
		tag.parentElement.removeChild(tag)
	})
}

const addTags = () => {
	reset()
	tags.slice().reverse().forEach((tag) => {
		const input = createTag(tag)
		tagContainer.prepend(input)
	})
}

const reachedMax = () => {
	message.setAttribute('class','alert-danger')
	message.textContent = 'وصلت الى الحد الاقصى!'
}

input.addEventListener('keyup', (event) => {
	if(event.key == 'Enter'){
		if(input.value && !(tags.includes(input.value))) {
			if(tags.length <= 5){
				tags.push(input.value)
				addTags()
				input.value = ''
			} else {
				reachedMax()
			}
		}
	}
})

document.addEventListener('click', (e)=> {
	if(e.target.tagName == "I"){
		console.log("Clicked");
		const value = e.target.getAttribute("data-item")
		const index = tags.indexOf(value)
		tags = [...tags.slice(0, index), ...tags.slice(index + 1)]
		addTags()
	}
})

document.addEventListener('keypress', (e)=> {
	if(e.key == "Enter"){
		e.preventDefault();
		return false;
	}
})

