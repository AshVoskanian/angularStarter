import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private $loading: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  startLoading() {
    this.$loading.next(true);
  }

  stopLoading(){
    this.$loading.next(false);
  }

  get loadingStatus(): Observable<boolean> {
    return this.$loading.asObservable();
  }
}
