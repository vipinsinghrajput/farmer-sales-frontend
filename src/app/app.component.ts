import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'farmer-sales-platform';

  constructor(private router: Router) {}
  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      console.log('Storage changed: ', event.key, event.newValue);
      if (event.key === 'accessToken' && event.newValue === null) {
        // Token removed = logout from another tab
        this.router.navigate(['/landing']);
      }
    });
  }
  
}
