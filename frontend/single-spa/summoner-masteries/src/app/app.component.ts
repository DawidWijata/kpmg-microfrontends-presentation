import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { skip } from 'rxjs';
import { LeagueApiService, PlatformRoute, ChampionMasteryDto } from './services/api.service';

@Component({
  selector: 'summoner-masteries',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class MasteriesAppComponent {
  masteries: ChampionMasteryDto[] = [];
  champsAmount: number = 5;

  constructor(
    private api: LeagueApiService, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(skip(1)).subscribe(params => {
      this.getMasteriesArray(params['summoner'], params['region']);
    });
  }

  getMasteriesArray(nickname: string, region: PlatformRoute): void {
    this.api.getTopChampions(nickname, region).subscribe(res => this.masteries = res.result);
  }

  expand(): void {
    this.champsAmount += 5;
  }
}
