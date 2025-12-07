import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_VERSION, APP_BUILD_DATE } from '../version';
import { WarningCentreComponent } from './warning-centre/warning-centre.component';
import { DebugToolsComponent } from './debug-tools/debug-tools.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, WarningCentreComponent, DebugToolsComponent],
})
export class AppComponent {
  title = 'Alert UI Example';

  version = APP_VERSION;

  buildDate = new Date(APP_BUILD_DATE);
}
