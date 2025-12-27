import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Car, Wrench, CreditCard, Check } from 'lucide-react';
import { cars, formatPrice } from '@/data/cars';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const serviceTypes = [
  { id: 'general', name: 'General Service', price: 15000, duration: '3-4 hours' },
  { id: 'oil-change', name: 'Oil Change', price: 8000, duration: '1-2 hours' },
  { id: 'full-service', name: 'Full Service', price: 35000, duration: '6-8 hours' },
  { id: 'ac-service', name: 'AC Service', price: 12000, duration: '2-3 hours' },
  { id: 'brake-check', name: 'Brake Inspection', price: 5000, duration: '1 hour' },
  { id: 'tire-rotation', name: 'Tire Rotation & Alignment', price: 6000, duration: '1-2 hours' },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const Service = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const selectedServiceData = serviceTypes.find(s => s.id === selectedService);

  const handleBooking = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Service Booked Successfully!',
      description: `Your ${selectedServiceData?.name} appointment is confirmed for ${selectedDate} at ${selectedTime}.`,
    });
    
    setIsProcessing(false);
    setStep(1);
    setSelectedCar('');
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
    setAdditionalNotes('');
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedCar && selectedService;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 lg:pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Book Your Service</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Keep your BMW in perfect condition with our certified service centers. 
              Book an appointment in just a few clicks.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: step >= s ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </motion.div>
                {s < 3 && (
                  <div className={`w-20 lg:w-32 h-1 mx-2 rounded-full ${
                    step > s ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Step 1: Select Car & Service */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <Car className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">Select Your BMW</h2>
                  </div>
                  
                  <Select value={selectedCar} onValueChange={setSelectedCar}>
                    <SelectTrigger className="h-14 bg-muted border-border/50 rounded-xl">
                      <SelectValue placeholder="Choose your BMW model" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border/50 max-h-60">
                      {cars.map((car) => (
                        <SelectItem key={car.id} value={car.id}>
                          {car.model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <Wrench className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">Select Service Type</h2>
                  </div>
                  
                  <div className="grid gap-4">
                    {serviceTypes.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left flex justify-between items-center ${
                          selectedService === service.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">Duration: {service.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">{formatPrice(service.price)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <Calendar className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">Select Date</h2>
                  </div>
                  
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="h-14 bg-muted border-border/50 rounded-xl"
                  />
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <Clock className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">Select Time Slot</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific issues or requests..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="mt-2 bg-muted border-border/50 rounded-xl"
                    rows={4}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">Booking Summary</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Car Model</span>
                      <span className="font-medium">{cars.find(c => c.id === selectedCar)?.model}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Service Type</span>
                      <span className="font-medium">{selectedServiceData?.name}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{selectedServiceData?.duration}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="font-semibold text-lg">Total Amount</span>
                      <span className="font-bold text-2xl text-primary">
                        {formatPrice(selectedServiceData?.price || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="font-semibold mb-4">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['UPI', 'Credit Card', 'Debit Card', 'Net Banking'].map((method) => (
                      <button
                        key={method}
                        className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                      >
                        <p className="font-medium">{method}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="h-12 px-8 rounded-xl"
                >
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="h-12 px-8 bmw-gradient rounded-xl"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleBooking}
                  disabled={isProcessing}
                  className="h-12 px-8 bmw-gradient rounded-xl glow-effect"
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
                    'Confirm Booking'
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Service;
