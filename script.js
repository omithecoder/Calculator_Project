// Enter your equation Here
let equation = "12+3*4+10/4";

// operator preferences function

function preference(op) {
	if (op == "+" || op == "-") {
		return 1;
	} else if (op == "*" || op == "-") {
		return 2;
	} else {
		return 3;
	}
}
// done 😀

// infix to postfix conversion function
function InfixToPofix(equation) {
	let i = 0;
	let n = 0;
	let res = Number(0);

	let postfix = [];
	let stk = [];
	while (i < equation.length) {
		n = equation[i];
		res = 0;
		while (n >= 0 && n <= 9) {
			res = Number(res * 10) + Number(n);
			i++;
			n = equation[i];
		}
		console.log(res);
		postfix.push(res);

		if (n == "+" || n == "*" || n == "-" || n == "/" || n == "^") {
			if (stk.length == 0) {
				stk.push(n);
			} else {
				while (preference(n) < preference(stk[stk.length - 1])) {
					// operator with smaller preference come after operator with higher preference then first higher preference operator will pop and then operator with lower preference get push into the stack
					postfix.push(stk.pop());
				}
				stk.push(n);
			}
			i++;
		}
	}

	while (stk.length != 0) {
		postfix.push(stk.pop());
	}

	console.log(postfix.toString());

	return postfix;
}

// done 😀

let pofixequ = InfixToPofix(equation);
pofixEval(pofixequ);

// function to solve postfix evaluations
function pofixEval(pofixequ) {
	let stk = [];
	let i = 0;
	while (i < pofixequ.length) {
		let n = pofixequ[i];
		if (n == "+" || n == "*" || n == "-" || n == "/" || n == "^") {
			{
				let b = Number(stk.pop());
				let a = Number(stk.pop());
				switch (n) {
					case "+":
						stk.push(a + b);
						break;
					case "-":
						stk.push(a - b);
						break;
					case "*":
						stk.push(a * b);
						break;
					case "/":
						stk.push(a / b);
						break;
					case "^":
						stk.push(a ** b);
						break;
					default:
						console.log("Invalide Operator " + n);
				}
			}
		} else {
			stk.push(Number(n));
		}
		i++;
	}
	console.log(stk[stk.length - 1]);
}
