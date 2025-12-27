import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Fuel, ChevronRight } from 'lucide-react';
import { Car, formatPrice } from '@/data/cars';
import { Button } from '@/components/ui/button';

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard = ({ car, index }: CarCardProps) => {
  const getFuelIcon = (fuelType: string) => {
    switch (fuelType) {
      case 'Electric':
        return '⚡';
      case 'Hybrid':
        return '🔋';
      case 'Diesel':
        return '⛽';
      default:
        return '⛽';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group glass-card overflow-hidden hover-lift shine-effect"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={car.model}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Fuel Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-xs font-medium flex items-center space-x-1">
          <span>{getFuelIcon(car.fuelType)}</span>
          <span>{car.fuelType}</span>
        </div>

        {/* Series Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bmw-gradient text-xs font-medium text-primary-foreground">
          {car.series}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {car.model}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {car.engine} • {car.power}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Starting at</p>
            <p className="text-xl font-bold text-gradient-blue">{formatPrice(car.startingPrice)}</p>
          </div>
          
          <Link to={`/car/${car.id}`}>
            <Button 
              size="sm" 
              className="group/btn bmw-gradient"
            >
              View Details
              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
