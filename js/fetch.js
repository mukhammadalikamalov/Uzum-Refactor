const API_URL = "https://jsonplaceholder.typicode.com/comments";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById("comment-list");
const form = document.getElementById("pagination");
const search = document.getElementById("search");

// Get initial comments from the updated data URL
getComments(API_URL);

async function getComments(url) {
    const res = await fetch(url);
    const data = await res.json();

    showComments(data);
}

function showComments(comments) {
    main.innerHTML = "";

    comments.forEach((comment) => {
        const { name, email, body } = comment;

        const commentEl = document.createElement("div");
        commentEl.classList.add("comment");

        commentEl.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Comment:</strong> ${body}</p>`;

        main.appendChild(commentEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm); // Assuming this should remain unchanged for movie search
        search.value = '';
    } else {
        window.location.reload();
    }
});
