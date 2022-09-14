const computersElement = document.getElementById("computers");
const featuresElement = document.getElementById("features");
const imageElement = document.getElementById("img_laptop");
const priceElement = document.getElementById("price");
const selectedComputerElement = document.getElementById("selected_pc");
const featureDisplay = document.getElementById("feature_txt");

let title = "";
let computers = [];
let price = 0.0;

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToDropdown(computers));


const addComputersToDropdown = (computers) => {
    computers.forEach(x => addComputerToDropdown(x));
}

const addComputerToDropdown = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);

}

const handleComputerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    featuresElement.innerText = selectedComputer.specs;
    featureDisplay.innerText = selectedComputer.description;
    title = selectedComputer.title;
    selectedComputerElement.innerText = title
    price = selectedComputer.price;
    priceElement.innerText = price;
    imageElement.src = "https://noroff-komputer-store-api.herokuapp.com/"+selectedComputer.image;
    
}

computersElement.addEventListener("change", handleComputerMenuChange);


function bank(balance, loan) {
    this.balance = balance;
    this.loan = loan;
    this.totalBalance = balance+loan;
    this.maxLoan = balance*2;
    this.salary = 0;

}

const account = new bank(0, 0)

refresh()

//functions


function refresh() {
    account.totalBalance = account.balance+account.loan;
    account.maxLoan = account.balance*2;

    document.getElementById('balance_balance').textContent = account.totalBalance;
    document.getElementById('loan').textContent = account.loan;
    document.getElementById('work_balance').textContent = account.salary;

    if (account.loan == 0) {

        document.getElementById('loan').textContent = "";
        document.getElementById('loan_text').textContent = "";

    } else {

        document.getElementById('loan').textContent = account.loan;
        document.getElementById('loan_text').textContent = "Loan:";
    }
}



function get_loan() {
    if (account.loan > 0) {

        prompt("You need to pay down your loan before you can take a new one");
        return;

    }

    let addloan = prompt("How much would you like to loan?")
    addloan = parseInt(addloan)

    if (addloan <= (account.maxLoan) && (account.loan == 0)) {

        prompt("loan of "+addloan+"EUR has been granted")
        account.loan += addloan;

        let payLoanBtn = document.createElement("button");
        payLoanBtn.innerHTML = "Pay loan";
        payLoanBtn.type = "submit";
        payLoanBtn.id = "pay_loan_button";
        payLoanBtn.className = "buttons";
        payLoanBtn.setAttribute("onclick", "pay_loan()")
        document.getElementById("work_div").appendChild(payLoanBtn);

        refresh()
    } else{
        prompt("can't loan that amount of money, you can loan: "+account.maxLoan)
    }
}



function bank_bt(){
    if (account.loan == 0){

        account.balance += account.salary;

    } else{

        paydown = account.salary*0.1;
        banking = account.salary*0.9;
        if (account.loan>=paydown) {

            prompt("Banking: "+banking+"EUR, paying down on loan: "+paydown+"EUR")
            account.loan -=paydown;
            account.balance += banking;

        } else {

            banking = account.salary-account.loan
            paydown = account.salary-banking
            account.loan -= paydown
            account.balance += banking
        }

    }

    account.salary = 0;
    refresh()

}

function pay_loan() {

    if(account.salary>account.loan) {

        account.salary -= account.loan;
        account.loan = 0;

    } else {

        account.loan -= account.salary;
        account.salary = 0;

    }

    refresh()
}

function work_bt() {

    account.salary += 100;
    refresh()

}

function buy_now(){
    if (account.totalBalance >= price){
        prompt("you are now the owner of a: "+ title);
        account.totalBalance -= price;
        account.balance -= price;

        

        refresh();
    } else {
        prompt("not sufficient money")
    }
}







