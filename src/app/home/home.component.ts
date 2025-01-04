import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ListHotelComponent } from './components/list-hotel/list-hotel.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        HeaderComponent,
        ListHotelComponent,
        FooterComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
}
