import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { LeagueApiService, LeagueEntry, PlatformRoute, QueueType } from './services/api.service';

@Component({
  selector: 'summoner-rank',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  leagueEntries: LeagueEntry[] = [];

  constructor(
    private api: LeagueApiService,
  ) { }

  ngOnInit(): void {
    window.addEventListener('message', (evt) => {
      if (!evt.data.summoner) return;
      this.getRankInfo(evt.data.summoner, evt.data.region);
    });
  }

  getRankInfo(nickname: string, region: PlatformRoute): void {
    this.api.getRanking(nickname, region)
      .pipe(map(res => res.result.filter(x => x.queueType === QueueType.RANKED_SOLO_5x5 || x.queueType === QueueType.RANKED_FLEX_SR)))
      .subscribe(res => this.leagueEntries = res);
  }

  getQueueFriendlyName(queueType: QueueType): string {
    const dict: Record<string, string> = {
      'RANKED_SOLO_5x5': 'Ranked Solo/Duo',
      'RANKED_FLEX_SR': 'Ranked Flex',
    };

    return dict[queueType];
  }
}
