import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface MoreInfo {
  pros: string;
  cons: string;
  others: string;
}

export interface Item {
  name: string;
  tags: string[];
  image: string;
  description: string;
  availaleColors: string[];
  moreInfo: MoreInfo;
  fullUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(
    []
  );
  private data$: Observable<Item[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData() {
    this.http.get<Item[]>('assets/data.json').subscribe((data) => {
      this.dataSubject.next(data);
    });
  }

  getData(): Observable<Item[]> {
    return this.dataSubject.asObservable();
  }

  setData(newData: Item[]): void {
    this.dataSubject.next(newData);
  }
}