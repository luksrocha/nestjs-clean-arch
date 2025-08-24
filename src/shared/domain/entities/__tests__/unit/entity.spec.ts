import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { Entity } from '../../entity';

type StubEntityProps = {
   prop1: string;
   prop2: number;
};

class StubEntity extends Entity<StubEntityProps> {
   constructor(props: StubEntityProps, id?: string) {
      super(props, id);
   }
}

describe('Entity unit tests', () => {
   it('should set props and id', () => {
      const props = { prop1: 'value1', prop2: 1 };
      const sut = new StubEntity(props);

      expect(sut.props).toStrictEqual(props);
      expect(sut._id).toBeDefined();
      expect(uuidValidate(sut.id)).toBeTruthy();
   });

   it('Should accept a valid uuid', () => {
      const props = { prop1: 'value1', prop2: 1 };
      const id = uuidv4();
      const sut = new StubEntity(props, id);

      expect(sut.props).toStrictEqual(props);
      expect(sut._id).toBeDefined();
      expect(sut._id).toBe(id);
      expect(uuidValidate(sut.id)).toBeTruthy();
   });

   it('should convert a entity to a JavaScript Object', () => {
      const props = { prop1: 'value1', prop2: 1 };
      const id = uuidv4();
      const sut = new StubEntity(props, id);

      expect(sut.toJSON()).toStrictEqual({
         id,
         ...props,
      });
   });
});
