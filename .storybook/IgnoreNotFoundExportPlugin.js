/**
 * https://github.com/TypeStrong/ts-loader/issues/653
 */
const escapeStringForRegExp = string =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

module.exports = class IgnoreNotFoundExportPlugin {
  constructor(exportsToIgnore) {
    this.exportsToIgnore = exportsToIgnore || [];
  }

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

  apply(compiler) {
    const messageRegExp = this.getMessageRegExp();

    const doneHook = stats => {
      stats.compilation.warnings = stats.compilation.warnings.filter(warn => {
        if (
          warn.constructor.name === 'ModuleDependencyWarning' &&
          messageRegExp.test(warn.message)
        ) {
          return false;
        }
        return true;
      });
    };

    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook);
    } else {
      compiler.plugin('done', doneHook);
    }
  }
};
