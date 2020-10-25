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
  private markedEntities: Set<string> = new Set<string>();
  private labeledEntities = new Array<Entity>();
  private textToLabel = '';

  constructor(private labelyService: LabelyService) {}

  ngAfterViewInit(): void {
    this.setupText();
  }

  ngOnInit(): void {
    this.labels = this.labelyService.getLabels();
    if (this.labels.length > 0) {
      this.labels[0].selected = true;
      this.activeLabel = this.labels[0];
    }
    this.config.totalItems = this.labelyService.getData().length;
  }

  public pageChange(pageConfig: PageConfig): void {
    const tmp = this.labelyService.getDataByPageSize(pageConfig.pageNumber, pageConfig.pageSize)[0];
    this.data = tmp.text;
    this.ngAfterViewInit();
  }

  onSelectText(): void {
    const selectedText = window.getSelection();
    if (selectedText.getRangeAt) {
      const selRange = selectedText.getRangeAt(0);
      const wordId = selectedText.focusNode.parentElement.id;

      if (wordId.includes('label')) {
        // the user clicked on the label to unmark
        return;
      }

      const wordElement = document.getElementById(wordId);
      if (wordElement && wordElement.parentElement.nodeName.toString() === this.MARK_TAG_NAME) {
        return;
      }

      try {
        const extractedContents = selRange.cloneContents();
        const markNodeWrapper = document.createElement('mark');
        const label = document.createElement('span');
        label.setAttribute('class', 'text-inline-label ' + this.INLINE_LABEL_CLASS_NAME);
        label.setAttribute('id', 'label-' + wordId);
        label.textContent = this.activeLabel.name;
        // if only one word is selected
        if (extractedContents.childElementCount <= 0) {
          if (this.isIdPresent(wordId)) {
            return;
          }

          const markModel: MarkModel = this.markSingleToken(wordId, label, markNodeWrapper);
          this.saveLabeledEntities(markModel);
        } else {
          // if multiple words are selected

          try {
            if (this.isSelectionOverlap(extractedContents)) {
              // Check for overlapped selection
              return;
            }

            const markModel: MarkModel = this.markMultipleToken(label, extractedContents, markNodeWrapper);
            this.saveLabeledEntities(markModel);
          } catch (e) {
            throw new Error('The selected word overlapped');
          }
        }

        selRange.insertNode(markNodeWrapper);
        markNodeWrapper.setAttribute('class', 'mark-wrapper');
        localStorage.setItem(this.LABELED_TEXT_NAME, JSON.stringify(this.labeledEntities));
      } catch (e) {
        throw new Error('The element you are trying to select was already marked');
      } finally {
        selectedText.removeAllRanges();
      }
    }
  }

  private markSingleToken(id: string, labelSpan: HTMLElement, markNodeWrapper: HTMLElement): MarkModel {
    const position = +document.getElementById(id).className.split(' ')[1];
    const selectedWord = document.getElementById(id).cloneNode(true);
    document.getElementById(id).remove();
    markNodeWrapper.appendChild(selectedWord);
    markNodeWrapper.appendChild(labelSpan);
    this.markedEntities.add(id);
    return { markNodeWrapper, position, currentIdSelection: id, text: selectedWord.textContent };
  }

  private markMultipleToken(
    labelSpan: HTMLElement,
    extractedContents: DocumentFragment,
    markNodeWrapper: HTMLElement
  ): MarkModel {
    const contents = extractedContents.children;
    const position = [];
    const currentIdSelection = [];

    for (let i = 0; i < contents.length; i++) {
      const id = contents.item(i).id;
      const markModel: MarkModel = this.markSingleToken(id, labelSpan, markNodeWrapper);
      currentIdSelection.push(id);
      position.push(markModel.position);
    }

    const text = markNodeWrapper.textContent.split(' ');
    text.pop();

    return { markNodeWrapper, position, currentIdSelection, text: text.join(' ') };
  }

  private saveLabeledEntities(markModel: MarkModel): void {
    this.labeledEntities.push({
      id: markModel.currentIdSelection,
      position: markModel.position,
      text: markModel.text,
      label: this.activeLabel.name,
      originalText: this.data
    });
  }

  private isIdPresent(wordId: string): boolean {
    return this.markedEntities.has(wordId);
  }

  private isSelectionOverlap(extractedContents?: DocumentFragment): boolean {
    const selections = extractedContents.children;
    for (let i = 0; i < selections.length; i++) {
      const item = selections.item(i);
      if (this.isIdPresent(item.id) || item.id === '') {
        return true;
      }
    }
    return false;
  }

  onRemoveMark(event): void {
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

  selectLabel(label: Label): void {
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
    this.labelyService.downloadFile(entities, Consts.DOWNLOADED_FILE_NAME);
  }

  private getLabeledData(): Array<Entity> {
    return JSON.parse(localStorage.getItem(this.LABELED_TEXT_NAME));
  }

  private setupText(): void {
    const p = document.getElementById('words');
    this.textToLabel = this.data;
    const textArray = this.textToLabel.split(' ');

    p.innerText = '';

    for (let i = 0; i < textArray.length; i++) {
      const word = textArray[i];
      const span = document.createElement('span');
      span.setAttribute('id', this.getId());
      span.setAttribute('class', this.WORD_CLASS_NAME + ` ${i}`);
      span.appendChild(document.createTextNode(word));
      span.appendChild(document.createTextNode(' '));
      p.appendChild(span);
    }
  }

  private getId(): string {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
}

export class Entity {
  id: string | Array<string>;
  position: number | Array<number>;
  text: string;
  originalText: string;
  label: string;
}

export class MarkModel {
  currentIdSelection?: string | Array<string>;
  position?: number | Array<number>;
  markNodeWrapper: HTMLElement;
  text?: string;
}
