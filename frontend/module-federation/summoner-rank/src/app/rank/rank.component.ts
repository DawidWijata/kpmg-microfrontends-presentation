import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { LeagueEntry, LeagueApiService, PlatformRoute, QueueType, API_BASE_URL } from '../services/api.service';

@Component({
  standalone: true,
  selector: 'summoner-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css'],
  providers: [{ provide: API_BASE_URL, useValue: 'https://localhost:7128'}, LeagueApiService],
  imports: [ CommonModule, HttpClientModule ],
})
export class RankComponent implements OnInit {
  leagueEntries: LeagueEntry[] = [];

  constructor(
    private api: LeagueApiService, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
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
