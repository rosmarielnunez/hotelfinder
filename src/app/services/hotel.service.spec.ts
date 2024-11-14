import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HotelService } from './hotel.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HotelService', () => {
  let service: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(HotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
