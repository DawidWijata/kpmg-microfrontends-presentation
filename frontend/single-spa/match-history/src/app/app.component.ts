import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { skip } from 'rxjs';
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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(skip(1)).subscribe(params => {
      this.summoner = params['summoner'];
      this.region = params['region'];
      this.page = 0;
      this.entries = [];

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
