import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  /*
  ** Truncates a string to the number of characters given and returns
  ** the string with '...' at the end if there are more than the given
  ** number of characters. Also checks to make sure the character before
  ** the '...' is either a letter or a number.
  */
  transform(value: string, characters: number): string {
    if (value.length <= characters) {
      return value;
    } else {
      let slice = value.slice(0, characters);
      const regexp = new RegExp('[^A-Za-z0-9]');
      characters -= 1;

      while (regexp.test(slice.charAt(characters))) {
        slice = slice.slice(0, characters);
        characters -= 1;
      }

      return slice + '...';
    }
  }

}
