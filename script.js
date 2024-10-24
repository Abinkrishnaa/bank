const accounts = JSON.parse(localStorage.getItem('accounts')) || {};
let currentAccount = null;

function createAccount(acno, name, password) {
    if (accounts[acno]) {
        alert('Account already exists!');
        return;
    }
    accounts[acno] = { username: name, password: password, balance: 0 };
    localStorage.setItem('accounts', JSON.stringify(accounts));
    alert('Account created successfully!');
}

function login(acno, password) {
    const account = accounts[acno];
    if (account && account.password === password) {
        currentAccount = account;
        return true;
    }
    return false;
}

function deposit(amount) {
    currentAccount.balance += parseFloat(amount);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    return `${amount} credited to your account successfully`;
}

function withdraw(amount) {
    if (parseFloat(amount) > currentAccount.balance) {
        return 'Insufficient balance';
    }
    currentAccount.balance -= parseFloat(amount);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    return `${amount} debited from your account successfully`;
}

function balanceEnquiry() {
    return `Your current balance is ${currentAccount.balance}`;
}

function logout() {
    currentAccount = null;
}

// Event listeners
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const acno = document.getElementById('login-acno').value;
    const password = document.getElementById('login-password').value;

    if (login(acno, password)) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('dashboard-container').style.display = 'block';
        document.getElementById('account-info').innerHTML = `Welcome, ${currentAccount.username} (Account: ${acno})`;
    } else {
        alert('Invalid account number or password');
    }
});

document.getElementById('create-account-btn').addEventListener('click', function () {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('create-account-container').style.display = 'block';
});

document.getElementById('create-account-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const acno = document.getElementById('acno').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    createAccount(acno, name, password);
    document.getElementById('create-account-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

document.getElementById('back-to-login-btn').addEventListener('click', function () {
    document.getElementById('create-account-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

document.getElementById('deposit-btn').addEventListener('click', function () {
    const amount = document.getElementById('amount').value;
    document.getElementById('result').innerHTML = deposit(amount);
});

document.getElementById('withdraw-btn').addEventListener('click', function () {
    const amount = document.getElementById('amount').value;
    document.getElementById('result').innerHTML = withdraw(amount);
});

document.getElementById('balance-enquiry-btn').addEventListener('click', function () {
    document.getElementById('result').innerHTML = balanceEnquiry();
});

document.getElementById('logout-btn').addEventListener('click', function () {
    logout();
    document.getElementById('dashboard-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

