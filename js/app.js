
// Navigation logic to launch single item sub-pages
function navigateToProduct(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

// Shopping Cart Storage System
let cart = JSON.parse(localStorage.getItem('divine_cart')) || [];

function addToCart(productId, name, price) {
    // Checking current storage array
    const existingItem = cart.find(item => item.id === productId);
    
    // Simple mock check for dynamic inventory rule
    let currentStock = parseInt(localStorage.getItem(`stock_prod_${productId}`)) || 10;
    if (currentStock <= 0) {
        alert("This chanting machine is currently out of stock!");
        return;
    }

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: name, price: price, quantity: 1 });
    }
    
    localStorage.setItem('divine_cart', JSON.stringify(cart));
    alert(`${name} added to your Cart successfully.`);
}

// Checkout Processing System (Razorpay & WhatsApp Routing Interface)
function processCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // --- STEP 1: PLACE YOUR RAZORPAY PAYMENT LINK GENERATION HERE ---
    console.log(`Initializing Razorpay payment sequence for: ₹${totalAmount}`);
    
    // --- STEP 2: WHATSAPP STRING LOGIC GENERATION ---
    let orderMessage = `✨ *New Order Placed!* ✨ %0A%0A`;
    cart.forEach((item, index) => {
        orderMessage += `${index + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}%0A`;
    });
    orderMessage += `%0A💰 *Total Value Paid:* ₹${totalAmount}%0A%0A📦 Please prepare shipment details.`;

    // Your Business Phone Number (Include country code without + sign)
    const merchantPhoneNumber = "919876543210"; 
    
    // Redirecting user to finalize notifications on WhatsApp
    window.open(`https://wa.me/${merchantPhoneNumber}?text=${orderMessage}`, '_blank');
    
    // Update local inventory values natively after success
    cart.forEach(item => {
        let stock = parseInt(localStorage.getItem(`stock_prod_${item.id}`)) || 10;
        localStorage.setItem(`stock_prod_${item.id}`, Math.max(0, stock - item.quantity));
    });

    // Reset temporary cart store
    cart = [];
    localStorage.removeItem('divine_cart');
}
