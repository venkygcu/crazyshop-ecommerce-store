import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import api from '../api/client';

const Checkout = () => {
  const { getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const upiId = 'your-upi-id@bank';
  const payeeName = "crazyshop";
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalAmount}&cu=INR&tn=Ecommerce Purchase`;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      alert('Razorpay SDK not loaded. Please try again.');
      return;
    }
    try {
      const res = await api.post('/payment/create-order', { amount: totalAmount });
      const order = res.data;
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'CrazyShop',
        description: 'Ecommerce Purchase',
        handler: function (response) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id + ', Order ID: ' + response.razorpay_order_id);
          // Here you can redirect or update order status
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#007bff',
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Failed to create payment order. Please try again.');
    }
  };

  const copy = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 20 }}>
      <h1>Checkout</h1>
      <p>Complete your purchase securely.</p>

      <section style={{ marginTop: 24, padding: 16, border: '1px solid #ddd', borderRadius: 6 }}>
        <h2>Bank Transfer (Preferred)</h2>
        <p>Transfer the total amount to the following bank details and upload or email the receipt to finalize your order.</p>
        <div style={{ marginTop: 12, lineHeight: 1.8 }}>
          <div>Bank Name: <strong>SBI BANK</strong></div>
          <div>Account Number: <strong>39961125940</strong> <button onClick={() => copy('39961125940')}>Copy</button></div>
          <div>IFSC Code: <strong>SBIN0016296</strong> <button onClick={() => copy('SBIN0016296')}>Copy</button></div>
        </div>
        <p style={{ marginTop: 12, fontSize: 12, color: '#666' }}>Note: Ensure the account name and IFSC are correct before transfer. Keep the receipt as proof of payment.</p>
      </section>

      <section style={{ marginTop: 24, padding: 16, border: '1px dashed #ccc', borderRadius: 6 }}>
        <h2>Online Payment</h2>
        <p>Pay securely via PhonePe, Google Pay, BHIM, Paytm, or Credit/Debit Cards using Razorpay.</p>
        <div style={{ marginTop: 12, lineHeight: 1.8 }}>
          <div>Your payable amount is <strong>₹ {totalAmount.toFixed(2)}</strong></div>
        </div>
        <button
          onClick={handleRazorpayPayment}
          style={{ marginTop: 12, padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          Pay Now
        </button>
        <p style={{ marginTop: 12, fontSize: 12, color: '#666' }}>You will be redirected to Razorpay's secure payment gateway.</p>
      </section>

      <section style={{ marginTop: 24, padding: 16, border: '1px solid #ddd', borderRadius: 6 }}>
        <h2>UPI Payment (Manual)</h2>
        <p>Alternatively, pay directly via UPI using the details below.</p>
        <div style={{ marginTop: 12, lineHeight: 1.8 }}>
          <div>Your payable amount is <strong>₹ {totalAmount.toFixed(2)}</strong></div>
          <div>UPI ID: <strong>{upiId}</strong> <button onClick={() => copy(upiId)}>Copy</button></div>
          <div>Payee Name: <strong>{payeeName}</strong></div>
        </div>
        <button
          onClick={() => window.open(upiLink, '_blank')}
          style={{ marginTop: 12, padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          Pay via UPI App
        </button>
        <p style={{ marginTop: 12, fontSize: 12, color: '#666' }}>Click to open your UPI app for payment.</p>
      </section>
    </div>
  );
};

export default Checkout;
