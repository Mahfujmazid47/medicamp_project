import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const camp = location.state?.camp;

    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (camp?.campFees) {
            axiosSecure.post('/create-payment-intent', { campFees: camp.campFees }).then(res => {
                setClientSecret(res.data.clientSecret);
            });
        }
    }, [camp, axiosSecure]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);

        const card = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            Swal.fire('Error', error.message, 'error');
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            Swal.fire('Error', confirmError.message, 'error');
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            const paymentData = {
                registrationId: camp._id,
                campId: camp.campId,
                campName: camp.campName,
                participantEmail: camp.participantEmail,
                amount: camp.campFees,
                transactionId: paymentIntent.id,
                date: new Date(),
                payment_status: 'paid',
                confirmation_status: 'confirmed',
            };

            const res = await axiosSecure.post('/payment-success', paymentData);
            // console.log(res.data);
            if (res.data.inserted) {
                Swal.fire('Success!', `Payment successful. Transaction ID: ${paymentIntent.id}`, 'success');
                navigate('/dashboard/registered-camps');
            }
        }

        setProcessing(false);
    };

    return (
        <div className="max-w-md mx-auto p-6 shadow-xl mt-10 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Pay for: {camp?.campName}</h2>
            <p className="mb-4">Amount: ${camp?.campFees}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement className="p-4 border rounded" />
                <button type="submit" className="btn btn-primary w-full mt-2" disabled={!stripe || !clientSecret || processing}>
                    {processing ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
};

export default Payment;
