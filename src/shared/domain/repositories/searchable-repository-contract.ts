/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repository-contract';

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
   page?: number;
   perPage?: number;
   sort?: string | null;
   sortDir?: SortDirection | null;
   filter?: Filter | null;
};

export type SearchResultProps<E extends Entity, Filter> = {
   items: E[];
   total: number;
   currentPage: number;
   perPage: number;
   sort: string | null;
   sortDir: SortDirection | null;
   filter: Filter | null;
};

export class SearchParams<Filter = string> {
   protected _page: number;
   protected _perPage = 15;
   protected _sort: string | null;
   protected _sortDir: SortDirection | null;
   protected _filter: Filter | null;

   constructor(props: SearchProps<Filter> = {}) {
      this.page = props.page ?? 1;
      this.perPage = props.perPage ?? 15;
      this.sort = props.sort ?? null;
      this.sortDir = props.sortDir ?? null;
      this.filter = props.filter ?? null;
   }

   get page() {
      return this._page;
   }

   private set page(value: number) {
      let _page = Number(value);
      if (isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
         _page = 1;
      }

      this._page = _page;
   }

   get perPage() {
      return this._perPage;
   }

   private set perPage(value: number) {
      let _perPage = value === (true as any) ? this._perPage : Number(value);
      if (isNaN(_perPage) || _perPage <= 0 || parseInt(_perPage as any) !== _perPage) {
         _perPage = this._perPage;
      }

      this._perPage = _perPage;
   }

   get sort() {
      return this._sort;
   }

   private set sort(value: string | null) {
      this._sort = value === null || value === undefined || value === '' ? null : `${value}`;
   }

   get sortDir() {
      return this._sortDir;
   }

   private set sortDir(value: SortDirection | null) {
      if (!this._sort) {
         this._sortDir = null;
         return;
      }

      const dir = `${value}`.toLowerCase();
      this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir;
   }

   get filter(): Filter | null {
      return this._filter;
   }

   private set filter(value: Filter | null) {
      this._filter =
         value === null || value === undefined || value === '' ? null : (`${value}` as any);
   }
}

export class SearchResults<E extends Entity, Filter = string> {
   readonly items: E[];
   readonly total: number;
   readonly currentPage: number;
   readonly lastPage: number;
   readonly perPage: number;
   readonly sort: string | null;
   readonly sortDir: SortDirection | null;
   readonly filter: Filter | null;

   constructor(props: SearchResultProps<E, Filter>) {
      this.items = props.items;
      this.total = props.total;
      this.currentPage = props.currentPage;
      this.perPage = props.perPage;
      this.lastPage = Math.ceil(this.total / this.perPage);
      this.sort = props.sort ?? null;
      this.sortDir = props.sortDir ?? null;
      this.filter = props.filter ?? null;
   }

   toJSON(forceEntity = false) {
      return {
         items: forceEntity ? this.items.map(item => item.toJSON()) : this.items,
         total: this.total,
         currentPage: this.currentPage,
         lastPage: this.lastPage,
         perPage: this.perPage,
         sort: this.sort,
         sortDir: this.sortDir,
         filter: this.filter,
      };
   }
}

export interface SearchableRepositoryInterface<
   E extends Entity,
   Filter = string,
   SearchInput = SearchParams<Filter>,
   SearchOutput = SearchResults<E, Filter>,
> extends RepositoryInterface<E> {
   sortableFields: string[];
   search(props: SearchInput): Promise<SearchOutput>;
}
