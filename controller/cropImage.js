const sharp = require('sharp');
const uuid = require('uuid').v4;
const path = require('path');

class cropImage {
    constructor(folder) {
        this.folder = folder;
    }

    async save(buffer) {
        const filename = cropImage.filename();
        const filepath = this.filepath(filename);

        await sharp(buffer).resize(300,300, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        }).toFile(filepath);

        return filename;
    }

    static filename() {
        return `${uuid()}.png`;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}

module.exports = cropImage;