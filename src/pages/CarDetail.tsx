import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Fuel, 
  Gauge, 
  Users, 
  Cog, 
  Shield, 
  Zap,
  Check,
  ShoppingCart
} from 'lucide-react';
import { cars, formatPrice } from '@/data/cars';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const car = cars.find(c => c.id === id);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const specs = [
    { icon: Cog, label: 'Engine', value: car.engine },
    { icon: Zap, label: 'Power', value: car.power },
    { icon: Gauge, label: 'Top Speed', value: car.topSpeed },
    { icon: Fuel, label: 'Mileage', value: car.mileage },
    { icon: Users, label: 'Seating', value: `${car.seatingCapacity} Seats` },
    { icon: Shield, label: 'Transmission', value: car.transmission },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 lg:pt-24">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Models</span>
          </button>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden glass-card">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={car.images[currentImageIndex]}
                    alt={car.model}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Series Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bmw-gradient rounded-full text-sm font-semibold text-primary-foreground">
                  {car.series}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {car.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-primary glow-effect'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <p className="text-primary font-medium mb-2">{car.fuelType}</p>
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">{car.model}</h1>
                <p className="text-muted-foreground leading-relaxed">{car.description}</p>
              </div>

              {/* Price */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Starting Price</p>
                    <p className="text-2xl lg:text-3xl font-bold text-gradient-blue">
                      {formatPrice(car.startingPrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">On-Road Price</p>
                    <p className="text-xl font-semibold">{formatPrice(car.onRoadPrice)}</p>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate(`/checkout/${car.id}`)}
                  className="w-full h-14 bmw-gradient text-lg font-semibold rounded-xl glow-effect"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-semibold mb-3">Available Colors</h3>
                <div className="flex gap-3 flex-wrap">
                  {car.colors.map((color, index) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(index)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedColor === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-12 lg:py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl lg:text-3xl font-bold mb-8 text-center"
            >
              Specifications
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {specs.map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-5 rounded-2xl text-center"
                >
                  <spec.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">{spec.label}</p>
                  <p className="font-semibold">{spec.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Additional Specs */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Cog className="w-5 h-5 mr-2 text-primary" />
                  Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Torque</span>
                    <span className="font-medium">{car.torque}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">0-100 km/h</span>
                    <span className="font-medium">{car.acceleration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Boot Space</span>
                    <span className="font-medium">{car.bootSpace}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Safety Features
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {car.safetyFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl lg:text-3xl font-bold mb-8 text-center"
            >
              Premium Features
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-3">
              {car.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-5 py-3 glass-card rounded-full flex items-center space-x-2"
                >
                  <Check className="w-4 h-4 text-primary" />
                  <span className="font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetail;
