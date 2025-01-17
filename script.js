// Initialize Quill editor
const quill = new Quill('#editor-container', {
    theme: 'snow',
    placeholder: 'Write your post content here...'
});

// DOM Elements
const postTitleInput = document.getElementById('postTitle');
const postTagsInput = document.getElementById('postTags');
const addPostButton = document.getElementById('addPostButton');
const postsContainer = document.getElementById('postsContainer');

// Load posts from localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => displayPost(post, index));
}

// Save posts to localStorage
function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Display a single post
function displayPost(post, index) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    postDiv.appendChild(postTitle);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    postContent.innerHTML = post.preview; // Display the preview
    postDiv.appendChild(postContent);

    const readMoreButton = document.createElement('button');
    readMoreButton.textContent = 'Read More';
    readMoreButton.addEventListener('click', () => {
        const isPreview = postContent.innerHTML === post.preview;
        postContent.innerHTML = isPreview ? post.content : post.preview;
        readMoreButton.textContent = isPreview ? 'Read Less' : 'Read More';
    });
    postDiv.appendChild(readMoreButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        deletePost(index);
    });
    postDiv.appendChild(deleteButton);

    const tagsDiv = document.createElement('div');
    tagsDiv.classList.add('tags');
    tagsDiv.textContent = `Tags: ${post.tags.join(', ')}`;
    postDiv.appendChild(tagsDiv);

    postsContainer.appendChild(postDiv);
}

// Delete a post
function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1); // Remove the post at the given index
    savePosts(posts); // Save updated posts to local storage
    loadPosts(); // Refresh the posts display
}

// Add a new post
addPostButton.addEventListener('click', () => {
    const title = postTitleInput.value.trim();
    const content = quill.root.innerHTML.trim();
    const tags = postTagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag);

    if (!title || !content) {
        alert('Title and content are required!');
        return;
    }

    const preview = content.length > 200 ? `${content.substring(0, 200)}...` : content;

    const newPost = { title, content, preview, tags };

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    postTitleInput.value = '';
    postTagsInput.value = '';
    quill.root.innerHTML = '';

    loadPosts();
});

// Initial load
loadPosts();
