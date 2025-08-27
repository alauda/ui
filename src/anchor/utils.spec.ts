import { getAnchorTreeItems } from './utils';

describe('getAnchorTreeItems', () => {
  it('should work as expected', () => {
    expect(
      getAnchorTreeItems([
        {
          id: '1',
          label: '1',
          level: 0,
        },
        {
          id: '1-1',
          label: '1-1',
          level: 1,
        },
        {
          id: '1-2',
          label: '1-2',
          level: 1,
        },
        {
          id: '2',
          label: '2',
          level: 0,
        },
        {
          id: '3',
          label: '3',
          level: 0,
        },
        {
          id: '3-1',
          label: '3-1',
          level: 1,
        },
        {
          id: '3-1-1',
          label: '3-1-1',
          level: 2,
        },
        {
          id: '3-1-2',
          label: '3-1-2',
          level: 2,
        },
        {
          id: '3-2',
          label: '3-2',
          level: 1,
        },
        {
          id: '4',
          label: '4',
          level: 0,
        },
      ]),
    ).toEqual([
      {
        id: '1',
        label: '1',
        level: 0,
        children: [
          { id: '1-1', label: '1-1', level: 1 },
          { id: '1-2', label: '1-2', level: 1 },
        ],
      },
      {
        id: '2',
        label: '2',
        level: 0,
      },
      {
        id: '3',
        label: '3',
        level: 0,
        children: [
          {
            id: '3-1',
            label: '3-1',
            level: 1,
            children: [
              { id: '3-1-1', label: '3-1-1', level: 2 },
              { id: '3-1-2', label: '3-1-2', level: 2 },
            ],
          },
          {
            id: '3-2',
            label: '3-2',
            level: 1,
          },
        ],
      },
      {
        id: '4',
        label: '4',
        level: 0,
      },
    ]);
  });
});
