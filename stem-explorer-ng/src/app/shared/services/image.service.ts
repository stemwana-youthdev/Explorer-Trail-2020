import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  cropToSquare(unscaled: HTMLImageElement, size: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const sourceSize = Math.min(unscaled.width, unscaled.height);
    ctx.drawImage(
      unscaled,
      (unscaled.width - sourceSize) / 2,
      (unscaled.height - sourceSize) / 2,
      sourceSize,
      sourceSize,
      0,
      0,
      size,
      size
    );

    return canvas;
  }

  readAsDataURL(blob: Blob): Promise<string> {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        res(fileReader.result as string);
      });
      fileReader.addEventListener('error', () => {
        rej(fileReader.error);
      });
      fileReader.readAsDataURL(blob);
    });
  }

  loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((res, rej) => {
      const image = new Image();
      image.addEventListener('load', () => {
        res(image);
      });
      image.addEventListener('error', (event) => {
        rej(event.error);
      });
      image.src = src;
    });
  }
}
