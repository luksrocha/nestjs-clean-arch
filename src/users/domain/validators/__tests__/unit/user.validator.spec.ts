/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserDataBuilder } from '@/users/testing/helpers/user-data-builder';
import { UserRules, UserValidator } from '../../user.validator';

describe('UserValidator unit tests', () => {
   let sut: UserValidator;

   beforeEach(() => {
      sut = new UserValidator();
   });

   describe('Name Field', () => {
      it('Invalidation cases for name field', () => {
         let isValid = sut.validate(null as any);
         expect(isValid).toBeFalsy();
         expect(sut.errors['name']).toStrictEqual([
            'name should not be empty',
            'name must be a string',
            'name must be shorter than or equal to 255 characters',
         ]);

         isValid = sut.validate({ ...UserDataBuilder({}), name: '' });
         expect(isValid).toBeFalsy();
         expect(sut.errors['name']).toStrictEqual(['name should not be empty']);

         isValid = sut.validate({ ...UserDataBuilder({}), name: 1 as any });
         expect(isValid).toBeFalsy();
         expect(sut.errors['name']).toStrictEqual([
            'name must be a string',
            'name must be shorter than or equal to 255 characters',
         ]);

         isValid = sut.validate({ ...UserDataBuilder({}), name: 'a'.repeat(256) });
         expect(isValid).toBeFalsy();
         expect(sut.errors['name']).toStrictEqual([
            'name must be shorter than or equal to 255 characters',
         ]);
      });

      it('Should accept a valid name', () => {
         const userData = UserDataBuilder({});
         const isValid = sut.validate(userData);
         expect(isValid).toBeTruthy();
         expect(sut.errors).toBeUndefined();
         expect(sut.validatedData).toStrictEqual(new UserRules(userData));
      });
   });

   describe('Email Field', () => {
      it('Invalidation cases for email field', () => {
         let isValid = sut.validate(null as any);
         expect(isValid).toBeFalsy();
         expect(sut.errors['email']).toStrictEqual([
            'email should not be empty',
            'email must be an email',
         ]);

         isValid = sut.validate({ ...UserDataBuilder({}), email: '' });
         expect(isValid).toBeFalsy();
         expect(sut.errors['email']).toStrictEqual([
            'email should not be empty',
            'email must be an email',
         ]);

         isValid = sut.validate({ ...UserDataBuilder({}), email: 1 as any });
         expect(isValid).toBeFalsy();
         expect(sut.errors['email']).toStrictEqual(['email must be an email']);
      });

      it('Should accept a valid email', () => {
         const userData = UserDataBuilder({});
         const isValid = sut.validate(userData);
         expect(isValid).toBeTruthy();
         expect(sut.errors).toBeUndefined();
         expect(sut.validatedData).toStrictEqual(new UserRules(userData));
      });
   });

   describe('Password Field', () => {
      it('Invalidation cases for password field', () => {
         let isValid = sut.validate(null as any);
         expect(isValid).toBeFalsy();
         expect(sut.errors['password']).toStrictEqual([
            'password should not be empty',
            'password must be a string',
            'password must be shorter than or equal to 100 characters',
         ]);

         isValid = sut.validate({ ...UserDataBuilder({}), password: '' });
         expect(isValid).toBeFalsy();
         expect(sut.errors['password']).toStrictEqual(['password should not be empty']);

         isValid = sut.validate({ ...UserDataBuilder({}), password: 1 as any });
         expect(isValid).toBeFalsy();
         expect(sut.errors['password']).toStrictEqual([
            'password must be a string',
            'password must be shorter than or equal to 100 characters',
         ]);

         isValid = sut.validate({ ...UserDataBuilder({}), password: 'a'.repeat(101) });
         expect(isValid).toBeFalsy();
         expect(sut.errors['password']).toStrictEqual([
            'password must be shorter than or equal to 100 characters',
         ]);
      });

      it('Should accept a valid password', () => {
         const userData = UserDataBuilder({});
         const isValid = sut.validate(userData);
         expect(isValid).toBeTruthy();
         expect(sut.errors).toBeUndefined();
         expect(sut.validatedData).toStrictEqual(new UserRules(userData));
      });
   });

   describe('CreatedAt Field', () => {
      it('Invalidation cases for createdAt field', () => {
         let isValid = sut.validate({ ...UserDataBuilder({}), createdAt: 1 as any });
         expect(isValid).toBeFalsy();
         expect(sut.errors['createdAt']).toStrictEqual(['createdAt must be a Date instance']);

         isValid = sut.validate({ ...UserDataBuilder({}), createdAt: '2021-01-01' as any });
         expect(isValid).toBeFalsy();
         expect(sut.errors['createdAt']).toStrictEqual(['createdAt must be a Date instance']);
      });

      it('Should accept a valid createdAt', () => {
         const userData = UserDataBuilder({});
         const isValid = sut.validate({ ...userData, createdAt: new Date() });
         expect(isValid).toBeTruthy();
         expect(sut.errors).toBeUndefined();
         expect(sut.validatedData).toStrictEqual(new UserRules(userData));
      });
   });
});
