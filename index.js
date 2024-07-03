class Calculator {
  expr;
  operator;

  constructor(expr) {
    this.expr = expr;

    this.operator = ['+', '-', '*', '/'].find(operator =>
      expr.includes(operator),
    );
  }

  count() {
    const [num1, num2] = this.expr.split(this.operator).map(v => parseInt(v));

    switch (this.operator) {
      case '+': {
        return num1 + num2;
      }
      case '-': {
        return num1 - num2;
      }
      case '*': {
        return num1 * num2;
      }
      case '/': {
        return num1 / num2;
      }
    }
  }

  get result() {
    return this.count();
  }
}

const calculator = new Calculator('1*8');

console.log(calculator.result);
