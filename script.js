// dom for input handling
let input = document.getElementById("equation");
let btnC = document.getElementsByClassName("btnC");
let btn0 = document.getElementsByClassName("btn0");
let btn1 = document.getElementsByClassName("btn1");
let btn2 = document.getElementsByClassName("btn2");
let btn3 = document.getElementsByClassName("btn3");
let btn4 = document.getElementsByClassName("btn4");
let btn5 = document.getElementsByClassName("btn5");
let btn6 = document.getElementsByClassName("btn6");
let btn7 = document.getElementsByClassName("btn7");
let btn8 = document.getElementsByClassName("btn8");
let btn9 = document.getElementsByClassName("btn9");
let btnplus = document.getElementsByClassName("btnplus");
let btnminus = document.getElementsByClassName("btnminus");
let btnmul = document.getElementsByClassName("btnmul");
let btndiv = document.getElementsByClassName("btndiv");
let btnequal = document.getElementsByClassName("btnequal");
let btnback = document.getElementsByClassName("btnback");

btnback[0].addEventListener("click", function () {
	let equation = input.value;
	input.value = equation.substring(0, equation.length - 1);
});

btnequal[0].addEventListener("click", function () {
	let equation = input.value;
	// function to check if the equation is valid means if it contains some albhabets or special characters then it is invalid
	function isValid(equation) {
		for (let i = 0; i < equation.length; i++) {
			if (
				(equation[i] >= "a" && equation[i] <= "z") ||
				(equation[i] >= "A" && equation[i] <= "Z")
			) {
				return false;
			}
		}
		return true;
	}

	if (!isValid(equation)) {
		alert("Invalid Equation\nIt contains some alphabets or special characters");
		return;
	}

	let pofixequ = InfixToPofix(equation);
	let ans = Number(pofixEval(pofixequ));
	input.value = ans;
});

btnC[0].addEventListener("click", function () {
	input.value = "";
});

btn0[0].addEventListener("click", function () {
	input.value = input.value + "0";
});
btn1[0].addEventListener("click", function () {
	input.value = input.value + "1";
});
btn2[0].addEventListener("click", function () {
	input.value = input.value + "2";
});
btn3[0].addEventListener("click", function () {
	input.value = input.value + "3";
});
btn4[0].addEventListener("click", function () {
	input.value = input.value + "4";
});
btn5[0].addEventListener("click", function () {
	input.value = input.value + "5";
});
btn6[0].addEventListener("click", function () {
	input.value = input.value + "6";
});
btn7[0].addEventListener("click", function () {
	input.value = input.value + "7";
});
btn8[0].addEventListener("click", function () {
	input.value = input.value + "8";
});
btn9[0].addEventListener("click", function () {
	input.value = input.value + "9";
});
btnplus[0].addEventListener("click", function () {
	input.value = input.value + "+";
});
btnminus[0].addEventListener("click", function () {
	input.value = input.value + "-";
});
btnmul[0].addEventListener("click", function () {
	input.value = input.value + "*";
});
btndiv[0].addEventListener("click", function () {
	input.value = input.value + "/";
});

// function to add audio to the buttons
let audio = new Audio("./click.mp3");
// add to all elements inside buttons id except to the equal button
let buttons = document.getElementById("buttons").querySelectorAll("button");
buttons.forEach((btn) => {
	btn.addEventListener("click", function () {
		audio.play();
	});
});

let eqaudio = new Audio("./answer.mp3");

btnequal.addEventListener("click", function () {
	eqaudio.play();
});

// -------------------Calculator logic Code-------------------

// equation = "21/3+4";

// operator preferences function

function preference(op) {
	if (op == "+" || op == "-") {
		return 1;
	} else if (op == "*" || op == "/") {
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
				while (
					stk.length != 0 &&
					preference(stk[stk.length - 1]) >= preference(n)
				) {
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
	return stk[stk.length - 1];
}
