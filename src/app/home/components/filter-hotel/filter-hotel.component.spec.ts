import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterHotelComponent } from './filter-hotel.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('FilterHotelComponent', () => {
  let component: FilterHotelComponent;
  let fixture: ComponentFixture<FilterHotelComponent>;
  let searchServiceMock: any;

  beforeEach(async () => {
    searchServiceMock = {
      searchObservable: of('')
    };

    await TestBed.configureTestingModule({
      imports: [FilterHotelComponent,
        FormsModule],
      providers: [
        { provide: SearchService, useValue: searchServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filterName from input', () => {
    const searchInput = fixture.debugElement.query(By.css('input[type="search"]')).nativeElement;

    searchInput.value = 'Test Hotel';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(component.filterName).toBe('Test Hotel');
  });

  it('should add and remove stars from filterStars when checkbox is changed', () => {
    const starCheckbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;

    starCheckbox.value = '4';
    starCheckbox.checked = true;
    starCheckbox.dispatchEvent(new Event('change'));

    expect(component.filterStars).toContain(4);

    starCheckbox.checked = false;
    starCheckbox.dispatchEvent(new Event('change'));

    expect(component.filterStars).not.toContain(4);
  });

  it('should emit filterChange when filters are updated', () => {
    spyOn(component.filterChange, 'emit');

    component.filterName = 'Test Hotel';
    component.filterRate = 4.5;
    component.filterPrice = 500;
    component.onFilterChange();

    expect(component.filterChange.emit).toHaveBeenCalledWith({
      name: 'Test Hotel',
      stars: [],
      rate: 4.5,
      price: 500
    });
  });

  it('should update filterRate when rate range changes', () => {
    const rateInput = fixture.debugElement.query(By.css('input[type="range"][min="0"]')).nativeElement;
    rateInput.value = '3';
    rateInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.filterRate).toBe(3);
  });

  it('should update filterPrice when price range changes', () => {
    const priceInput = fixture.debugElement.query(By.css('input[type="range"][min="50"]')).nativeElement;
    priceInput.value = '300';
    priceInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.filterPrice).toBe(300);
  });

});
