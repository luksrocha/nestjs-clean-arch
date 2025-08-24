import * as libClassValidator from 'class-validator';
import { ClassValidatorFields } from '../../class-validator-fields';

class StubClassValidatorFields extends ClassValidatorFields<{ field: string }> {}

describe('ClassValidatorFields Unit Tests', () => {
   it('should initialize errors and validatedData empty', () => {
      const sut = new StubClassValidatorFields();
      expect(sut.errors).toBeUndefined();
      expect(sut.validatedData).toBeUndefined();
   });

   it('should validate with errors', () => {
      const validateSpy = jest.spyOn(libClassValidator, 'validateSync');
      validateSpy.mockReturnValue([
         {
            property: 'field',
            constraints: {
               isRequired: 'test error',
            },
         },
      ]);
      const sut = new StubClassValidatorFields();

      expect(sut.validate(null)).toBeFalsy();
      expect(validateSpy).toHaveBeenCalled();
      expect(sut.validatedData).toBeUndefined();
      expect(sut.errors).toStrictEqual({ field: ['test error'] });
   });

   it('should validate without errors', () => {
      const validateSpy = jest.spyOn(libClassValidator, 'validateSync');
      validateSpy.mockReturnValue([]);
      const sut = new StubClassValidatorFields();

      expect(sut.validate({ field: 'value' })).toBeTruthy();
      expect(validateSpy).toHaveBeenCalled();
      expect(sut.validatedData).toStrictEqual({ field: 'value' });
      expect(sut.errors).toBeUndefined();
   });
});
