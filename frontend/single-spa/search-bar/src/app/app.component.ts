import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeagueApiService } from './services/api.service';

@Component({
  selector: 'search-bar',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class SearchBarAppComponent implements OnInit {
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
