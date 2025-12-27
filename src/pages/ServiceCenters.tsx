import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Star, Navigation } from 'lucide-react';
import { serviceCenters } from '@/data/serviceCenters';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ServiceCenters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);

  const filteredCenters = serviceCenters.filter(center =>
    center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Service Centers</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find a BMW authorized service center near you. Our certified technicians ensure your vehicle receives the best care.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto mb-12"
          >
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by city, state, or center name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-muted/50 border-border/50 rounded-xl"
              />
            </div>
          </motion.div>

          {/* Centers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((center, index) => (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card overflow-hidden hover-lift group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-bmw-gold fill-bmw-gold" />
                    <span className="text-sm font-medium">{center.rating}</span>
                  </div>

                  {/* City Badge */}
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-lg font-semibold">{center.name}</h3>
                    <p className="text-sm text-muted-foreground">{center.city}, {center.state}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        {center.address}, {center.pincode}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <p className="text-sm">{center.phone}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <p className="text-sm">{center.email}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <p className="text-sm">{center.workingHours} ({center.workingDays})</p>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2">
                    {center.services.slice(0, 4).map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 text-xs bg-muted rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                    {center.services.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                        +{center.services.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl"
                      onClick={() => setSelectedCenter(selectedCenter === center.id ? null : center.id)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      View Map
                    </Button>
                    <Button
                      className="flex-1 bmw-gradient rounded-xl"
                      onClick={() => window.open(`https://www.google.com/maps?q=${center.coordinates.lat},${center.coordinates.lng}`, '_blank')}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Directions
                    </Button>
                  </div>

                  {/* Expanded Map View */}
                  {selectedCenter === center.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <div className="h-48 rounded-xl overflow-hidden border border-border/50">
                        <iframe
                          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${center.coordinates.lng}!3d${center.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sin!4v1234567890`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Map of ${center.name}`}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <MapPin className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No service centers found</h3>
              <p className="text-muted-foreground mb-6">Try searching for a different location</p>
              <Button onClick={() => setSearchQuery('')} className="bmw-gradient">
                Clear Search
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceCenters;
