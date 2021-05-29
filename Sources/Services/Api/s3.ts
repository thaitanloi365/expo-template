import Axios from 'axios';

export async function uploadImage(url: string, key: string, formData: FormData) {
  return new Promise((resolve, reject) => {
    Axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        resolve({
          success: true,
          message: 'Upload susccess',
          data: {
            imageURL: `${url}/${key}`,
          },
        });
      })
      .catch(error => {
        reject({
          success: false,
          statusCode: 400,
          message: error,
        });
      });
  });
}
