import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'iconUrl'
})
export class IconUrlPipe implements PipeTransform {

  transform(item: number): unknown {
    return 'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/' + item + '.png'
  }

}
