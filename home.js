// Get the posts container
const postsContainer = document.getElementById('postsContainer');

// Load posts from localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts yet. Start writing your first blog post!</p>';
        return;
    }

    posts.forEach((post, index) => displayPost(post, index));
}

// Display a single post on the home page
function displayPost(post, index) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    postDiv.appendChild(postTitle);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    postContent.innerHTML = post.preview; // Display only the preview
    postDiv.appendChild(postContent);

    const readMoreButton = document.createElement('button');
    readMoreButton.textContent = 'Read More';
    readMoreButton.addEventListener('click', () => {
        if (postContent.innerHTML === post.preview) {
            postContent.innerHTML = post.content; // Show full content
            readMoreButton.textContent = 'Read Less';
        } else {
            postContent.innerHTML = post.preview; // Collapse to preview
            readMoreButton.textContent = 'Read More';
        }
    });
    postDiv.appendChild(readMoreButton);

    const tagsDiv = document.createElement('div');
    tagsDiv.classList.add('tags');
    tagsDiv.textContent = `Tags: ${post.tags.join(', ')}`;
    postDiv.appendChild(tagsDiv);

    postsContainer.appendChild(postDiv);
}

// Initial load
loadPosts();
