import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LabelyService } from '../services/labely.service';
import { Label } from '../models/label-model';

@Component({
  selector: 'labely-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, AfterViewInit {
  public static ROUTE = 'text';
  labels: Label[];
  selectedWord: Array<Entity> = [];
  ids: Set<string> = new Set<string>();
  isIdPresent = false;

  constructor(private labelyService: LabelyService) {}

  ngAfterViewInit(): void {
    const p = document.getElementById('words');
    const firstTextNode = p.firstChild;
    const textArray = firstTextNode.nodeValue.split(' ');

    p.removeChild(firstTextNode); // remove default text

    for (let i = 0; i < textArray.length; i++) {
      const span = document.createElement('span');
      span.setAttribute('id', 'id-' + i);
      span.appendChild(document.createTextNode(textArray[i] + ' '));
      p.appendChild(span);
    }
    console.log(p);
  }

  ngOnInit(): void {
    this.labels = this.labelyService.getLabels();
  }

  onMouseUp() {
    const selectedText = window.getSelection();
    if (selectedText.getRangeAt) {
      const selRange = selectedText.getRangeAt(0);
      const wordId = selectedText.focusNode.parentElement.id;

      try {
        const tmpIds = []; // for saving all ids of current selection
        const elem = document.getElementById(wordId).cloneNode(true);
        const newNode = document.createElement('span');
        const extractedContents = selRange.cloneContents();

        if (extractedContents.childElementCount <= 0) {
          // if we just selected a word
          if (this.ids.has(wordId)) {
            this.isIdPresent = true;
          } else {
            document.getElementById(wordId).remove();
            newNode.appendChild(elem);
            tmpIds.push(wordId);
          }
        } else {
          // if multiple words was selected
          try {
            // Check for overlapped selection
            for (let i = 0; i < extractedContents.childNodes.length; i++) {
              const item = extractedContents.childNodes.item(i);
              if (this.ids.has(item.id) || item.id === '') {
                this.isIdPresent = true;
                break;
              }
            }

            if (!this.isIdPresent) {
              extractedContents.childNodes.forEach(c => {
                const id = c.id;
                const tmp = document.getElementById(id).cloneNode(true);
                document.getElementById(id).remove();
                newNode.appendChild(tmp);
                tmpIds.push(id);
              });
            }
          } catch (e) {
            this.isIdPresent = true;
            console.log('The selected word overlapped');
          }
        }

        if (!this.isIdPresent) {
          tmpIds.forEach(id => this.ids.add(id));
          selRange.insertNode(newNode);
          newNode.setAttribute('class', 'customText bg-primary text-white font-weight-bold px-2 mx-1');
        }
      } catch (e) {
        console.log('The element you are trying to select was already marked');
      } finally {
        this.isIdPresent = false;
      }
    }
  }

  selectLabel(label) {
    // this.currentEntity.label = label;
    // console.log(this.currentEntity);
  }
}

export class DataModel {
  id: number;
  text: string;
  entities: Array<Entity>;
}

export class Entity {
  uuId: string;
  end: number;
  label: string;
}
