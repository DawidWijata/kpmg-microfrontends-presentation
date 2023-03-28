import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, skip } from 'rxjs';
import { LeagueApiService, LeagueEntry, PlatformRoute, QueueType } from './services/api.service';

@Component({
  selector: 'summoner-rank',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class RankAppComponent implements OnInit {
  leagueEntries: LeagueEntry[] = [];

  constructor(
    private api: LeagueApiService, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(skip(1)).subscribe(params => {
      this.getRankInfo(params['summoner'], params['region']);
    });
  }

  getRankInfo(nickname: string, region: PlatformRoute): void {
    this.api.getRanking(nickname, region)
      .pipe(map(res => res.result.filter(x => x.queueType === QueueType.RANKED_SOLO_5x5 || x.queueType === QueueType.RANKED_FLEX_SR)))
      .subscribe(res => this.leagueEntries = res);
  }

  getQueueFriendlyName(queueType: QueueType): string {
    const dict : Record<string, string> = {
      'RANKED_SOLO_5x5': 'Ranked Solo/Duo',
      'RANKED_FLEX_SR': 'Ranked Flex',
    };

    return dict[queueType];
  }
}
