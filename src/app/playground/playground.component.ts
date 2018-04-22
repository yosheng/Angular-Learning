import { Component, OnInit, state, trigger, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
  animations: [
    trigger('signal', [
      state('void',  style({
        'transform': 'translateY(-100%)'
      })),
      state('go',  style({
        'background-color': 'green',
        'height': '100px'
      })),
      state('stop',  style({
        'background-color': 'red',
        'height': '50px'
      })),
      transition('void => *', animate(5000))
    ])
  ]
})
export class PlaygroundComponent implements OnInit {

  birthday = new Date();
  signal: string;

  constructor() { }

  ngOnInit() {
  }

  onGo() {
    this.signal = 'go';
  }

  onStop() {
    this.signal = 'stop';
  }
}
