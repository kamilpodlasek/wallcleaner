const generateInput = value => {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');

    if (typeof value === 'string') {
        input.value = value;
    }

    return input;
};

const generateRemoveButton = elementToRemove => {
    const removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'remove');
    removeButton.innerText = 'X';
    removeButton.addEventListener('click', () => {
        elementToRemove.parentNode.removeChild(elementToRemove);
    });

    return removeButton;
};

const renderInputRow = value => {
    const keywordsContainer = document.querySelector('.keywords');
    const row = document.createElement('p');
    const input = generateInput(value);
    const removeButton = generateRemoveButton(row);

    row.appendChild(input);
    row.appendChild(removeButton);
    keywordsContainer.appendChild(row);
};

chrome.storage.sync.get('keywords', res =>
    (res.keywords ? [...res.keywords, null] : [null]).forEach(renderInputRow),
);

document.querySelector('.add').addEventListener('click', renderInputRow);

document.querySelector('.keywords-form').addEventListener('submit', e => {
    e.preventDefault();

    const keywords = Array.from(document.querySelectorAll('.keywords input'))
        .map(input => input.value)
        .filter(Boolean);

    chrome.runtime.sendMessage({ message: 'save_keywords', keywords });
});
