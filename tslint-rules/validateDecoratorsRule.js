'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b;
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
exports.__esModule = true;
var path = require('path');
var Lint = require('tslint');
var minimatch = require('minimatch');
/**
 * Rule that enforces certain decorator properties to be defined and to match a pattern.
 * Properties can be forbidden by prefixing their name with a `!`.
 * Supports whitelisting files via the third argument. E.g.
 *
 * ```
 * "validate-decorators": [true, {
 *   "Component": {
 *     "encapsulation": "\\.None$",
 *     "!styles": ".*"
 *   }
 * }, "src/lib"]
 * ```
 */
var Rule = /** @class */ (function(_super) {
  __extends(Rule, _super);
  function Rule() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Rule.prototype.apply = function(sourceFile) {
    return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
  };
  return Rule;
})(Lint.Rules.AbstractRule);
exports.Rule = Rule;
var Walker = /** @class */ (function(_super) {
  __extends(Walker, _super);
  function Walker(sourceFile, options) {
    var _this = _super.call(this, sourceFile, options) || this;
    // Globs that are used to determine which files to lint.
    var fileGlobs = options.ruleArguments.slice(1) || [];
    // Relative path for the current TypeScript source file.
    var relativeFilePath = path.relative(process.cwd(), sourceFile.fileName);
    _this._rules = _this._generateRules(options.ruleArguments[0]);
    _this._enabled =
      Object.keys(_this._rules).length > 0 &&
      fileGlobs.some(function(p) {
        return minimatch(relativeFilePath, p);
      });
    return _this;
  }
  Walker.prototype.visitClassDeclaration = function(node) {
    var _this = this;
    if (this._enabled && node.decorators) {
      node.decorators
        .map(function(decorator) {
          return decorator.expression;
        })
        .filter(function(expression) {
          return (
            expression.arguments.length && expression.arguments[0].properties
          );
        })
        .forEach(function(expression) {
          return _this._validatedDecorator(expression);
        });
    }
    _super.prototype.visitClassDeclaration.call(this, node);
  };
  /**
   * Validates that a decorator matches all of the defined rules.
   * @param decorator Decorator to be checked.
   */
  Walker.prototype._validatedDecorator = function(decorator) {
    var _this = this;
    // Get the rules that are relevant for the current decorator.
    var rules = this._rules[decorator.expression.getText()];
    // Don't do anything if there are no rules.
    if (!rules) {
      return;
    }
    // Extract the property names and values.
    var props = decorator.arguments[0].properties.map(function(node) {
      return {
        name: node.name.getText(),
        value: node.initializer.getText(),
        node: node,
      };
    });
    // Find all of the required rule properties that are missing from the decorator.
    var missing = Object.keys(rules.required).filter(function(key) {
      return !props.find(function(prop) {
        return prop.name === key;
      });
    });
    if (missing.length) {
      // Exit early if any of the properties are missing.
      this.addFailureAtNode(
        decorator.parent,
        'Missing required properties: ' + missing.join(', '),
      );
    } else {
      // If all the necessary properties are defined, ensure that
      // they match the pattern and aren't in the forbidden list.
      props
        .filter(function(prop) {
          return rules.required[prop.name] || rules.forbidden[prop.name];
        })
        .forEach(function(prop) {
          var name = prop.name,
            value = prop.value,
            node = prop.node;
          var requiredPattern = rules.required[name];
          var forbiddenPattern = rules.forbidden[name];
          if (requiredPattern && !requiredPattern.test(value)) {
            _this.addFailureAtNode(
              node,
              'Invalid value for property. ' +
                ('Expected value to match "' + requiredPattern + '".'),
            );
          } else if (forbiddenPattern && forbiddenPattern.test(value)) {
            _this.addFailureAtNode(
              node,
              'Property value not allowed. ' +
                ('Value should not match "' + forbiddenPattern + '".'),
            );
          }
        });
    }
  };
  /**
   * Cleans out the blank rules that are passed through the tslint.json
   * and converts the string patterns into regular expressions.
   * @param config Config object passed in via the tslint.json.
   * @returns Sanitized rules.
   */
  Walker.prototype._generateRules = function(config) {
    var output = {};
    if (config) {
      Object.keys(config)
        .filter(function(decoratorName) {
          return Object.keys(config[decoratorName]).length > 0;
        })
        .forEach(function(decoratorName) {
          output[decoratorName] = Object.keys(config[decoratorName]).reduce(
            function(accumulator, prop) {
              var isForbidden = prop.startsWith('!');
              var cleanName = isForbidden ? prop.slice(1) : prop;
              var pattern = new RegExp(config[decoratorName][prop]);
              if (isForbidden) {
                accumulator.forbidden[cleanName] = pattern;
              } else {
                accumulator.required[cleanName] = pattern;
              }
              return accumulator;
            },
            { required: {}, forbidden: {} },
          );
        });
    }
    return output;
  };
  return Walker;
})(Lint.RuleWalker);
