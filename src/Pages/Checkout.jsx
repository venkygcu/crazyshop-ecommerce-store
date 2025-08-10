import React from 'react';

const Checkout = () => {
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
        <h2>Online Payment (Coming Soon)</h2>
        <p>We will enable card/UPI payments shortly via a secure payment gateway. Settlement will route to your bank credentials configured with the provider.</p>
      </section>
    </div>
  );
};

export default Checkout;
