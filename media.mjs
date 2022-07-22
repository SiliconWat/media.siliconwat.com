import fs from 'fs';

export function getMedia(Category=null, id=null) {
    const library = { Images: [], Sounds: [], Videos: [] };
    for (const category in library) {
        const categoryFolder = fs.opendirSync('media/' + category);
        let folders = true;
        while (folders) {
            const folder = categoryFolder.readSync();
            if (folder) {
                if (folder.isDirectory()) {
                    const fileFolder = fs.opendirSync(`media/${category}/${folder.name}`);
                    const file = fileFolder.readSync();
                    if (file.name !== '.DS_Store') library[category].push(getData(fileFolder.path, file.name));
                    fileFolder.close();
                }
            } else folders = false;
        } 
        categoryFolder.close();
    }
    return { library, selection: id ? library[Category].find(file => file.id === id) : null };
}

function getData(path, name) {
    const data = { name };
    data.id = path.split('/')[2];
    data.category = path.split('/')[1];
    data.path = `${path}/${name}`;
    data.url = "https://raw.githubusercontent.com/SiliconWat/media.siliconwat.com/main/" + data.path;
    return data;
}

// console.log(getMedia())