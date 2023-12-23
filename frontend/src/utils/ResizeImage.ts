export async function resizeImage(file: File, maxSize: number): Promise<File> {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let {width, height} = img;
            let ratio = width / height;

            if (width > height) {
                width = maxSize;
                height = Math.round(maxSize / ratio);
            } else {
                height = maxSize;
                width = Math.round(maxSize * ratio);
            }
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Could not resize image'));
                    return;
                }
                const resizedFile = new File([blob], file.name, {type: blob.type});
                resolve(resizedFile);
            }, file.type);
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}