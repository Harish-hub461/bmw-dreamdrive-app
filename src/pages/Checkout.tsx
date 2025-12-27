import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet,
  ChevronLeft,
  Calculator,
  Check,
  Shield
} from 'lucide-react';
import { cars, formatPrice } from '@/data/cars';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

type PaymentMethod = 'upi' | 'credit' | 'debit' | 'netbanking';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [showEMI, setShowEMI] = useState(false);
  const [downPayment, setDownPayment] = useState(20);
  const [tenure, setTenure] = useState(36);
  const [isProcessing, setIsProcessing] = useState(false);

  const car = cars.find(c => c.id === id);

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <Button onClick={() => navigate('/')} className="bmw-gradient">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const interestRate = 8.5;
  const downPaymentAmount = (car.onRoadPrice * downPayment) / 100;
  const loanAmount = car.onRoadPrice - downPaymentAmount;
  const monthlyInterestRate = interestRate / 12 / 100;
  const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) / 
              (Math.pow(1 + monthlyInterestRate, tenure) - 1);

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'credit', name: 'Credit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
    { id: 'debit', name: 'Debit Card', icon: Wallet, desc: 'All major banks' },
    { id: 'netbanking', name: 'Net Banking', icon: Building2, desc: '50+ banks supported' },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Order Placed Successfully!',
      description: `Your BMW ${car.model} order has been confirmed. Our team will contact you shortly.`,
    });
    
    setIsProcessing(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 lg:pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/car/${car.id}`)}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Details</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Car Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex gap-4">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{car.model}</h3>
                    <p className="text-muted-foreground text-sm">{car.series} • {car.fuelType}</p>
                    <p className="text-primary font-semibold mt-2">{formatPrice(car.onRoadPrice)}</p>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <method.icon className={`w-6 h-6 mb-2 ${
                        paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <p className="font-medium">{method.name}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Payment Form */}
                <div className="space-y-4">
                  {paymentMethod === 'upi' && (
                    <div>
                      <Label htmlFor="upi">UPI ID</Label>
                      <Input
                        id="upi"
                        placeholder="yourname@upi"
                        className="mt-1 h-12 bg-muted border-border/50 rounded-xl"
                      />
                    </div>
                  )}

                  {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                    <>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1 h-12 bg-muted border-border/50 rounded-xl"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="mt-1 h-12 bg-muted border-border/50 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            className="mt-1 h-12 bg-muted border-border/50 rounded-xl"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div>
                      <Label>Select Bank</Label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'PNB'].map((bank) => (
                          <button
                            key={bank}
                            className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium"
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* EMI Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 rounded-2xl"
              >
                <button
                  onClick={() => setShowEMI(!showEMI)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Calculator className="w-6 h-6 text-primary" />
                    <span className="text-xl font-semibold">EMI Calculator</span>
                  </div>
                  <ChevronLeft className={`w-5 h-5 transition-transform ${showEMI ? '-rotate-90' : 'rotate-0'}`} />
                </button>

                {showEMI && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 space-y-6"
                  >
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Down Payment</Label>
                        <span className="font-medium">{downPayment}% ({formatPrice(downPaymentAmount)})</span>
                      </div>
                      <Slider
                        value={[downPayment]}
                        onValueChange={(value) => setDownPayment(value[0])}
                        min={10}
                        max={50}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Tenure</Label>
                        <span className="font-medium">{tenure} months</span>
                      </div>
                      <div className="flex gap-3 mt-2">
                        {[12, 24, 36, 48, 60].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTenure(t)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                              tenure === t
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                          >
                            {t}M
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-medium">{interestRate}% p.a.</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-medium">{formatPrice(loanAmount)}</span>
                      </div>
                      <div className="border-t border-border pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Monthly EMI</span>
                          <span className="text-2xl font-bold text-primary">
                            {formatPrice(Math.round(emi))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 rounded-2xl sticky top-24"
              >
                <h2 className="text-xl font-semibold mb-4">Price Breakdown</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ex-Showroom Price</span>
                    <span>{formatPrice(car.startingPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Registration</span>
                    <span>{formatPrice(Math.round(car.startingPrice * 0.05))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Insurance</span>
                    <span>{formatPrice(Math.round(car.startingPrice * 0.03))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accessories</span>
                    <span>{formatPrice(Math.round(car.startingPrice * 0.02))}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total On-Road</span>
                      <span className="text-2xl font-bold text-gradient-blue">
                        {formatPrice(car.onRoadPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full h-14 bmw-gradient text-lg font-semibold rounded-xl glow-effect"
                >
                  {isProcessing ? (
                    <span className="flex items-center space-x-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                      <span>Processing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span>Complete Purchase</span>
                    </span>
                  )}
                </Button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>100% Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Free Delivery & Registration</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    <span>3 Year Warranty Included</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
