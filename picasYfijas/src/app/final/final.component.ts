import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {
  resultado: string = "Ganaste";
  frase: string = "Bien lo lograste el numero era: "
  numero:number = 3569;
  constructor() { }

  ngOnInit() {
  }

}
