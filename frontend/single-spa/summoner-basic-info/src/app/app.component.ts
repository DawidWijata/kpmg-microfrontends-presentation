import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, skip } from 'rxjs';
import { LeagueApiService, PlatformRoute, Summoner } from './services/api.service';

@Component({
  selector: 'summoner-basic-info',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class BasicInfoAppComponent implements OnInit {
  summonerInfo?: Summoner;
  summonerName: string = '';
  region: PlatformRoute = PlatformRoute.EUN1;

  constructor(
    private api: LeagueApiService, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(skip(1)).subscribe(params => {
      this.getSummonerProfile(params['summoner'], params['region']);
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
