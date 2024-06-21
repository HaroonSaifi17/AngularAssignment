import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCross, faFilter, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  isFilterOpen = false;
  faSearch = faSearch;
  faFilter = faFilter;
  faXMark = faXmark;
  searchValue = '';
  constructor(private dataServie:DataService) {}
  filterData(Input: HTMLInputElement){
    this.searchValue = Input.value ;
    this.dataServie.filterData(this.searchValue);
  }
}
