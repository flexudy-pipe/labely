import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelyService {
  constructor() {}

  public setLabel(labels: Array<string>) {
    localStorage.setItem('labels', JSON.stringify(labels));
  }

  public getLabels() {
    return JSON.parse(localStorage.getItem('labels'));
  }

  public getData(): Array<any> {
    return JSON.parse(localStorage.getItem('data'));
  }

  public setData(data: any) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  getDataByPageSize(page: number = 0, size: number = 1): Array<any> {
    const result = [];
    const data = this.getData();
    if (data) {
      page = (page - 1) * size; // all items in the previous pages

      for (let i = 0; i < size && data[page] != null; i++) {
        result[i] = data[page];
        page++;
      }
    }
    return result;
  }

  public clearLocalStorage(item: string) {
    localStorage.removeItem(item);
  }
}
