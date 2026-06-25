/**
 * Bhagwati Divine Backend Inventory Synchronization Core
 * Controls real-time updates for available stock and processes transactions.
 */

// Initialize standard data for your 22 catalog items if it doesn't exist yet
function initInventoryDatabase() {
    for (let i = 1; i <= 22; i++) {
        if (localStorage.getItem(`stock_prod_${i}`) === null) {
            // Set a default initial inventory allocation of 30 units for each item
            localStorage.setItem(`stock_prod_${i}`, 30);
        }
    }
    console.log("Database initialized: 22 Chanting Machine stock records are active.");
}

// Automatically process and deduct stock levels when an order goes through
function deductInventoryOnOrder(productId, orderedQuantity) {
    let currentStock = parseInt(localStorage.getItem(`stock_prod_${productId}`)) || 0;
    let newStockValue = currentStock - orderedQuantity;
    
    // Prevent stock levels from dropping below zero
    if (newStockValue < 0) {
        newStockValue = 0;
    }
    
    localStorage.setItem(`stock_prod_${productId}`, newStockValue);
    return newStockValue;
}

// Check for and initialize the local storage database when the page runs
initInventoryDatabase();

