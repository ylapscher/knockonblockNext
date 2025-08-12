export const primaryServices = [
  {
    id: 1,
    title: "Reverse Osmosis Water Filter Installation",
    description: "Professional installation of RO water filtration systems for clean, pure drinking water.",
    icon: "🚰"
  },
  {
    id: 2,
    title: "Smart Device Installation",
    description: "Installation and setup of smart thermostats, doorbells, security cameras, and other connected devices.",
    icon: "📱"
  },
  {
    id: 3,
    title: "Drywall Repair",
    description: "Expert patching, texturing, and finishing of holes, cracks, and damaged drywall.",
    icon: "🔧"
  }
];

export const secondaryServices = [
  {
    id: 4,
    title: "TV Mounting",
    description: "Safe and secure wall mounting of TVs with proper cable management and placement.",
    icon: "📺"
  },
  {
    id: 5,
    title: "Minor Electrical Repairs",
    description: "Installation of outlets, switches, light fixtures, and other basic electrical work.",
    icon: "⚡"
  },
  {
    id: 6,
    title: "Minor Plumbing Repairs",
    description: "Fixing leaks, installing faucets, toilet repairs, and other plumbing maintenance.",
    icon: "🔧"
  }
];

export const additionalServices = [
  {
    id: 7,
    title: "Furniture Assembly",
    description: "Professional assembly of furniture, shelving units, and home organization systems.",
    icon: "🪑"
  },
  {
    id: 8,
    title: "Painting",
    description: "Interior and exterior painting services for rooms, trim, and touch-up work.",
    icon: "🎨"
  },
  {
    id: 9,
    title: "Light Fixture Installation",
    description: "Installation of ceiling fans, chandeliers, pendant lights, and other lighting fixtures.",
    icon: "💡"
  }
];

// Keep the original services export for backward compatibility
export const services = [...primaryServices, ...secondaryServices, ...additionalServices];