import { Component } from '@angular/core';
import { WarningCentreComponent } from './warning-centre/warning-centre.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, WarningCentreComponent],
})
export class AppComponent {
  title = 'Alert UI Example';
}
