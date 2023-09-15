document.addEventListener("DOMContentLoaded", () => {
    const monthlyIncomeInput = document.getElementById("monthly-income");
    const expenseList = document.getElementById("expense-list");
    const addExpenseButton = document.getElementById("add-expense");
    const totalIncome = document.getElementById("total-income");
    const totalExpenses = document.getElementById("total-expenses");
    const balance = document.getElementById("balance");
    const investmentTipsList = document.getElementById("investment-tips");
    const resetButton = document.getElementById("reset-button");
    const calculateInvestmentButton = document.getElementById("calculate-investment");
    const monthlyInvestmentInput = document.getElementById("monthly-investment");
    const investmentYearsInput = document.getElementById("investment-years");
    const investmentSimulation = document.getElementById("investment-simulation");
    const investmentSummary = document.getElementById("investment-summary");

    let expenses = [];
    let monthlyInvestment = 0;
    let investmentYears = 1; // Valor padrão de 5 anos
    let currentBalance = 0;

    addExpenseButton.addEventListener("click", () => {
        const expenseName = prompt("Nome da Despesa:");
        const expenseAmount = parseFloat(prompt("Valor da Despesa:"));

        if (expenseName && !isNaN(expenseAmount)) {
            expenses.push({ name: expenseName, amount: expenseAmount });
            updateExpenseList();
            provideInvestmentTips();
            calculateInvestment();
        }
    });

    function updateExpenseList() {
        let expenseHTML = "";
        let totalExpenseAmount = 0;

        expenses.forEach((expense) => {
            expenseHTML += `<li>${expense.name}: $${expense.amount}</li>`;
            totalExpenseAmount += expense.amount;
        });

        expenseList.innerHTML = expenseHTML;
        totalExpenses.textContent = `$${totalExpenseAmount.toFixed(2)}`;
    }

    function updateBalance() {
        const income = parseFloat(monthlyIncomeInput.value);
        const totalExpenseAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
        currentBalance = income - totalExpenseAmount - monthlyInvestment;
        totalIncome.textContent = `$${income.toFixed(2)}`;
        balance.textContent = `$${currentBalance.toFixed(2)}`;
    }

    function provideInvestmentTips() {
        const totalIncomeValue = parseFloat(monthlyIncomeInput.value);
        const tipsList = [
            "Considere investir parte de sua renda em um fundo de investimento de baixo risco.",
            "Diversifique seus investimentos para reduzir o risco. Considere ações, títulos e fundos mútuos.",
            "Mantenha uma reserva de emergência equivalente a pelo menos três a seis meses de despesas.",
            "Pense a longo prazo ao investir, e não se preocupe com flutuações de curto prazo.",
            "Procure orientação de um profissional financeiro para ajudá-lo a criar uma estratégia de investimento sólida."
        ];

        let investmentTipsHTML = "";

        if (!isNaN(totalIncomeValue) && totalIncomeValue > 0) {
            tipsList.forEach((tip) => {
                investmentTipsHTML += `<li>${tip}</li>`;
            });
        }

        investmentTipsList.innerHTML = investmentTipsHTML;
    }

    function calculateInvestment() {
        const monthlyInvestmentValue = parseFloat(monthlyInvestmentInput.value);

        if (!isNaN(monthlyInvestmentValue) && monthlyInvestmentValue >= 50) {
            monthlyInvestment = monthlyInvestmentValue;
        } else {
            monthlyInvestment = 0;
        }

        investmentYears = parseFloat(investmentYearsInput.value);

        if (isNaN(investmentYears) || investmentYears <= 0) {
            investmentYears = 1; // Valor mínimo de 1 ano
        }

        const monthlyInterestRate = 0.01; // Taxa de juros mensal (1% ao mês)
        const investmentDurationMonths = investmentYears * 12;

        let totalInvestment = 0;

        for (let i = 0; i < investmentDurationMonths; i++) {
            totalInvestment += monthlyInvestment;
            totalInvestment *= 1 + monthlyInterestRate;
        }

        investmentSimulation.textContent = `Se você investir R$ ${monthlyInvestment.toFixed(2)} por mês durante ${investmentYears} anos com uma taxa de juros mensal de 1%, seu investimento total será de R$ ${totalInvestment.toFixed(2)}.`;

        // Atualizar o saldo disponível após o investimento
        updateBalance();

        // Adicionar o valor investido ao resumo de orçamento
        investmentSummary.textContent = `Valor investido: R$ ${monthlyInvestment.toFixed(2)}`;
    }

    resetButton.addEventListener("click", () => {
        // Limpar todas as informações e recarregar a página
        location.reload();
    });

    monthlyIncomeInput.addEventListener("input", () => {
        updateBalance();
        provideInvestmentTips();
    });

    calculateInvestmentButton.addEventListener("click", () => {
        calculateInvestment();
    });
});
