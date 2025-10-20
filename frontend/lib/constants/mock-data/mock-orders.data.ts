export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "Packing" | "Delivering" | "Delivered";
  items: {
    id: string;
    image: string;
    title: string;
  }[];
}

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "00000000004",
    date: "23 December 2024",
    status: "Packing",
    items: [
      { id: "1", image: "/products/nordic-haven.jpg", title: "Nordic Haven" },
      { id: "2", image: "/products/everly-estate.jpg", title: "Everly Estate" },
      {
        id: "3",
        image: "/products/camden-retreat.jpg",
        title: "Camden Retreat",
      },
      { id: "4", image: "/products/sutton-royale.jpg", title: "Sutton Royale" },
    ],
  },
  {
    id: "2",
    orderNumber: "00000000022",
    date: "23 December 2024",
    status: "Delivering",
    items: [
      { id: "1", image: "/products/astrid-curve.png", title: "Astrid Curve" },
      { id: "2", image: "/products/paloma-haven.jpg", title: "Paloma Haven" },
      {
        id: "3",
        image: "/products/belime-haven-arm-chair.png",
        title: "Belime Haven Armchair",
      },
    ],
  },
  {
    id: "3",
    orderNumber: "00000000013",
    date: "23 December 2024",
    status: "Delivered",
    items: [
      { id: "1", image: "/products/nordic-haven.jpg", title: "Nordic Haven" },
      { id: "2", image: "/products/everly-estate.jpg", title: "Everly Estate" },
      { id: "3", image: "/products/sutton-royale.jpg", title: "Sutton Royale" },
      {
        id: "4",
        image: "/products/astrid-curve-gray.jpg",
        title: "Astrid Curve Gray",
      },
    ],
  },
  {
    id: "4",
    orderNumber: "00000000021",
    date: "23 December 2024",
    status: "Packing",
    items: [
      {
        id: "1",
        image: "/products/camden-retreat.jpg",
        title: "Camden Retreat",
      },
      { id: "2", image: "/products/everly-estate.jpg", title: "Everly Estate" },
      {
        id: "3",
        image: "/products/paloma-haven-arm-chair.jpg",
        title: "Paloma Haven Armchair",
      },
      { id: "4", image: "/products/astrid-curve.png", title: "Astrid Curve" },
      { id: "5", image: "/products/nordic-haven.jpg", title: "Nordic Haven" },
      { id: "6", image: "/products/sutton-royale.jpg", title: "Sutton Royale" },
    ],
  },
];
