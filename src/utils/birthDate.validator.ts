import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';

function minAgeValidator(value: any, args: ValidationArguments) {
  const dateOfBirth = new Date(value);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dateOfBirth.getFullYear();

  return age >= args.constraints[0];
}

export function MinAge(age: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'minAge',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [age],
      validator: {
        validate: minAgeValidator
      }
    });
  };
}
