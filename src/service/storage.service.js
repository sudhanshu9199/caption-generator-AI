import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadFile(file, filename) {
    const response = await client.files.upload({
      file: file,
      fileName: filename,
    });

    return response;
}

console.log(response);
module.exports = uploadFile;