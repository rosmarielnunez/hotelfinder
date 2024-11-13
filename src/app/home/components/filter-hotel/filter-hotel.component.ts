import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-filter-hotel',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './filter-hotel.component.html',
  styleUrl: './filter-hotel.component.scss'
})
export class FilterHotelComponent implements OnInit, AfterViewInit {
  filterName = '';
  filterStars: number[] = [];
  filterRate = 0;
  filterPrice = 1000;
  stars = [1, 2, 3, 4, 5];
  dropdownOpen = false;
  filterDropdownOpen = false;

  @Output() filterChange = new EventEmitter<any>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.searchObservable.subscribe()
  }


  ngAfterViewInit(): void {
    fromEvent<any>(this.searchInput?.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.filterName = searchTerm;
        this.onFilterChange();
      });
  }

  onFilterChange() {
    const filters = {
      name: this.filterName,
      stars: this.filterStars,
      rate: this.filterRate,
      price: this.filterPrice
    };
    this.filterChange.emit(filters);
  }

  onStarChange(event: any) {
    const starValue = +event.target.value;
    if (event.target.checked) {
      this.filterStars.push(starValue);
    } else {
      this.filterStars = this.filterStars.filter(star => star !== starValue);
    }

    this.onFilterChange();
  }

  onRateChange() {
    this.onFilterChange();
  }

  onPriceChange() {
    this.onFilterChange();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
     const dropdown = document.getElementById("dropdown");

     if (dropdown) {
         if (window.innerWidth <= 1280) {
             dropdown.style.left = "0";
             dropdown.style.right = "0";
             dropdown.style.maxWidth = "100%";  // Ocupa el ancho completo en pantallas pequeñas
         } else {
             dropdown.style.removeProperty("left");
             dropdown.style.right = "auto";
             dropdown.style.maxWidth = "140px"; // Retorna a un ancho específico en pantallas más grandes
             dropdown.style.marginRight = "100px";
         }
     }
}

  toggleFilterDropdown() {
    this.filterDropdownOpen = !this.filterDropdownOpen;
  }

}
