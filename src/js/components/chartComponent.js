export const chartComponent = (stat) => {

    let view = `
        <div>
            <figure class="diagram">
                <div class="diagram-main">
                    <canvas id="income-chart" class="canvas">
                    </canvas>
                </div>
            </figure>
            <div class="total-card">
                <span class="total-card-text total-card-green">${stat["incomeAmount"]}</span>
                <span class="total-card-text">Total Income</span>
            </div>
        </div>
        <div>
            <figure class="diagram">
                <div class="diagram-main">
                    <canvas id="expense-chart" class="canvas">
                    </canvas>
                </div>
            </figure>
            <div class="total-card">
                <span class="total-card-text total-card-red">${stat["expenseAmount"]}</span>
                <span class="total-card-text">Total Expense</span>
            </div>
        </div>
    `;  
    
    return view; 
}