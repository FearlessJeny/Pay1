async function loadHTML(url, containerSelector) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const text = await res.text();
        document.querySelector(containerSelector).insertAdjacentHTML('beforeend', text);
    } catch (err) {
        console.error('Ошибка загрузки', url, err);
    }
}

// Список файлов для подгрузки
const panoramasFiles = ['info/panoramas1.html'];
const descriptionsFiles = ['info/descriptions1.html'];

// Подгружаем все панорамы
panoramasFiles.forEach(file => loadHTML(file, '#product-panoramas'));

// Подгружаем все описания
descriptionsFiles.forEach(file => loadHTML(file, '#product-descriptions'));
