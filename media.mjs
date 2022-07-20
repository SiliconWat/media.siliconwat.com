import fs from 'fs';

export function getMedia() {
    const library = { Images: [], Sounds: [], Videos: [] };
    for (const category in library) {
        const categoryFolder = fs.opendirSync('media/' + category);
        let folders = true;
        while (folders) {
            const file = categoryFolder.readSync();
            if (file) {
                library[category].push(getData(category, file.name));
            } else folders = false;
        }
        categoryFolder.close();    
    }
    return library;
}

function getData(category, name) {
    const data = { category, name };
    data.path = `media/${category}/${name}`
    data.url = "https://raw.githubusercontent.com/SiliconWat/media.siliconwat.com/main/" + data.path;
    return data;
}

// console.log(getMedia())