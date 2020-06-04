import { QueryList } from '@angular/core';
import { map, publishReplay, refCount, startWith } from 'rxjs/operators';

export function watchContentExist(queryList: QueryList<unknown>) {
  return queryList.changes.pipe(
    startWith(queryList),
    map((list: QueryList<unknown>) => !!list.length),
    publishReplay(1),
    refCount(),
  );
}
