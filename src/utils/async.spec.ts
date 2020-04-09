import { sleep } from './async';

describe('async utils', () => {
  it('should sleep function return promise', () => {
    expect(sleep() instanceof Promise).toBeTruthy();
  });
});
