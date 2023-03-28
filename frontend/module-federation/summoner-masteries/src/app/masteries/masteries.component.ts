import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChampUrlNamePipe } from '../pipes/champ-url-name.pipe';
import { API_BASE_URL, ChampionMasteryDto, LeagueApiService, PlatformRoute } from '../services/api.service';

@Component({
  standalone: true,
  selector: 'summoner-masteries',
  templateUrl: './masteries.component.html',
  styleUrls: ['./masteries.component.css'],
  providers: [{ provide: API_BASE_URL, useValue: 'https://localhost:7128'}, LeagueApiService ],
  imports: [ CommonModule, HttpClientModule, ChampUrlNamePipe ],
})
export class MasteriesComponent {
  masteries: ChampionMasteryDto[] = [];
  champsAmount: number = 5;

  constructor(
    private api: LeagueApiService, 
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
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
