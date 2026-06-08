// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-landing-navbar',
//   imports: [],
//   templateUrl: './landing-navbar.component.html',
//   styleUrl: './landing-navbar.component.scss'
// })
// export class LandingNavbarComponent {

// }
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.scss']
})
export class LandingNavbarComponent {}
