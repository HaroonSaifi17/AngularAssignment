import { Component, OnInit } from '@angular/core';
import { DataService, Item } from '../../data.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit {
  rightArrow= faArrowRight
  items$!: Observable<Item[]>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.items$ = this.dataService.getData();
  }
}
