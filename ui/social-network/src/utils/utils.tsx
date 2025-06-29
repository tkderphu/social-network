async function fetchImageAsDataURL(url: any) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export function convertToHeader(word: string) {
  if(!word) return ""
  return word.substring(0, 1).toUpperCase() + word.substring(1).toLocaleLowerCase()
}

export async function generateGroupAvatar(avatars: any, size = 200) {

  const dataURLs = await Promise.all(avatars.map(fetchImageAsDataURL));

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx: any = canvas.getContext("2d");
  
    const images = await Promise.all(
      dataURLs.map(
        (url: any) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = url;
          })
      )
    );
  
    const n = images.length;
  
    if (n === 1) {
      ctx.drawImage(images[0], 0, 0, size, size);
    } else if (n === 2) {
      ctx.drawImage(images[0], 0, 0, size / 2, size);
      ctx.drawImage(images[1], size / 2, 0, size / 2, size);
    } else if (n === 3) {
      ctx.drawImage(images[0], 0, 0, size / 2, size / 2);
      ctx.drawImage(images[1], size / 2, 0, size / 2, size / 2);
      ctx.drawImage(images[2], size / 4, size / 2, size / 2, size / 2);
    } else {
      // 4 ảnh trở lên: chia 2x2
      for (let i = 0; i < Math.min(4, n); i++) {
        const x = (i % 2) * (size / 2);
        const y = Math.floor(i / 2) * (size / 2);
        ctx.drawImage(images[i], x, y, size / 2, size / 2);
      }
    }
  
    return canvas.toDataURL("image/png"); // trả về base64 ảnh gộp
  }  