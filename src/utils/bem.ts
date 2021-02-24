// Experimental bem classname helper
export class Bem {
  constructor(private readonly namespace: string) {}

  block(...modifiers: Array<{ [name: string]: boolean } | string>) {
    const activatedModifiers = getActivatedModifiers(modifiers);
    if (activatedModifiers.length > 0) {
      return `${this.namespace} ${activatedModifiers
        .map(modifier => this.namespace + '--' + modifier)
        .join(' ')}`;
    }
    return this.namespace;
  }

  modifier(name: string) {
    return `${this.namespace}--${name}`;
  }

  element(
    name: string,
    ...modifiers: Array<{ [name: string]: boolean | '' } | string>
  ) {
    const activatedModifiers = getActivatedModifiers(modifiers);

    if (activatedModifiers.length > 0) {
      return `${this.namespace}__${name} ${activatedModifiers
        .map(modifier => this.namespace + '__' + name + '--' + modifier)
        .join(' ')}`;
    }

    return `${this.namespace}__${name}`;
  }
}

function getActivatedModifiers(
  modifiers: Array<{ [name: string]: boolean | '' } | string>,
) {
  return modifiers.reduce<string[]>((acc, modifier) => {
    if (!modifier) {
      return acc;
    }
    return acc.concat(
      typeof modifier === 'string'
        ? [modifier]
        : getActivatedModifiersFromObject(modifier),
    );
  }, []);
}

function getActivatedModifiersFromObject(modifiers: {
  [name: string]: boolean | '';
}) {
  return Object.keys(modifiers).filter(key => modifiers[key]);
}

export function buildBem(namespace: string) {
  return new Bem(namespace);
}
