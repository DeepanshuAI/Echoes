// Get the post container
const postDetails = document.getElementById('postDetails');

// Load the selected post from localStorage
function loadPost() {
    const post = JSON.parse(localStorage.getItem('currentPost'));

    if (!post) {
        postDetails.innerHTML = '<p>Error: Post not found. Please go back to the home page.</p>';
        return;
    }

    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const postTitle = document.createElement('h1');
    postTitle.textContent = post.title;
    postDiv.appendChild(postTitle);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    postContent.innerHTML = post.content; // Display full content
    postDiv.appendChild(postContent);

    const tagsDiv = document.createElement('div');
    tagsDiv.classList.add('tags');
    tagsDiv.textContent = `Tags: ${post.tags.join(', ')}`;
    postDiv.appendChild(tagsDiv);

    postDetails.appendChild(postDiv);
}

// Initial load
loadPost();
