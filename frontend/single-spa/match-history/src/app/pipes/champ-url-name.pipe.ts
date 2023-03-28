import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'champUrlName'
})
export class ChampUrlNamePipe implements PipeTransform {
  transform(name: string): string {
    let result = name;
    const exceptions : Record<string, string> = {
      'Nunu & Willump': 'Nunu',
      'Renata Glasc': 'Renata',
      'Kog\'Maw': 'KogMaw',
      'Dr. Mundo': 'DrMundo',
      'LeBlanc': 'Leblanc',
      'Wukong': 'MonkeyKing'
    }

    if (exceptions.hasOwnProperty(name)) {
      result =  exceptions[name];
    }
    else if (name.includes('\'')) {
      const res = name.replace('\'', '').toLowerCase();
      result = res[0].toUpperCase() + res.slice(1);
    }
    else if (name.includes(' ')) {
      result = name.replace(' ', '');
    }

    return 'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/' + result + '.png';
  }
}
