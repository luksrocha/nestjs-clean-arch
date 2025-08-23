import { UserEntity, UserProps } from '../../user.entity';
import { faker } from '@faker-js/faker';

describe('UserEntity unit tests', () => {
   let props: UserProps;
   let sut: UserEntity;

   beforeEach(() => {
      props = {
         name: faker.person.fullName(),
         email: faker.internet.email(),
         password: faker.internet.password(),
      };

      sut = new UserEntity(props);
   });

   it('Constructor method', () => {
      expect(sut).toBeDefined();

      expect(sut.props.name).toEqual(props.name);
      expect(sut.props.email).toEqual(props.email);
      expect(sut.props.password).toEqual(props.password);
      expect(sut.props.createdAt).toBeInstanceOf(Date);
   });

   it('Getter of name field', () => {
      expect(sut.name).toBe(props.name);
   });

   it('Getter of email field', () => {
      expect(sut.email).toBe(props.email);
   });

   it('Getter of password field', () => {
      expect(sut.password).toBe(props.password);
   });
});
