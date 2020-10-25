export class PaginationConfigModel {
  itemsPerPage: number;
  currentPageNumber: number;
  totalItems: number;
  maxSize?: number;
}

export class PageConfig {
  pageNumber = 1;
  pageSize = 10;
}
