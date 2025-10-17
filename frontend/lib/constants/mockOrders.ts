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
      { id: "1", image: "/products/sofa1.png", title: "Sofa 1" },
      { id: "2", image: "/products/sofa2.png", title: "Sofa 2" },
      { id: "3", image: "/products/sofa3.png", title: "Sofa 3" },
      { id: "4", image: "/products/sofa4.png", title: "Sofa 4" },
    ],
  },
  {
    id: "2",
    orderNumber: "00000000022",
    date: "23 December 2024",
    status: "Delivering",
    items: [
      { id: "1", image: "/products/sofa5.png", title: "Sofa 5" },
      { id: "2", image: "/products/sofa6.png", title: "Sofa 6" },
      { id: "3", image: "/products/sofa7.png", title: "Sofa 7" },
    ],
  },
  {
    id: "3",
    orderNumber: "00000000013",
    date: "23 December 2024",
    status: "Delivered",
    items: [
      { id: "1", image: "/products/sofa1.png", title: "Sofa 1" },
      { id: "2", image: "/products/sofa2.png", title: "Sofa 2" },
      { id: "3", image: "/products/sofa8.png", title: "Sofa 8" },
      { id: "4", image: "/products/sofa9.png", title: "Sofa 9" },
    ],
  },
  {
    id: "4",
    orderNumber: "00000000021",
    date: "23 December 2024",
    status: "Packing",
    items: [
      { id: "1", image: "/products/sofa3.png", title: "Sofa 3" },
      { id: "2", image: "/products/sofa4.png", title: "Sofa 4" },
      { id: "3", image: "/products/sofa5.png", title: "Sofa 5" },
      { id: "4", image: "/products/sofa6.png", title: "Sofa 6" },
    ],
  },
];
