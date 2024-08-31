import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule, NgIf, NgOptimizedImage } from "@angular/common";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { ThemeService } from "../../services/theme.service";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { AsyncPipe } from "@angular/common";
import { interval } from "rxjs";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { ApiService, User } from "../../services/api.service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDividerModule,
    FormsModule,
    MatListModule,
    MatGridListModule,
    MatButtonToggleModule,
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    NgIf,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
  users: User[] = [];
  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
    this.apiService.getUsers().subscribe({
      next: (data: User[]) => this.users = data,
      error: (error: any) => console.error('There was an error!', error)
    });
  }

  themeService: ThemeService = inject(ThemeService);

  toggleTheme() {
    this.themeService.updateTheme();
  }
}
// tiles: Tile[] = [
//   { text: "One", cols: 3, rows: 1, color: "lightblue" },
//   { text: "Two", cols: 1, rows: 2, color: "lightgreen" },
//   { text: "Three", cols: 1, rows: 1, color: "lightpink" },
//   { text: "Four", cols: 2, rows: 1, color: "#DDBDF1" },
// ];
