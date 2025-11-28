const {ImageKit} = require('@imagekit/nodejs');

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, filename) {
    const response = await client.files.upload({
      file: file,
      fileName: filename,
      folder: 'cohort_AI_Social'
    });
    // console.log("This response ->:",response);

    return response;
}

module.exports = uploadFile;