(function ($) {
    function loadCSS(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        document.head.appendChild(link);
    }

    $(document).ready(function () {
        if (window.self !== window.top) {
            loadCSS('/public/css/edit.mode.css')
            const elements = [...document.querySelectorAll('[data-edit-key]')]
            for (let index = 0; index < elements.length; index++) {
                const element = elements[index];
                const button = document.createElement('button')
                button.classList.add('edit-mode-button')
                button.textContent = "Edit"
                button.addEventListener('click', () => {
                    const data = { editKey: element.getAttribute('data-edit-key') }
                    window.parent.postMessage(JSON.stringify(data))
                })
                element.append(button)
            }
        } else {
        }
    });
})(window.jQuery);