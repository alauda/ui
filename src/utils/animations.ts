import { AnimationQueryMetadata } from '@angular/animations';

export const getAnimationQueryMetadatas = (
  classNames: string[],
  query: (className: string) => AnimationQueryMetadata,
) => classNames?.map(className => query(className));
