const { encode, decode } = require('node-base64-image');
const fs = require('fs');
const FileStorage = require('../services/aws/sss/file/index');

class DecodingImage {
    static async decoding(imageBase64) {
        const timeInMilis = Date.now();
        const folderName = `./uploadedImages/`;
        const name = `${timeInMilis}_${Math.floor(Math.random() * 899 + 100)}`;
        let rs;
        let json;

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }

        try {
            await decode(imageBase64, { fname: folderName + name, ext: 'jpg' });
        } catch (err) {
            return err.message;
        }
        try {
            rs = fs.createReadStream(folderName + name + '.jpg');
        } catch (err) {
            return err.message;
        }
        try {
            json = await FileStorage.uploadImage(name + '.jpg', rs);
        } catch (err) {
            return err.message;
        }


        return json.Location;
    }
}

module.exports = DecodingImage;
