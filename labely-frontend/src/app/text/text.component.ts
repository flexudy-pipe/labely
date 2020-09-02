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

  activeLabel: Label;
  labels: Array<Label>;

  private MARK_TAG_NAME = 'MARK';
  private WORD_CLASS_NAME = 'word';
  private INLINE_LABEL_CLASS_NAME = 'inline-label';
  private isIdPresent = false;
  private markedEntities: Set<string> = new Set<string>();

  constructor(private labelyService: LabelyService) {}

  ngAfterViewInit(): void {
    const p = document.getElementById('words');
    const firstTextNode = p.firstChild;
    const textArray = firstTextNode.nodeValue.split(' ');

    p.removeChild(firstTextNode); // remove default text

    for (let i = 0; i < textArray.length; i++) {
      const span = document.createElement('span');
      span.setAttribute('id', i.toString());
      span.setAttribute('class', this.WORD_CLASS_NAME);
      span.appendChild(document.createTextNode(textArray[i]));
      span.appendChild(document.createTextNode(' '));
      p.appendChild(span);
    }
  }

  ngOnInit(): void {
    this.labels = this.labelyService.getLabels();
    if (this.labels.length > 0) {
      this.labels[0].selected = true;
      this.activeLabel = this.labels[0];
    }
  }

  onMark(): void {
    const selectedText = window.getSelection();
    if (selectedText.getRangeAt) {
      const selRange = selectedText.getRangeAt(0);
      const wordId = selectedText.focusNode.parentElement.id;

      if (wordId.includes('l')) {
        // the user clicked on the label
        return;
      }

      const selectedWord = document.getElementById(wordId).cloneNode(true);

      try {
        const currentSelectionIds = []; // to save all Ids of the current selection
        const extractedContents = selRange.cloneContents();

        const markNodeWrapper = document.createElement('mark');
        const label = document.createElement('span');
        label.setAttribute('class', 'text-inline-label ml-2 ' + this.INLINE_LABEL_CLASS_NAME);
        label.setAttribute('id', 'l-' + wordId);
        label.textContent = this.activeLabel.name;

        // if only one word is selected
        if (extractedContents.childElementCount <= 0) {
          if (this.markedEntities.has(wordId)) {
            this.isIdPresent = true;
          } else {
            document.getElementById(wordId).remove();
            markNodeWrapper.appendChild(selectedWord);
            markNodeWrapper.appendChild(label);
            currentSelectionIds.push(wordId);
          }
        } else {
          // if multiple words are selected
          try {
            const contentsLength = extractedContents.childNodes.length;
            // Check for overlapped selection
            for (let i = 0; i < contentsLength; i++) {
              const item = extractedContents.children.item(i);
              if (this.markedEntities.has(item.id) || item.id === '') {
                this.isIdPresent = true;
                break;
              }
            }

            if (!this.isIdPresent) {
              for (let i = 0; i < contentsLength; i++) {
                const id = extractedContents.children.item(i).id;
                const tmp = document.getElementById(id).cloneNode(true);
                document.getElementById(id).remove();
                markNodeWrapper.appendChild(tmp);
                markNodeWrapper.appendChild(label);
                currentSelectionIds.push(id);
              }
            }
          } catch (e) {
            this.isIdPresent = true;
            console.log('The selected word overlapped');
          }
        }

        if (!this.isIdPresent) {
          currentSelectionIds.forEach(id => this.markedEntities.add(id));
          selRange.insertNode(markNodeWrapper);
          markNodeWrapper.setAttribute('class', 'mark-wrapper');
        }
      } catch (e) {
        console.log('The element you are trying to select was already marked');
      } finally {
        this.isIdPresent = false;
      }
    }
    selectedText.removeAllRanges();
  }

  onRemoveMark(event) {
    let removed = false;

    try {
      const parentElement = document.getElementById(event.target.id).parentElement;

      if (parentElement.nodeName.toString() === this.MARK_TAG_NAME) {
        // if word was selected
        const grandParentElement = parentElement.parentElement;

        while (parentElement.firstChild != null) {
          const currentChildNode = parentElement.firstElementChild;

          // copy the current childNode if it is not the label and insert it before the <mark> tag
          if (!currentChildNode.className.includes(this.INLINE_LABEL_CLASS_NAME)) {
            const currentChildNodeCopy = currentChildNode.cloneNode(true);
            grandParentElement.insertBefore(currentChildNodeCopy, parentElement);
          }

          currentChildNode.remove();
          this.markedEntities.delete(currentChildNode.id);
          removed = true;
        }

        if (removed) {
          grandParentElement.removeChild(parentElement);
        }
      }
    } catch (e) {
      console.log('Element could not be unmarked');
    }
  }

  selectLabel(label: Label) {
    this.labels.forEach(l => {
      if (l.name === label.name) {
        l.selected = true;
        this.activeLabel = label;
      }

      if (l.name === this.activeLabel.name) {
        l.selected = false;
      }
    });
  }
}

export class DataModel {
  id: number;
  text: string;
  entities: Array<Entity>;
}

export class Entity {
  id: string;
  text: string;
  label: Label;
}
