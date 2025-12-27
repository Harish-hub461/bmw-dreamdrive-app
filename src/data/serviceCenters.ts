export interface ServiceCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  workingHours: string;
  workingDays: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  services: string[];
  rating: number;
  image: string;
}

export const serviceCenters: ServiceCenter[] = [
  {
    id: "1",
    name: "BMW Delhi Central",
    address: "A-12, Mathura Road, Okhla Industrial Area",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110020",
    phone: "+91 11 4567 8901",
    email: "delhi.central@bmw.in",
    workingHours: "9:00 AM - 7:00 PM",
    workingDays: "Monday - Saturday",
    coordinates: { lat: 28.5355, lng: 77.2410 },
    services: ["General Service", "Full Service", "Oil Change", "Body Repair", "Paint Work", "Wheel Alignment"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1562418052-cc78c5a5e8b1?w=800&q=80"
  },
  {
    id: "2",
    name: "BMW Mumbai Premium",
    address: "Plot 15, Andheri Kurla Road, Sakinaka",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400072",
    phone: "+91 22 4567 8902",
    email: "mumbai.premium@bmw.in",
    workingHours: "8:30 AM - 8:00 PM",
    workingDays: "Monday - Saturday",
    coordinates: { lat: 19.1076, lng: 72.8843 },
    services: ["General Service", "Full Service", "Oil Change", "Body Repair", "Detailing", "Insurance Claims"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    id: "3",
    name: "BMW Bangalore Excellence",
    address: "No. 78, Hosur Road, Electronics City",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560100",
    phone: "+91 80 4567 8903",
    email: "bangalore.excellence@bmw.in",
    workingHours: "9:00 AM - 7:30 PM",
    workingDays: "Monday - Saturday",
    coordinates: { lat: 12.8452, lng: 77.6602 },
    services: ["General Service", "Full Service", "Oil Change", "AC Service", "Battery Replacement", "Software Updates"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1552960394-c81add8de6b8?w=800&q=80"
  },
  {
    id: "4",
    name: "BMW Chennai Prime",
    address: "45, Anna Salai, Teynampet",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600018",
    phone: "+91 44 4567 8904",
    email: "chennai.prime@bmw.in",
    workingHours: "9:00 AM - 7:00 PM",
    workingDays: "Monday - Saturday",
    coordinates: { lat: 13.0398, lng: 80.2508 },
    services: ["General Service", "Full Service", "Oil Change", "Tire Service", "Brake Inspection", "Engine Diagnostics"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80"
  },
  {
    id: "5",
    name: "BMW Hyderabad Elite",
    address: "Plot 23, Jubilee Hills, Road No. 36",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
    phone: "+91 40 4567 8905",
    email: "hyderabad.elite@bmw.in",
    workingHours: "9:30 AM - 7:30 PM",
    workingDays: "Monday - Saturday",
    coordinates: { lat: 17.4239, lng: 78.4138 },
    services: ["General Service", "Full Service", "Oil Change", "Interior Detailing", "Paint Protection", "Ceramic Coating"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1552960394-c81add8de6b8?w=800&q=80"
  },
  {
    id: "6",
    name: "BMW Pune Performance",
    address: "Survey No. 67, Bund Garden Road",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    phone: "+91 20 4567 8906",
    email: "pune.performance@bmw.in",
    workingHours: "9:00 AM - 7:00 PM",
    workingDays: "Monday - Saturday",
    coordinates: { lat: 18.5308, lng: 73.8474 },
    services: ["General Service", "Full Service", "Oil Change", "M Sport Tuning", "Performance Parts", "Track Preparation"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1562418052-cc78c5a5e8b1?w=800&q=80"
  },
  {
    id: "7",
    name: "BMW Kolkata Classic",
    address: "12, Park Street, Near Park Circus",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700016",
    phone: "+91 33 4567 8907",
    email: "kolkata.classic@bmw.in",
    workingHours: "10:00 AM - 7:00 PM",
    workingDays: "Monday - Saturday",
    coordinates: { lat: 22.5530, lng: 88.3517 },
    services: ["General Service", "Full Service", "Oil Change", "Vintage Car Care", "Leather Treatment", "Rust Protection"],
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    id: "8",
    name: "BMW Ahmedabad Prestige",
    address: "C.G. Road, Near Navrangpura",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380009",
    phone: "+91 79 4567 8908",
    email: "ahmedabad.prestige@bmw.in",
    workingHours: "9:00 AM - 7:00 PM",
    workingDays: "Monday - Saturday",
    coordinates: { lat: 23.0258, lng: 72.5558 },
    services: ["General Service", "Full Service", "Oil Change", "Sunroof Service", "Windshield Replacement", "Light Restoration"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80"
  }
];
