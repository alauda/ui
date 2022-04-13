import { QueryList } from '@angular/core';
import { map, startWith } from 'rxjs';

import { publishRef } from './operators';

export function watchContentExist(queryList: QueryList<unknown>) {
  return queryList.changes.pipe(
    startWith(queryList),
    map((list: QueryList<unknown>) => !!list.length),
    publishRef(),
  );
}
