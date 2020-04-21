import { Injectable } from '@angular/core';
import { Label } from '../models/label-model';

@Injectable({
  providedIn: 'root'
})
export class LabelyService {
  constructor() {}

  public setLabel(labels: Array<Label>) {
    localStorage.setItem('labels', JSON.stringify(labels));
  }

  public getLabels(): Array<Label> {
    return JSON.parse(localStorage.getItem('labels'));
  }

  public getData(): Array<any> {
    return JSON.parse(localStorage.getItem('data'));
  }

  public setData(data: any[]) {
    for (let i = 0; i < data.length; i++) {
      data[i].id = i;
    }
    localStorage.setItem('data', JSON.stringify(data));
  }

  public updateItemLabel(item): void {
    const data = this.getData();
    const index = +item.get('id');
    data[index].label = item.get('label');
    this.setData(data);
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

  public clearLocalStorage(item?: string) {
    localStorage.clear();
  }

  public convertJSONToMAP(data): Array<any> {
    const result = [];
    data.forEach(d => {
      const map = new Map<string, string>();
      // tslint:disable-next-line:forin
      for (const n in d) {
        map.set(n, d[n]);
      }
      result.push(map);
    });
    return result;
  }

  // SOURCE: https://stackblitz.com/edit/angular8-json-to-csv?file=src%2Fapp%2Fapp.service.ts
  downloadFile(data, headerList: string[], filename = 'data') {
    const csvData = this.ConvertToCSV(data, headerList);
    console.log(csvData);
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser =
      navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    if (isSafariBrowser) {
      // if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headerList) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    // tslint:disable-next-line:forin
    for (const index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = i + 1 + '';
      // tslint:disable-next-line:forin
      for (const index in headerList) {
        const head = headerList[index];

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }
}
