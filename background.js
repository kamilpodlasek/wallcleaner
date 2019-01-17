chrome.runtime.onMessage.addListener(request => {
    if (request.message === 'save_keywords') {
        chrome.storage.sync.set({ keywords: request.keywords });

        chrome.tabs.query({ currentWindow: true, active: true }, ([currentTab]) => {
            chrome.tabs.sendMessage(currentTab.id, {
                message: 'update_posts',
                keywords: request.keywords,
            });
        });
    }
});
