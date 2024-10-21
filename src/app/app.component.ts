import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChannelsBlockComponent } from './shared/channels-block/channels-block.component';
import { MainPageComponent } from './main-page/main-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChannelsBlockComponent, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
