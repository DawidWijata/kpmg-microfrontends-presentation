import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, InjectionToken, Pipe, PipeTransform } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { Queue } from '../services/api.service';

export const JSON_URL = new InjectionToken<string>('JSON_URL');

@Pipe({
  standalone: true,
  name: 'handleQueueId'
})
export class HandleQueueIdPipe implements PipeTransform {
  constructor(private http: HttpClient, @Inject(JSON_URL) private baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  transform(id: Queue): Observable<string> {
    return this.http.get(this.baseUrl + '/assets/queues.json')
      .pipe(first(), map(res => {
        const entry = (res as any).find((x: any) => x.queueId === id);
        return entry.description.replace('games', '').replace('5v5', '') as string;
      }));
  }
}
