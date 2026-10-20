import { z } from 'zod';

export type FieldWidget =
  | 'text'
  | 'textarea'
  | 'richText'
  | 'image'
  | 'link'
  | 'select'
  | 'toggle'
  | 'number'
  | 'array'
  | 'reference';

export interface FieldMetadata {
  label: string;
  widget: FieldWidget;
  helpText?: string;
  placeholder?: string;
  maxLength?: number;
  options?: Array<{ label: string; value: string }>;
  referenceCollection?: string;
}

export const withMeta = <T extends z.ZodTypeAny>(schema: T, meta: FieldMetadata): T => {
  return schema.describe(JSON.stringify(meta));
};

export const parseMeta = (schema: z.ZodTypeAny): FieldMetadata | undefined => {
  if (!schema.description) return undefined;
  try {
    return JSON.parse(schema.description) as FieldMetadata;
  } catch {
    return undefined;
  }
};
