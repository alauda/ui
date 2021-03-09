/**
 * https://github.com/TypeStrong/ts-loader/issues/653
 */
import { Compiler, Plugin, Stats } from 'webpack';

const escapeStringForRegExp = (str: string) =>
  str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

declare class ModuleDependencyWarning {
  message: string;
}

export class IgnoreNotFoundExportPlugin implements Plugin {
  constructor(private readonly exportsToIgnore: string[] = []) {}

  getMessageRegExp() {
    if (this.exportsToIgnore.length > 0) {
      const exportsPattern =
        '(' + this.exportsToIgnore.map(escapeStringForRegExp).join('|') + ')';

      return new RegExp(
        `export '${exportsPattern}'( \\(reexported as '.*'\\))? was not found in`,
      );
    } else {
      return /export '.*'( \(reexported as '.*'\))? was not found in/;
    }
  }

  apply(compiler: Compiler) {
    const messageRegExp = this.getMessageRegExp();

    const doneHook = (stats: Stats) => {
      stats.compilation.warnings = stats.compilation.warnings.filter(
        (warn: ModuleDependencyWarning) => {
          if (
            warn.constructor.name === 'ModuleDependencyWarning' &&
            messageRegExp.test(warn.message)
          ) {
            return false;
          }
          return true;
        },
      );
    };

    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook);
    } else {
      compiler.plugin('done', doneHook);
    }
  }
}
