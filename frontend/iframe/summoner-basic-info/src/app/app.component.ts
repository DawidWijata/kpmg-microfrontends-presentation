import { Component, OnInit } from '@angular/core';
import { LeagueApiService, PlatformRoute, Summoner } from './services/api.service';

@Component({
  selector: 'summoner-basic-info',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  summonerInfo?: Summoner;
  summonerName: string = '';
  region: PlatformRoute = PlatformRoute.EUN1;

  constructor(
    private api: LeagueApiService, 
  ) {}

  ngOnInit(): void {
    window.addEventListener('message', (evt) => {
      if (!evt.data.summoner) return;
      this.getSummonerProfile(evt.data.summoner, evt.data.region);
    });
  }

  getSummonerProfile(nickname: string, region: PlatformRoute): void {
    this.api.getBasicInfo(nickname, region).subscribe(res => {
      this.summonerInfo = res.result;
      this.summonerName = res.result.name ?? '';
      this.region = region;
    });
  }

  refresh(): void {
    this.getSummonerProfile(this.summonerName, this.region);
  }
}
