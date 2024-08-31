import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
export interface User {
  id: number;
  title: string;
  email: string;
  image: string;
  category: boolean;
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private ApiUrl = "https://fakestoreapi.com/products";
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.ApiUrl).pipe(
      retry(2), // Retry the request up to 2 times in case of failure
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (isPlatformBrowser(this.platformId)) {
      // Handle client-side error
      if (error.error instanceof ErrorEvent) {
        console.error("A client-side error occurred:", error.error.message);
      } else {
        // Handle server-side error
        console.error(
          `Backend returned code ${error.status}, body was: `,
          error.error
        );
      }
    } else {
      console.error("An error occurred:", error.message);
    }
    return throwError("Something went wrong; please try again later.");
  }
}
