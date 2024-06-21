import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronDown,
  faFilter,
  faSearch,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  isFilterOpen = false;
  faSearch = faSearch;
  faFilter = faFilter;
  faXMark = faXmark;
  faChevronDown = faChevronDown;
  searchValue = '';
  filterArray: string[] = [];
  isTechDropDownOpen = false;
  isIndusDropDownOpen = false;
  constructor(private dataServie: DataService) {}
  filterData(Input: HTMLInputElement) {
    this.searchValue = Input.value;
    this.dataServie.filterData(this.searchValue, this.filterArray);
  }
  techcheckboxes = [
    'FDM',
    'SLA',
    'SLF',
    'MJS',
    'Polyjet',
    'DMLS',
    'SLM',
    'Vaccum Casting',
    'CNC',
  ];
  techcheckedValues: string[] = [];
  techcheckedStatus: boolean[] = new Array(this.techcheckboxes.length).fill(
    false
  );

  onTechCheckboxChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    this.techcheckedStatus[index] = inputElement.checked;
  }
  induscheckboxes = [
    'Automotive',
    'Aerospace',
    'Consumer Electronics',
    'Robotics And Automation',
    'Medical And Dental',
    'Hobbyists',
    'Artitectural',
    'Jewellery',
  ];
  induscheckedValues: string[] = [];
  induscheckedStatus: boolean[] = new Array(this.induscheckboxes.length).fill(
    false
  );

  onIndusCheckboxChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    this.induscheckedStatus[index] = inputElement.checked;
  }

  getCheckedValues() {
    this.techcheckedValues = this.techcheckboxes.filter(
      (_, index) => this.techcheckedStatus[index]
    );
    this.induscheckedValues = this.induscheckboxes.filter(
      (_, index) => this.induscheckedStatus[index]
    );
    this.filterArray = this.techcheckedValues.concat(this.induscheckedValues);
    this.isFilterOpen = false;
  }
  resetAll() {
    this.techcheckedStatus.fill(false);
    this.induscheckedStatus.fill(false);
    this.techcheckedValues = [];
    this.induscheckedValues = [];
    this.filterArray = [];
    this.getCheckedValues();
  }
}
