'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
////////////////////////////
// DISPLAY MOVEMENTS
////////////////////////////
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements([200, 450, -400, 3000, -650, -130, 70, 1300]);
////////////////////////////
// CREATE USERNAME
////////////////////////////
const createUsername = function (accounts) {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word[0];
      })
      .join('');
  });
};
createUsername(accounts);

////////////////////////////
// CALCULATE BALANCE
////////////////////////////
const calcBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  return balance;
};

////////////////////////////
// DISPLAY SUMMARY
////////////////////////////
const displaySummary = function (acc) {
  const deposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const withdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = acc.movements
    .map(mov => (mov * acc.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  acc.balance = calcBalance(acc);
  labelSumIn.textContent = `${deposit}€`;
  labelSumOut.textContent = `${Math.abs(withdrawal)}€`;
  labelSumInterest.textContent = `${interest}€`;
  labelBalance.textContent = `${acc.balance}€`;
};
// displaySummary(account1);

////////////////////////////
// DISPLAY WELCOME
////////////////////////////
const displayWelcome = function (acc) {
  labelWelcome.textContent = `Welcome again,${acc.owner.split(' ')[0]} `;
};
////////////////////////////
// DISPLAY USER INTERFACE
////////////////////////////
const userInterface = function (acc) {
  displayMovements(acc.movements);
  // display summary
  displaySummary(acc);

  // display welcome
  displayWelcome(acc);
};

////////////////////////////
// EVENTS
////////////////////////////

//LOGIN USER
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    userInterface(currentAccount);
    containerApp.style.opacity = 100;
  }
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
});

// AMOUNT TRANSFER
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);

  if (
    amount <= calcBalance(currentAccount) &&
    amount > 0 &&
    receiver &&
    currentAccount.username != inputTransferTo.value
  ) {
    console.log('success transfered...!');
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);
    userInterface(currentAccount);
  }
});

//REQUEST LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  currentAccount.movements.push(loanAmount);
  userInterface(currentAccount);
});

// DELETE ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const user = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  if (currentAccount.username === user && currentAccount.pin === pin) {
    const index = accounts.findIndex(acc => acc.username === user);
    console.log(index);
    accounts.splice(index, index + 1);
    console.log(accounts);
  }
});

console.log(accounts);
/////////////////////////////////////////////////

// trying to reload a page or alternate logout...!

// const logoEl = document.querySelector('.logo');
// logoEl.addEventListener('click', function () {
//   // location.reload(true);
//   location.assign('https://www.google.com/');
// });

// calculate the max value in a array movements of each account...!

// const max = currentAccount.movements.reduce(
//   (acc, mov) => {
//     if (acc > mov) return acc;
//     else return mov;
//   },

//   currentAccount.movements[0]
// );
// console.log(max);
