import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListHotelComponent } from './list-hotel.component';
import { HotelService } from '../../../services/hotel.service';
import { SearchService } from '../../../services/search.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ListHotelComponent', () => {
  let component: ListHotelComponent;
  let fixture: ComponentFixture<ListHotelComponent>;
  let hotelServiceMock: any;
  let searchServiceMock: any;

  beforeEach(async () => {
    hotelServiceMock = {
      getHotels: jasmine.createSpy('getHotels').and.returnValue(of([
        { id: 1, name: 'Hotel A', stars: 4, rate: 8.5, price: 120, image: '', address: '' },
        { id: 2, name: 'Hotel B', stars: 5, rate: 9.0, price: 200, image: '', address: '' }
      ]))
    };

    searchServiceMock = {
      searchObservable: of('Hotel A')
    };

    await TestBed.configureTestingModule({
    imports: [ListHotelComponent],
    providers: [
        { provide: HotelService, useValue: hotelServiceMock },
        { provide: SearchService, useValue: searchServiceMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();

    fixture = TestBed.createComponent(ListHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load hotels on initialization', () => {
    expect(hotelServiceMock.getHotels).toHaveBeenCalled();
    expect(component.hotels.length).toBe(2);
  });

  it('should filter hotels by search term', () => {
    component.filterBySearchTerm('Hotel A');
    expect(component.filteredHotels.length).toBe(1);
    expect(component.filteredHotels[0].name).toBe('Hotel A');
  });

  it('should filter hotels by filters (name, stars, rate, price)', () => {
    const filters = { name: 'Hotel B', stars: [5], rate: 9.0, price: 200 };
    component.onFilterChange(filters);
    expect(component.filteredHotels.length).toBe(1);
    expect(component.filteredHotels[0].name).toBe('Hotel B');
  });

  it('should reset pagination when filters change', () => {
    component.currentPage = 2;
    const filters = { name: 'Hotel A' };
    component.onFilterChange(filters);
    expect(component.currentPage).toBe(1);
  });

});

