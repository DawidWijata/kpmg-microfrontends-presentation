import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { assetUrl } from 'src/single-spa/asset-url';
import { Queue } from '../services/api.service';

@Pipe({
  name: 'handleQueueId'
})
export class HandleQueueIdPipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  transform(id: Queue): Observable<string> {
    return this.http.get(assetUrl('queues.json'))
      .pipe(first(), map(res => {
        const entry = (res as any).find((x: any) => x.queueId === id);
        return entry.description.replace('games', '').replace('5v5', '') as string;
      }));
  }
}
