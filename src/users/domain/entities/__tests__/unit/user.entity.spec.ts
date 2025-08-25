/* eslint-disable @typescript-eslint/unbound-method */
import { UserDataBuilder } from '@/users/testing/helpers/user-data-builder';
import { UserEntity, UserProps } from '../../user.entity';

describe('UserEntity unit tests', () => {
   let props: UserProps;
   let sut: UserEntity;

   beforeEach(() => {
      UserEntity.validate = jest.fn();
      props = UserDataBuilder({});

      sut = new UserEntity(props);
   });

   it('Constructor method', () => {
      expect(sut).toBeDefined();
      expect(UserEntity.validate).toHaveBeenCalled();

      expect(sut.props.name).toEqual(props.name);
      expect(sut.props.email).toEqual(props.email);
      expect(sut.props.password).toEqual(props.password);
      expect(sut.props.createdAt).toBeInstanceOf(Date);
   });

   it('Getter of name field', () => {
      expect(sut.name).toBe(props.name);
   });

   it('Setter of name field', () => {
      sut['name'] = 'new name';
      expect(sut.name).toBe('new name');
   });

   it('Getter of email field', () => {
      expect(sut.email).toBe(props.email);
   });

   it('Getter of password field', () => {
      expect(sut.password).toBe(props.password);
   });

   it('Setter of password field', () => {
      sut['password'] = 'new password';
      expect(sut.password).toBe('new password');
   });

   it('Should update a user name and password', () => {
      expect(sut.name).toBe(props.name);
      expect(sut.password).toBe(props.password);

      sut.updateName('new name');
      expect(sut.name).toBe('new name');

      sut.updatePassword('new password');
      expect(sut.password).toBe('new password');

      expect(UserEntity.validate).toHaveBeenCalledTimes(3);
   });
});
