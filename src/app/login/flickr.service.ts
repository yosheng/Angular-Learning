import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from '../domain/entities';
import { element } from 'protractor';

@Injectable()
export class FlickrService {

  constructor(private client: HttpClient) { }

  getResult(query: string) {
    let params = new HttpParams();
    params = params.append('method', 'flickr.photos.search');
    params = params.append('api_key', '');
    params = params.append('tags', query);
    params = params.append('per_page', '12');
    params = params.append('format', 'json');
    params = params.append('nojsoncallback', '1');
    let url = `https://api.flickr.com/services/rest`;

    return this.client
        .get(url, { params: params })
        .map(
          (res: any) => {
            if (res.stat === 'ok') {
              let data = res.photos.photo as Photo[];
              data.forEach(photo => {
                photo.url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
              })
              return data
            }
        },
        (err: any) => {
          console.log('err:',err);
        } );
}

}
