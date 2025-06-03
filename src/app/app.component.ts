import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoonScrollerComponent } from "./components/moon-scroller/moon-scroller.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { ServicesComponent } from "./components/services/services.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MoonScrollerComponent, HeaderComponent, HomeComponent, AboutComponent, ContactComponent, ServicesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mere Acharaji';
}
