import { Component, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChildren('mfe', { read: ViewContainerRef }) viewContainer!: QueryList<ViewContainerRef>;

  async ngOnInit() {
    await this.load();
  }

  async load(): Promise<void> {
    const modules = {
      "SearchBarAppComponent": await import('searchbar/Component'),
      "BasicInfoAppComponent": await import('basicinfo/Component'),
      "RankAppComponent": await import('rank/Component'),
      "MasteriesAppComponent": await import('masteries/Component'),
      "MatchHistoryAppComponent": await import('history/Component'),
    }
      
    for (const [name, component] of Object.entries(modules)) {
      const ref = this.viewContainer.find(x => x.element.nativeElement.id === name)?.createComponent(component[name])!;
      const compInstance = ref.instance as any;
      compInstance.ngOnInit();
    }
  }
}
