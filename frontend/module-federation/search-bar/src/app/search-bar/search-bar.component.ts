import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, } from '@angular/router';
import { API_BASE_URL, LeagueApiService } from '../services/api.service';

@Component({
  standalone: true,
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [{ provide: API_BASE_URL, useValue: 'https://localhost:7128'}, LeagueApiService],
  imports: [ CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
})
export class SearchBarComponent implements OnInit {
  regions: string[] = [];

  summoner = new FormGroup({
    nickname: new FormControl<string | null>(null, [ 
      Validators.required, Validators.minLength(2), Validators.maxLength(32)
    ]),
    region: new FormControl<string>("EUN1", [ Validators.required ]),
  });

  constructor(
    private api: LeagueApiService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions(): void {
    this.api.getAvailableRegions().subscribe(res => {
      this.regions = res.result;
    });
  }

  onSubmit(): void {
    const { region, nickname } = this.summoner.controls;
    const queryParams = { summoner: nickname.value, region: region.value }

    if (!this.summoner.valid) {
      return;
    }

    this.summoner.reset({region: "EUN1"});
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParamsHandling: 'merge',  queryParams });
  }
}
