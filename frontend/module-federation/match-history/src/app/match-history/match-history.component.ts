import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChampUrlNamePipe } from '../pipes/champ-url-name.pipe';
import { HandleQueueIdPipe, JSON_URL } from '../pipes/handle-queue-id.pipe';
import { IconUrlPipe } from '../pipes/icon-url.pipe';
import { API_BASE_URL, LeagueApiService, Match, Participant, PlatformRoute } from '../services/api.service';

@Component({
  standalone: true,
  selector: 'match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css'],
  providers: [
    { provide: API_BASE_URL, useValue: 'https://localhost:7128'}, 
    { provide: JSON_URL, useValue: 'http://localhost:4205'}, 
    LeagueApiService
  ],
  imports: [ CommonModule, HttpClientModule, ChampUrlNamePipe, HandleQueueIdPipe, IconUrlPipe ],
})
export class MatchHistoryComponent {
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
    this.activatedRoute.queryParams.subscribe(params => {
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
