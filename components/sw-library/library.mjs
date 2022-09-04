const video = document.querySelector('video');
const audio = document.querySelector('audio');
const image = document.querySelector('img');
const url = document.getElementById('url1');
const categories = ['Images', 'Sounds', 'Videos'];

export default () => {
    const library = JSON.parse(localStorage.getItem('library'));
    if (library) {
        setSelection(localStorage.getItem('selection') ? JSON.parse(localStorage.getItem('selection')) : library[categories[0]][0]);
        renderLibrary(library);
    }
}

function renderLibrary(library) {
    const nav = document.querySelector('nav');

    categories.forEach(category => {
        const h3 = document.createElement('h3');
        h3.textContent = category;
        const menu = document.createElement('menu');
        nav.append(h3, menu);

        library[category].sort(orderByName).forEach(file => {
            const li = document.createElement('li');
            li.append(" ", file.name);
            li.onclick = () => setSelection(file);
            menu.append(li);
        });
    });
}

export function setSelection(file) {
    localStorage.setItem('selection', JSON.stringify(file));
    image.style.display = 'none';
    audio.style.display = 'none';
    video.style.display = 'none';
    url.value = file.url;

    switch (file.category) {
        case "Images": 
            image.src = file.path;
            image.style.display = 'block';
            break;
        case "Sounds":
            audio.src = file.path;
            audio.style.display = 'block';
            break;
        case "Videos":
            video.src = file.path;
            video.style.display = 'block';
            break;
    }

    return file;
}

function orderByName(a, b) {
    const titleA = a.name.toUpperCase();
    const titleB = b.name.toUpperCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  }

  // https://unicode.org/emoji/charts/full-emoji-list.html#1f4fc