import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Fuel, Zap, Car as CarIcon, ChevronDown } from 'lucide-react';
import { cars } from '@/data/cars';
import CarCard from '@/components/CarCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState<string | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'name'>('name');

  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const series = [...new Set(cars.map(car => car.series))];

  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Filter by search
    if (searchQuery) {
      result = result.filter(car =>
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.series.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by fuel type
    if (selectedFuelType) {
      result = result.filter(car => car.fuelType === selectedFuelType);
    }

    // Filter by series
    if (selectedSeries) {
      result = result.filter(car => car.series === selectedSeries);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case 'price-high':
        result.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case 'name':
        result.sort((a, b) => a.model.localeCompare(b.model));
        break;
    }

    return result;
  }, [searchQuery, selectedFuelType, selectedSeries, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedFuelType(null);
    setSelectedSeries(null);
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              Experience the
              <br />
              <span className="text-gradient-blue">Ultimate Driving Machine</span>
            </h1>
            <p className="text-muted-foreground text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
              Discover our complete range of luxury vehicles. From elegant sedans to powerful SUVs, find the perfect BMW that matches your style.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary">{cars.length}+</p>
                <p className="text-muted-foreground text-sm">Models Available</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary">8</p>
                <p className="text-muted-foreground text-sm">Service Centers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary">24/7</p>
                <p className="text-muted-foreground text-sm">Customer Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-16 lg:top-20 z-40 glass-card border-y border-border/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-muted/50 border-border/50 rounded-xl"
              />
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Fuel Type Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-12 px-4 rounded-xl border-border/50">
                    <Fuel className="w-4 h-4 mr-2" />
                    {selectedFuelType || 'Fuel Type'}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-card border-border/50">
                  <DropdownMenuItem onClick={() => setSelectedFuelType(null)}>
                    All Fuel Types
                  </DropdownMenuItem>
                  {fuelTypes.map(type => (
                    <DropdownMenuItem key={type} onClick={() => setSelectedFuelType(type)}>
                      {type === 'Electric' && <Zap className="w-4 h-4 mr-2" />}
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Series Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-12 px-4 rounded-xl border-border/50">
                    <CarIcon className="w-4 h-4 mr-2" />
                    {selectedSeries || 'Series'}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-card border-border/50 max-h-60 overflow-y-auto">
                  <DropdownMenuItem onClick={() => setSelectedSeries(null)}>
                    All Series
                  </DropdownMenuItem>
                  {series.map(s => (
                    <DropdownMenuItem key={s} onClick={() => setSelectedSeries(s)}>
                      {s}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-12 px-4 rounded-xl border-border/50">
                    <Filter className="w-4 h-4 mr-2" />
                    Sort By
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-card border-border/50">
                  <DropdownMenuItem onClick={() => setSortBy('name')}>Name (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('price-low')}>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('price-high')}>Price: High to Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Clear Filters */}
              {(selectedFuelType || selectedSeries || searchQuery) && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="h-12 px-4 text-destructive hover:text-destructive"
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Results Count */}
            <div className="hidden lg:block ml-auto">
              <p className="text-muted-foreground">
                Showing <span className="text-foreground font-semibold">{filteredCars.length}</span> models
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <CarIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No cars found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters} className="bmw-gradient">
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
