/* eslint-disable @typescript-eslint/require-await */
import { Entity } from '@/shared/domain/entities/entity';
import { InMemorySearchableRepository } from '../../in-memory-searchable.repository ';

type StubEntityProps = {
   name: string;
   price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
   sortableFields: string[] = ['name'];

   protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
      if (!filter) return items;

      return items.filter(item => item.props.name.toLowerCase().includes(filter.toLowerCase()));
   }
}

describe('InMemorySearchableRepository Unit Tests', () => {
   let sut: StubInMemorySearchableRepository;

   beforeEach(() => {
      sut = new StubInMemorySearchableRepository();
   });

   describe('applyFilter method', () => {
      it('should not filter items if filter is null', async () => {
         const items = [new StubEntity({ name: 'test', price: 50 })];
         const spyFilterMethod = jest.spyOn(items, 'filter');
         const itemsFiltered = await sut['applyFilter'](items, null);
         expect(itemsFiltered).toStrictEqual(items);
         expect(spyFilterMethod).not.toHaveBeenCalled();
      });

      it('should filter using filter param', async () => {
         const items = [
            new StubEntity({ name: 'test', price: 50 }),
            new StubEntity({ name: 'TEST', price: 100 }),
            new StubEntity({ name: 'other', price: 150 }),
         ];

         const spyFilterMethod = jest.spyOn(items, 'filter');
         let itemsFiltered = await sut['applyFilter'](items, 'TEST');
         expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
         expect(spyFilterMethod).toHaveBeenCalledTimes(1);

         itemsFiltered = await sut['applyFilter'](items, 'test');
         expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
         expect(spyFilterMethod).toHaveBeenCalledTimes(2);

         itemsFiltered = await sut['applyFilter'](items, 'no-filter');
         expect(itemsFiltered).toStrictEqual([]);
         expect(itemsFiltered).toHaveLength(0);
         expect(spyFilterMethod).toHaveBeenCalledTimes(3);
      });
   });

   describe('applySort method', () => {
      let items: StubEntity[];

      beforeEach(() => {
         items = [
            new StubEntity({ name: 'a', price: 50 }),
            new StubEntity({ name: 'd', price: 100 }),
            new StubEntity({ name: 'b', price: 150 }),
            new StubEntity({ name: 'c', price: 150 }),
         ];
      });

      it('should not sort items', async () => {
         let itemsSorted = await sut['applySort'](items, null, null);
         expect(itemsSorted).toStrictEqual(items);

         itemsSorted = await sut['applySort'](items, 'price', 'asc');
         expect(itemsSorted).toStrictEqual(items);
      });

      it('should sort items by a field name', async () => {
         let itemsSorted = await sut['applySort'](items, 'name', 'asc');
         expect(itemsSorted).toStrictEqual([items[0], items[2], items[3], items[1]]);

         itemsSorted = await sut['applySort'](items, 'name', 'desc');
         expect(itemsSorted).toStrictEqual([items[1], items[3], items[2], items[0]]);
      });
   });

   describe('applyPaginate method', () => {
      it('should paginate items if page and perPage are provided', async () => {
         const items = [
            new StubEntity({ name: 'a', price: 50 }),
            new StubEntity({ name: 'b', price: 100 }),
            new StubEntity({ name: 'c', price: 150 }),
            new StubEntity({ name: 'd', price: 200 }),
            new StubEntity({ name: 'e', price: 250 }),
         ];

         let itemsPaginated = await sut['applyPaginate'](items, 1, 2);
         expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

         itemsPaginated = await sut['applyPaginate'](items, 2, 2);
         expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

         itemsPaginated = await sut['applyPaginate'](items, 3, 2);
         expect(itemsPaginated).toStrictEqual([items[4]]);

         itemsPaginated = await sut['applyPaginate'](items, 4, 2);
         expect(itemsPaginated).toStrictEqual([]);

         itemsPaginated = await sut['applyPaginate'](items, 1, 4);
         expect(itemsPaginated).toStrictEqual([items[0], items[1], items[2], items[3]]);

         itemsPaginated = await sut['applyPaginate'](items, 2, 4);
         expect(itemsPaginated).toStrictEqual([items[4]]);
      });
   });

   describe('search method', () => {
      it('should return items if search is null', async () => {});
   });
});
