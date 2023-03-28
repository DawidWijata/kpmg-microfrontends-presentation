import { Component } from '@angular/core';
import { LeagueApiService, PlatformRoute, ChampionMasteryDto } from './services/api.service';

@Component({
  selector: 'summoner-masteries',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  masteries: ChampionMasteryDto[] = [];
  champsAmount: number = 5;

  constructor(
    private api: LeagueApiService
) {}

  ngOnInit(): void {
    window.addEventListener('message', (evt) => {
      if (!evt.data.summoner) return;
      this.getMasteriesArray(evt.data.summoner, evt.data.region);
    });
  }

  getMasteriesArray(nickname: string, region: PlatformRoute): void {
    this.api.getTopChampions(nickname, region).subscribe(res => this.masteries = res.result);
  }

  expand(): void {
    this.champsAmount += 5;
  }
}
