/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SearchParams, SearchResults, SortDirection } from '../../searchable-repository-contract';

describe('SearchableRepositoryContract Unit Tests', () => {
   describe('SearchParams tests', () => {
      it('should be defined', () => {
         const params = [
            { page: null, expected: 1 },
            { page: undefined, expected: 1 },
            { page: '', expected: 1 },
            { page: 'test', expected: 1 },
            { page: 0, expected: 1 },
            { page: -1, expected: 1 },
            { page: 5.5, expected: 1 },
            { page: {}, expected: 1 },
            { page: false, expected: 1 },
            { page: true, expected: 1 },
            { page: {}, expected: 1 },
            { page: 1, expected: 1 },
            { page: 2, expected: 2 },
         ];

         params.forEach(item => {
            const sut = new SearchParams({ page: item.page as number });
            expect(sut.page).toBe(item.expected);
         });
      });

      it('should be able to set perPage', () => {
         const params = [
            { perPage: null, expected: 15 },
            { perPage: undefined, expected: 15 },
            { perPage: '', expected: 15 },
            { perPage: 'test', expected: 15 },
            { perPage: 0, expected: 15 },
            { perPage: -1, expected: 15 },
            { perPage: 5.5, expected: 15 },
            { perPage: {}, expected: 15 },
            { perPage: false, expected: 15 },
            { perPage: true, expected: 15 },
            { perPage: {}, expected: 15 },
            { perPage: 1, expected: 1 },
            { perPage: 2, expected: 2 },
            { perPage: 30, expected: 30 },
         ];

         params.forEach(item => {
            const sut = new SearchParams({ perPage: item.perPage as number });
            expect(sut.perPage).toBe(item.expected);
         });
      });

      it('should be able to set sort', () => {
         const params = [
            { sort: null, expected: null },
            { sort: undefined, expected: null },
            { sort: '', expected: null },
            { sort: 'test', expected: 'test' },
            { sort: 0, expected: '0' },
            { sort: -1, expected: '-1' },
            { sort: 5.5, expected: '5.5' },
         ];

         params.forEach(item => {
            const sut = new SearchParams({ sort: item.sort as string });
            expect(sut.sort).toBe(item.expected);
         });
      });

      it('should be able to set sortDir', () => {
         let sut = new SearchParams();
         expect(sut.sortDir).toBeNull();

         sut = new SearchParams({ sort: null });
         expect(sut.sortDir).toBeNull();

         sut = new SearchParams({ sort: undefined });
         expect(sut.sortDir).toBeNull();

         sut = new SearchParams({ sort: '' });
         expect(sut.sortDir).toBeNull();

         const params = [
            { sortDir: null, expected: 'desc' },
            { sortDir: undefined, expected: 'desc' },
            { sortDir: '', expected: 'desc' },
            { sortDir: 'test', expected: 'desc' },
            { sortDir: 0, expected: 'desc' },
            { sortDir: 'asc', expected: 'asc' },
            { sortDir: 'desc', expected: 'desc' },
            { sortDir: 'ASC', expected: 'asc' },
            { sortDir: 'DESC', expected: 'desc' },
         ];

         params.forEach(i => {
            expect(
               new SearchParams({ sort: 'field', sortDir: i.sortDir as SortDirection }).sortDir,
            ).toBe(i.expected);
         });
      });

      it('filter prop', () => {
         const sut = new SearchParams();
         expect(sut.filter).toBeNull();

         const params = [
            { filter: null, expected: null },
            { filter: undefined, expected: null },
            { filter: '', expected: null },
            { filter: 'test', expected: 'test' },
            { filter: 0, expected: '0' },
            { filter: -1, expected: '-1' },
            { filter: 5.5, expected: '5.5' },
            { filter: true, expected: 'true' },
            { filter: false, expected: 'false' },
            { filter: {}, expected: '[object Object]' },
            { filter: 1, expected: '1' },
            { filter: 2, expected: '2' },
            { filter: 25, expected: '25' },
         ];

         params.forEach(i => {
            expect(new SearchParams({ filter: i.filter as string }).filter).toBe(i.expected);
         });
      });
   });

   describe('SearchResults tests', () => {
      it('constructor props', () => {
         const sut = new SearchResults({
            items: ['test1', 'test2', 'test3', 'test4'] as any,
            total: 4,
            currentPage: 1,
            perPage: 2,
            sort: null,
            sortDir: null,
            filter: null,
         });

         expect(sut.toJSON()).toStrictEqual({
            items: ['test1', 'test2', 'test3', 'test4'],
            total: 4,
            currentPage: 1,
            lastPage: 2,
            perPage: 2,
            sort: null,
            sortDir: null,
            filter: null,
         });
      });
   });
});
