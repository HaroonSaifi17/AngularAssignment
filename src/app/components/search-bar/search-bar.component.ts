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
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  isFilterOpen: boolean = false;
  faSearchIcon = faSearch;
  faFilterIcon = faFilter;
  faCloseIcon = faXmark;
  faChevronDownIcon = faChevronDown;
  searchQuery: string = '';
  filterTags: string[] = [];
  isTechDropdownOpen: boolean = false;
  isIndustryDropdownOpen: boolean = false;
  techOptions: string[] = [
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
  selectedTechOptions: string[] = [];
  techCheckboxStates: boolean[] = new Array(this.techOptions.length).fill(
    false
  );
  industryOptions: string[] = [
    'Automotive',
    'Aerospace',
    'Consumer Electronics',
    'Robotics And Automation',
    'Medical And Dental',
    'Hobbyists',
    'Architectural',
    'Jewellery',
  ];
  selectedIndustryOptions: string[] = [];
  industryCheckboxStates: boolean[] = new Array(
    this.industryOptions.length
  ).fill(false);

  constructor(private dataService: DataService) {}

  filterResults(inputElement: HTMLInputElement): void {
    this.searchQuery = inputElement.value;
    this.dataService.filterData(this.searchQuery, this.filterTags);
  }

  onTechCheckboxChange(event: Event, index: number): void {
    const checkbox = event.target as HTMLInputElement;
    this.techCheckboxStates[index] = checkbox.checked;
  }

  onIndustryCheckboxChange(event: Event, index: number): void {
    const checkbox = event.target as HTMLInputElement;
    this.industryCheckboxStates[index] = checkbox.checked;
  }

  updateCheckedValues(): void {
    this.selectedTechOptions = this.techOptions.filter(
      (_, index) => this.techCheckboxStates[index]
    );
    this.selectedIndustryOptions = this.industryOptions.filter(
      (_, index) => this.industryCheckboxStates[index]
    );
    this.filterTags = [
      ...this.selectedTechOptions,
      ...this.selectedIndustryOptions,
    ];
    this.isFilterOpen = false;
  }

  resetAllFilters(): void {
    this.techCheckboxStates.fill(false);
    this.industryCheckboxStates.fill(false);
    this.selectedTechOptions = [];
    this.selectedIndustryOptions = [];
    this.filterTags = [];
    this.updateCheckedValues();
  }

  removeFilterTag(tag: string): void {
    this.filterTags = this.filterTags.filter((value) => value !== tag);
  }
}
