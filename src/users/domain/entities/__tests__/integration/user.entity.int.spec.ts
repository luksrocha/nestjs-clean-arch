/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { UserDataBuilder } from '@/users/testing/helpers/user-data-builder';
import { UserEntity } from '../../user.entity';

describe('UserEntity Integration Tests', () => {
   describe('Constructor method', () => {
      it('Should throw error when creating a user with invalid name', () => {
         let userData = { ...UserDataBuilder({}), name: null as any };
         expect(() => new UserEntity(userData)).toThrow(EntityValidationError);

         userData = { ...UserDataBuilder({}), name: '' };
         expect(() => new UserEntity(userData)).toThrow(EntityValidationError);

         userData = { ...UserDataBuilder({}), name: 0 as any };
         expect(() => new UserEntity(userData)).toThrow(EntityValidationError);

         userData = { ...UserDataBuilder({}), name: 'a'.repeat(256) as any };
         expect(() => new UserEntity(userData)).toThrow(EntityValidationError);
      });

      it('Should throw error when creating a user with invalid email', () => {
         let userData = { ...UserDataBuilder({}), email: null as any };
         expect(() => new UserEntity(userData)).toThrow(EntityValidationError);

         userData = { ...UserDataBuilder({}), email: '' };
         expect(() => new UserEntity(userData)).toThrow(EntityValidationError);
      });

      it('Should throw error when creating a user with invalid password', () => {
         let userData = { ...UserDataBuilder({}), password: null as any };
         expect(() => new UserEntity(userData)).toThrow(EntityValidationError);

         userData = { ...UserDataBuilder({}), password: '' };
         expect(() => new UserEntity(userData)).toThrow(EntityValidationError);

         userData = { ...UserDataBuilder({}), password: 'a'.repeat(101) as any };
         expect(() => new UserEntity(userData)).toThrow(EntityValidationError);
      });

      it('Should throw error when creating a user with invalid createdAt', () => {
         let userData = { ...UserDataBuilder({}), createdAt: '2021-01-01' as any };
         expect(() => new UserEntity(userData)).toThrow(EntityValidationError);

         userData = { ...UserDataBuilder({}), createdAt: 1000 as any };
         expect(() => new UserEntity(userData)).toThrow(EntityValidationError);
      });

      it('Should create a valid user', () => {
         expect.assertions(0);
         const userData = UserDataBuilder({});
         new UserEntity(userData);
      });
   });

   describe('updateName method', () => {
      it('Should throw error when updating to a invalid name', () => {
         const user = new UserEntity(UserDataBuilder({}));

         expect(() => user.updateName(null as any)).toThrow(EntityValidationError);
         expect(() => user.updateName('')).toThrow(EntityValidationError);
         expect(() => user.updateName(0 as any)).toThrow(EntityValidationError);
         expect(() => user.updateName('a'.repeat(256) as any)).toThrow(EntityValidationError);
      });

      it('Should update the user name', () => {
         const user = new UserEntity(UserDataBuilder({}));
         user.updateName('John Doe');
         expect(user.name).toBe('John Doe');
      });
   });

   describe('updatePassword method', () => {
      it('Should throw error when updating to a invalid password', () => {
         const user = new UserEntity(UserDataBuilder({}));

         expect(() => user.updatePassword(null as any)).toThrow(EntityValidationError);
         expect(() => user.updatePassword('')).toThrow(EntityValidationError);
         expect(() => user.updatePassword('a'.repeat(101) as any)).toThrow(EntityValidationError);
      });

      it('Should update the user password', () => {
         const user = new UserEntity(UserDataBuilder({}));
         user.updatePassword('123456');
         expect(user.password).toBe('123456');
      });
   });
});
