import { Component } from '@angular/core';
import { LeagueApiService, Match, Participant, PlatformRoute } from './services/api.service';

@Component({
  selector: 'match-history',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  entries: Match[] = [];
  participants: Record<string, Participant> = {};

  summoner: string = '';
  region: PlatformRoute = PlatformRoute.EUN1;
  page = 0;
  loading = true;

  constructor(
    private api: LeagueApiService, 
  ) {}

  ngOnInit(): void {
    window.addEventListener('message', (evt) => {
      if (!evt.data.summoner) return;

      this.summoner = evt.data.summoner;
      this.region = evt.data.region;
      this.getMatchHistoryEntries();
    });
  }

  getMatchHistoryEntriesInternal(nickname: string, region: PlatformRoute): void {
    this.loading = true;

    this.api.getMatchHistory(nickname, region, this.page)
      .subscribe({
        next: res => {
          this.entries.push(...res.result);
          res.result.forEach(match => {
            this.participants[match.metadata?.matchId!] = match.info?.participants?.find(x => x.summonerName === this.summoner)!;
          });
  
          this.page++;
        },
      }).add(() => this.loading = false);
  }

  getMatchHistoryEntries(): void {
    this.getMatchHistoryEntriesInternal(this.summoner, this.region);
  }
}
