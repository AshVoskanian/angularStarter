import { Component, OnInit } from '@angular/core';
import { LoadingService } from "./shared/services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.loadingService.loadingStatus
      .subscribe(status => {
        this.isLoading = status;
      });
  }
}
