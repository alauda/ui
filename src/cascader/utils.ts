import { CascaderOption, SearchedCascaderOption } from './cascader.types';

export function isParentOption<T>(option: CascaderOption<T>): boolean {
  return (
    (option.children && !!option.children.length) || option.isLeaf === false
  );
}

export function dropRestItems<T>(arr: T[], index: number) {
  return arr.slice(0, index + 1);
}

export function searchCascadeOptions<T>(
  root: Array<CascaderOption<T>>,
  filterString: string,
) {
  const results: Array<SearchedCascaderOption<T, T[]>> = [];

  function search(
    node: CascaderOption<T>,
    path: Array<CascaderOption<T>> = [],
  ) {
    const newPath = path.concat(node);

    const pathIncludesFilterString = newPath.some(p =>
      p.label.includes(filterString),
    );

    if (!isParentOption(node)) {
      if (pathIncludesFilterString) {
        const result = {
          label: newPath.map(p => p.label).join(' / '),
          value: newPath.map(p => p.value),
          path: newPath,
        };
        results.push(result);
      }
      return;
    }

    // 如果当前节点不是叶子节点，继续深度优先遍历其子节点
    node.children.forEach(child => {
      search(child, newPath);
    });
  }

  root.forEach(node => search(node));
  return results;
}

export function trackByOptions<T>(
  _: number,
  options: Array<CascaderOption<T> | SearchedCascaderOption<T, T[]>>,
) {
  return options.map(option => option.value).join(',');
}

export function trackByOption<T>(_: number, option: CascaderOption<T>) {
  return [option.value, option.children?.map(o => o.value).join(',')].join('~');
}
