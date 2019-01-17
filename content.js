const feed = document.querySelector('div[role="feed"]');

const config = { childList: true, subtree: true };

const grabAndRemovePosts = (keywords = []) => {
    const posts = feed.querySelectorAll('div[data-testid="fbfeed_story"]');

    posts.forEach(post => {
        const userContents = post.querySelectorAll('.userContent');

        const content = Array.from(userContents).reduce((acc, node) => acc + node.textContent, '');

        if (keywords.some(keyword => content.includes(keyword))) {
            post.style.display = 'none';
        }
    });
};

const observer = new MutationObserver(grabAndRemovePosts);

if (feed) {
    observer.observe(feed, config);

    chrome.storage.sync.get('keywords', res => grabAndRemovePosts(res.keywords));
}

chrome.runtime.onMessage.addListener(request => {
    if (request.message === 'update_posts') {
        grabAndRemovePosts(request.keywords);
    }
});
