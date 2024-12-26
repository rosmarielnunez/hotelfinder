import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SearchService } from '../services/search.service';
import { HotelService } from '../services/hotel.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockSearchService = {
    searchObservable: of('Hotel A')
  };

  const mockHotelService = {
    getHotels: jasmine.createSpy('getHotels').and.returnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [],
    imports: [],
    providers: [
        { provide: SearchService, useValue: mockSearchService },
        { provide: HotelService, useValue: mockHotelService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
