import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LabelyService } from '../services/labely.service';
import { Label } from '../models/label-model';
import { Consts } from '../models/Consts';
import { PageConfig, PaginationConfigModel } from '../models/pagination-config.model';

@Component({
  selector: 'labely-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, AfterViewInit {
  activeLabel: Label;
  labels: Array<Label>;
  data: any;

  config: PaginationConfigModel = {
    itemsPerPage: 1,
    currentPageNumber: 1,
    totalItems: 0,
    maxSize: 6
  };

  private MARK_TAG_NAME = 'MARK';
  private WORD_CLASS_NAME = 'word';
  private INLINE_LABEL_CLASS_NAME = 'inline-label';
  private LABELED_TEXT_NAME = 'labeledText';
  private isIdPresent = false;
  private markedEntities: Set<string> = new Set<string>();
  private labeledEntities = new Array<Entity>();
  private textToLabel = '';

  constructor(private labelyService: LabelyService) {}

  ngAfterViewInit(): void {
    const p = document.getElementById('words');
    this.textToLabel = this.data;
    const textArray = this.textToLabel.split(' ');

    p.innerText = '';

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
    this.config.totalItems = this.labelyService.getData().length;
  }

  public pageChange(pageConfig: PageConfig) {
    const tmp = this.labelyService.getDataByPageSize(pageConfig.pageNumber, pageConfig.pageSize)[0];
    this.data = tmp.text;
    this.ngAfterViewInit();
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
        label.setAttribute('class', 'text-inline-label ' + this.INLINE_LABEL_CLASS_NAME);
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
            this.labeledEntities.push({ id: wordId, text: selectedWord.textContent, label: this.activeLabel.name });
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
              const ids = [];
              let text = '';
              for (let i = 0; i < contentsLength; i++) {
                const id = extractedContents.children.item(i).id;
                const tmp = document.getElementById(id).cloneNode(true);
                document.getElementById(id).remove();
                markNodeWrapper.appendChild(tmp);
                markNodeWrapper.appendChild(label);
                currentSelectionIds.push(id);
                ids.push(id);
                text += tmp.textContent;
              }
              this.labeledEntities.push({ id: ids, text, label: this.activeLabel.name });
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
          localStorage.setItem(this.LABELED_TEXT_NAME, JSON.stringify(this.labeledEntities));
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
          this.removeElementFromLabeledEntities(currentChildNode.id);
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

  private removeElementFromLabeledEntities(entityId: string) {
    let entity = new Entity();
    for (let i = 0; i < this.labeledEntities.length; i++) {
      entity = this.labeledEntities[i];

      if (Array.isArray(entity.id)) {
        const index = entity.id.indexOf(entityId);
        if (index >= 0) {
          this.labeledEntities.splice(i, 1);
        }
      } else if (entity.id === entityId) {
        this.labeledEntities.splice(i, 1);
        return;
      }
    }
    localStorage.setItem(this.LABELED_TEXT_NAME, JSON.stringify(this.labeledEntities));
  }

  onDataExport(): void {
    const entities = this.getLabeledData();
    entities.forEach(item => (item.originalText = this.textToLabel));
    this.labelyService.downloadFile(entities, Consts.DOWNLOADED_FILE_NAME);
  }

  getLabeledData(): Array<Entity> {
    return JSON.parse(localStorage.getItem(this.LABELED_TEXT_NAME));
  }
}

export class Entity {
  id: string | Array<string>;
  text: string;
  originalText?: string;
  label: string;
}
