import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {catchError, tap, take, delayWhen} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: 'root'
})
export class IextradingService {
  private logger = new LoggerService(this.constructor.name);

  constructor(
    // private snackBarService: SnackBarService,
    private http: HttpClient,
    private router: Router) {
  }

  getStockPriceHistory(symbolsCsv) {
    const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbolsCsv}&types=chart&range=2y`;
    return this.http.get<any>(url).pipe(
      tap(
        res => {
          if (!res) {
            throw new Error('Invalid Response');
          }
        })
    );
  }


  public handleFatalError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}. Redirecting to error-page`);
      this.router.navigate(['/error-page']);
      return of(result as T);
    };
  }

}
