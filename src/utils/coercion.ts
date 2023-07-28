import { booleanAttribute } from '@angular/core';

export const coerceString = (val: unknown) => (val == null ? '' : String(val));

// https://github.com/angular/angular/issues/51190#issuecomment-1655566332
export type AttrBoolean = boolean | '';

export const coerceAttrBoolean: (val: AttrBoolean) => boolean =
  booleanAttribute;

// https://github.com/angular/angular/blob/1c553ee915b500820e11c53bffc582b65bb6b7ac/packages/core/src/util/coercion.ts#L39
export const isNumberValue = (val: unknown) =>
  !isNaN(parseFloat(val as any)) && !isNaN(Number(val));
