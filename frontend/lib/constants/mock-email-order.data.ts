const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "https://sofa-society-backend-dpbce8hhgkh8evfa.canadacentral-01.azurewebsites.net";

export const MOCK_ORDER = {
  orderNumber: "100002",
  items: [
    {
      id: 1,
      name: "Paloma Haven",
      material: "Linen",
      color: "Gray",
      quantity: 1,
      price: 30,
      image: `${BACKEND_URL}/products/paloma-haven.jpg`,
    },
    {
      id: 2,
      name: "Nordic Haven",
      material: "Linen",
      color: "Gray",
      quantity: 1,
      price: 30,
      image: `${BACKEND_URL}/products/nordic-haven.jpg`,
    },
    {
      id: 3,
      name: "Everly Estate",
      material: "Velvet",
      color: "Red",
      quantity: 1,
      price: 30,
      image: `${BACKEND_URL}/products/everly-estate.jpg`,
    },
    {
      id: 4,
      name: "Astrid Curve",
      material: "Boucle",
      color: "Gray",
      quantity: 1,
      price: 30,
      image: `${BACKEND_URL}/products/astrid-curve.png`,
    },
  ],
  deliveryAddress: {
    name: "Jovana Jerinic",
    street: "Duvanjska 3, 10000 Zagreb, Croatia",
    phone: "+385 226 2266",
  },
  billingAddress: {
    name: "Jovana Jerinic",
    street: "Duvanjska 3, 10000 Zagreb, Croatia",
    phone: "+385 226 2266",
  },
  subtotal: 120,
  shipping: 15,
  tax: 11.25,
  total: 135,
};
