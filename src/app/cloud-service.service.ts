import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudServiceService {

  constructor() { }
  files: any = [
    // tslint:disable-next-line: max-line-length
        { url: 'https://cdns-preview-d.dzcdn.net/stream/c-d8f5b81a6243ddfa4c97b9a4c86a82fa-4.mp3', 
          name: 'Perfect',
          artist: ' Ed Sheeran'
        },
        {
    // tslint:disable-next-line: max-line-length
          url: 'https://cdns-preview-d.dzcdn.net/stream/c-d8f5b81a6243ddfa4c97b9a4c86a82fa-4.mp3',
          name: 'Man Atkeya Beparwah',
          artist: 'Nusrat Fateh Ali Khan'
        },
        { url: 'https://cdns-preview-d.dzcdn.net/stream/c-d8f5b81a6243ddfa4c97b9a4c86a82fa-4.mp3',
          name: 'Penny Lane',
          artist: 'The Beatles'
        }
      ];
    
      getFiles() {
       return of(this.files);
      }
}
