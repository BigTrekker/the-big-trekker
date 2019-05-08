import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private possibleColors: Array<string> = [
    // dark colors
    /*'1976d2', // dark blue
    '00838f', // dark green
    '00796b', // lighter green
    '827717', // ugly green
    '7e57c2', // purple
    'd81b60', // pink
    'd32f2f', // red
    'bf360c', // orange
    '8d6e63', // light brown
    '5d4037', // dark brown
    '546e7a', // grey
    '212121' // black*/
    // bright colors
    'ef5350', // light red
    'ec407a', // pink
    'ba68c8', // purple
    '2196f3', // blue
    '00bcd4', // light blue
    '26a69a', // dark blue/green
    '4caf50', // green
    '8bc34a', // light green
    'cddc39', // very light green
    'fdd835', // light orange
    'ffee58', // yellow
    'f57f17', // orange
    'a1887f', // light brown
    '9e9e9e', // grey
    '607d8b' // blue/grey
  ];

  private values: Map<string, string> = new Map<string, string>();

  private getRandomColor(): string {
    let idx = Math.round(Math.random() * (this.possibleColors.length - 1));
    let color = this.possibleColors[idx];
    delete this.possibleColors[idx]
    return color;
  }

  getRandomUniqueColor(value: string): string {
    let val = this.values[value];

    if (val) { return val; }

    let randColor = '#' + this.getRandomColor();
    this.values[value] = randColor;
    return randColor;
  }
}
