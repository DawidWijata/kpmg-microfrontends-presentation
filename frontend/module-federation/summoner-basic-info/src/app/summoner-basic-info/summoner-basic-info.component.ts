import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_BASE_URL, LeagueApiService, Summoner, PlatformRoute } from '../services/api.service';

@Component({
  standalone: true,
  selector: 'summoner-basic-info',
  styleUrls: ['./summoner-basic-info.component.css'],
  templateUrl: './summoner-basic-info.component.html',
  providers: [{ provide: API_BASE_URL, useValue: 'https://localhost:7128'}, LeagueApiService],
  imports: [ CommonModule, HttpClientModule ],
})
export class BasicInfoComponent implements OnInit {
  summonerInfo?: Summoner;
  summonerName: string = '';
  region: PlatformRoute = PlatformRoute.EUN1;

  constructor(
    private api: LeagueApiService, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
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
