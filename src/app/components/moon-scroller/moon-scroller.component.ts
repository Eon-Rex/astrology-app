import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-moon-scroller',
  templateUrl: './moon-scroller.component.html',
  styleUrls: ['./moon-scroller.component.css'], // Corrected to 'styleUrls'
  animations: [
    trigger('moonAnimation', [
      state('inactive', style({
        opacity: 0.3,
        transform: 'scale(0.8)'  // Fixed typo (Transform to transform)
      })),
      state('active', style({
        opacity: 1,
        transform: 'scale(1.2)'  // Fixed typo (Transform to transform)
      })),
      transition('inactive <=> active', animate('500ms ease-out'))
    ])
  ]
})
export class MoonScrollerComponent implements OnInit {

  // State to track the current animation
  state = 'inactive'; // Default state is inactive

  ngOnInit() {
    // You can add any initialization logic here if needed
  }

  // Add HostListener for scroll event or any other event you need
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    // Change state based on scroll position or any other criteria
    if (window.scrollY > 100) { // Example condition
      this.state = 'active';
    } else {
      this.state = 'inactive';
    }
  }
}
