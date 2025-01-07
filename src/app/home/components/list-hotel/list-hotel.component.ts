import { Component } from '@angular/core';
import { FilterHotelComponent } from '../filter-hotel/filter-hotel.component';
import { HotelService } from '../../../services/hotel.service';
import { Hotel } from '../../../model/hotel';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { SearchService } from '../../../services/search.service';

@Component({
    selector: 'app-list-hotel',
    imports: [
        FilterHotelComponent,
        CurrencyPipe,
        DecimalPipe
    ],
    templateUrl: './list-hotel.component.html',
    styleUrl: './list-hotel.component.scss'
})
export class ListHotelComponent {
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  paginatedHotels: Hotel[] = [];
  isLoanding = false;

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(private hotelService: HotelService,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.loadHotels();

    this.searchService.searchObservable.subscribe((searchTerm) => {
      this.filterBySearchTerm(searchTerm);
    });
  }

  loadHotels() {
    this.isLoanding = true;
    this.hotelService.getHotels().subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data;
        this.filteredHotels = [...data];
        this.totalItems = data.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.updatePaginatedHotels();
        this.isLoanding = false;
      },
      error: (error) => {
        console.log('Error fetching hotels', error);
      }
    });
  }

  updatePaginatedHotels() {
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;

    this.paginatedHotels = this.filteredHotels.slice(startIndex, endIndex);

  }

  filterBySearchTerm(searchTerm: string) {
    if (!searchTerm) {
      this.filteredHotels = [...this.hotels];
    } else {
      this.filteredHotels = this.hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.currentPage = 1;
      this.totalItems = this.filteredHotels.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.updatePaginatedHotels();
    }
  }

  onFilterChange(filters: any) {
    this.filteredHotels = this.hotels.filter((hotel) => {
      const matchesName = !filters.name || hotel.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesStars = !filters.stars || (Array.isArray(filters.stars) && filters.stars.length === 0) || filters.stars.includes(hotel.stars);
      const matchesRate = !filters.rate || hotel.rate >= filters.rate;
      const matchesPrice = !filters.price || hotel.price <= filters.price;

      return matchesName && matchesStars && matchesRate && matchesPrice;
    });
    this.currentPage = 1;
    this.totalItems = this.filteredHotels.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.updatePaginatedHotels();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedHotels();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedHotels();
    }
  }

}
