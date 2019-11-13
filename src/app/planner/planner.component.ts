import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
 planner = [
    {
      meal: 'Breakfast',
      name: 'Kuvana spelta sa sirom i sunkom',
      image: 'https://hronokuhinja.rs/wp-content/uploads/2014/09/Spelta-sa-svapskim-sirom-i-slaninom.jpg'
    },
    {
      meal: 'Lunch',
      name: 'Junetina dinstana sa povrćem',
      image: 'https://hronokuhinja.rs/wp-content/uploads/2017/06/Vojvodjanski-gulas-s.jpg'
    },
    {
      meal: 'Dinner',
      name: 'Belo meso sa grilovanim tikvicam',
      image: 'https://hronokuhinja.rs/wp-content/uploads/2018/11/Kotleti-2-s.jpg'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
