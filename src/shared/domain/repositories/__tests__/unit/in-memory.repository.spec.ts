import { Entity } from '@/shared/domain/entities/entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { InMemoryRepository } from '../../in-memory.repository';

type StubEntityProps = {
   name: string;
   price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository Unit Tests', () => {
   let sut: StubInMemoryRepository;

   beforeEach(() => {
      sut = new StubInMemoryRepository();
   });

   it('Should start empty', () => {
      expect(sut.items.length).toBe(0);
   });

   it('Should insert a new entity', async () => {
      const entity = new StubEntity({ name: 'test', price: 10 });
      await sut.insert(entity);
      expect(sut.items.length).toBe(1);
      expect(sut.items[0].toJSON()).toStrictEqual(entity.toJSON());
   });

   it('Should find an entity by id', async () => {
      const entity = new StubEntity({ name: 'test', price: 10 });
      await sut.insert(entity);
      const result = await sut.findById(entity.id);
      expect(result.toJSON()).toStrictEqual(entity.toJSON());
   });

   it('Should find all entities', async () => {
      const entity = new StubEntity({ name: 'test', price: 10 });
      const entity2 = new StubEntity({ name: 'test2', price: 20 });
      await sut.insert(entity);
      await sut.insert(entity2);
      const result = await sut.findAll();
      expect(result.length).toBe(2);
      expect(result[0].toJSON()).toStrictEqual(entity.toJSON());
      expect(result[1].toJSON()).toStrictEqual(entity2.toJSON());
   });

   it('Should update an entity', async () => {
      const entity = new StubEntity({ name: 'test', price: 10 });
      await sut.insert(entity);
      const result = await sut.findById(entity.id);
      expect(result.toJSON()).toStrictEqual(entity.toJSON());

      const updatedEntity = new StubEntity({ name: 'updated', price: 20 }, entity.id);
      await sut.update(updatedEntity);
      const updatedResult = await sut.findById(entity.id);
      expect(updatedResult.toJSON()).toStrictEqual(updatedEntity.toJSON());
   });

   it('Should delete an entity', async () => {
      const entity = new StubEntity({ name: 'test', price: 10 });
      await sut.insert(entity);
      const result = await sut.findById(entity.id);
      expect(result.toJSON()).toStrictEqual(entity.toJSON());

      await sut.delete(entity.id);
      expect(sut.items.length).toBe(0);
      await expect(sut.findById(entity.id)).rejects.toThrow(NotFoundError);
   });
});
