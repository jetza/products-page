"use client";

import React, { createContext, useReducer, ReactNode } from "react";

// Types
export interface DeliveryInfo {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}

export interface BillingInfo {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  sameAsDelivery: boolean;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export interface PaymentInfo {
  method: "card" | "paypal" | "bank_transfer";
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
}

export interface OrderItem {
  id: string;
  title: string;
  variant?: string;
  size?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CompletedOrder {
  orderNumber: string;
  date: string;
  email: string;
  deliveryInfo: DeliveryInfo;
  billingInfo: BillingInfo;
  shippingMethod: ShippingMethod;
  paymentInfo?: PaymentInfo;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
  discountCode?: string;
  discountAmount?: number;
}

export interface CheckoutState {
  // Step 1: Email
  email: string;
  subscribeNewsletter: boolean;

  // Step 2: Delivery
  deliveryInfo: DeliveryInfo | null;

  // Step 3: Shipping
  shippingMethod: ShippingMethod | null;

  // Step 4: Payment
  paymentInfo: PaymentInfo | null;
  billingInfo: BillingInfo | null;

  // Discount
  discountCode: string;
  discountAmount: number;

  // Order status
  isProcessing: boolean;
  orderCompleted: boolean;
  completedOrder: CompletedOrder | null;
  error: string | null;
}

// Initial State
const initialState: CheckoutState = {
  email: "jovana.jerimic@gmail.com",
  subscribeNewsletter: false,
  deliveryInfo: {
    firstName: "Jovana",
    lastName: "Jerimic",
    company: "",
    address: "123 Main Street",
    apartment: "Apt 4B",
    city: "Zagreb",
    country: "Croatia",
    postalCode: "10000",
    phone: "+385 99 143 321",
  },
  shippingMethod: null,
  paymentInfo: null,
  billingInfo: null,
  discountCode: "",
  discountAmount: 0,
  isProcessing: false,
  orderCompleted: false,
  completedOrder: null,
  error: null,
};

// Action Types
type CheckoutAction =
  | { type: "SET_EMAIL"; payload: { email: string; subscribe: boolean } }
  | { type: "SET_DELIVERY_INFO"; payload: DeliveryInfo }
  | { type: "SET_SHIPPING_METHOD"; payload: ShippingMethod }
  | { type: "SET_PAYMENT_INFO"; payload: PaymentInfo }
  | { type: "SET_BILLING_INFO"; payload: BillingInfo }
  | { type: "SET_DISCOUNT"; payload: { code: string; amount: number } }
  | { type: "REMOVE_DISCOUNT" }
  | { type: "START_PROCESSING" }
  | { type: "ORDER_SUCCESS"; payload: CompletedOrder }
  | { type: "ORDER_ERROR"; payload: string }
  | { type: "RESET_CHECKOUT" };

// Reducer
function checkoutReducer(
  state: CheckoutState,
  action: CheckoutAction,
): CheckoutState {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload.email,
        subscribeNewsletter: action.payload.subscribe,
      };

    case "SET_DELIVERY_INFO":
      return {
        ...state,
        deliveryInfo: action.payload,
      };

    case "SET_SHIPPING_METHOD":
      return {
        ...state,
        shippingMethod: action.payload,
      };

    case "SET_PAYMENT_INFO":
      return {
        ...state,
        paymentInfo: action.payload,
      };

    case "SET_BILLING_INFO":
      return {
        ...state,
        billingInfo: action.payload,
      };

    case "SET_DISCOUNT":
      return {
        ...state,
        discountCode: action.payload.code,
        discountAmount: action.payload.amount,
      };

    case "REMOVE_DISCOUNT":
      return {
        ...state,
        discountCode: "",
        discountAmount: 0,
      };

    case "START_PROCESSING":
      return {
        ...state,
        isProcessing: true,
        error: null,
      };

    case "ORDER_SUCCESS":
      return {
        ...state,
        isProcessing: false,
        orderCompleted: true,
        completedOrder: action.payload,
        error: null,
      };

    case "ORDER_ERROR":
      return {
        ...state,
        isProcessing: false,
        error: action.payload,
      };

    case "RESET_CHECKOUT":
      return initialState;

    default:
      return state;
  }
}

// Context
interface CheckoutContextValue {
  state: CheckoutState;
  setEmail: (email: string, subscribe: boolean) => void;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  setBillingInfo: (info: BillingInfo) => void;
  setDiscount: (code: string, amount: number) => void;
  removeDiscount: () => void;
  completeOrder: (
    items: OrderItem[],
    subtotal: number,
    shipping: number,
    taxes: number,
  ) => Promise<void>;
  resetCheckout: () => void;
}

export const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined,
);

// Provider
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const setEmail = React.useCallback((email: string, subscribe: boolean) => {
    dispatch({ type: "SET_EMAIL", payload: { email, subscribe } });
  }, []);

  const setDeliveryInfo = React.useCallback((info: DeliveryInfo) => {
    dispatch({ type: "SET_DELIVERY_INFO", payload: info });
  }, []);

  const setShippingMethod = React.useCallback((method: ShippingMethod) => {
    dispatch({ type: "SET_SHIPPING_METHOD", payload: method });
  }, []);

  const setPaymentInfo = React.useCallback((info: PaymentInfo) => {
    dispatch({ type: "SET_PAYMENT_INFO", payload: info });
  }, []);

  const setBillingInfo = React.useCallback((info: BillingInfo) => {
    dispatch({ type: "SET_BILLING_INFO", payload: info });
  }, []);

  const setDiscount = React.useCallback((code: string, amount: number) => {
    dispatch({ type: "SET_DISCOUNT", payload: { code, amount } });
  }, []);

  const removeDiscount = React.useCallback(() => {
    dispatch({ type: "REMOVE_DISCOUNT" });
  }, []);

  const completeOrder = React.useCallback(
    async (
      items: OrderItem[],
      subtotal: number,
      shipping: number,
      taxes: number
    ) => {
      try {
        dispatch({ type: "START_PROCESSING" });

        await new Promise((resolve) => setTimeout(resolve, 1500));

        const orderNumber = `#${Math.floor(100000 + Math.random() * 900000)}`;

        const completedOrder: CompletedOrder = {
          orderNumber,
          date: new Date().toISOString(),
          email: state.email,
          deliveryInfo: state.deliveryInfo!,
          billingInfo: state.billingInfo || {
            ...state.deliveryInfo!,
            sameAsDelivery: true,
          },
          shippingMethod: state.shippingMethod!,
          paymentInfo: state.paymentInfo || undefined,
          items,
          subtotal,
          shipping,
          taxes,
          total: subtotal + shipping + taxes - state.discountAmount,
          discountCode: state.discountCode || undefined,
          discountAmount: state.discountAmount || undefined,
        };

        dispatch({ type: "ORDER_SUCCESS", payload: completedOrder });
      } catch (error) {
        dispatch({
          type: "ORDER_ERROR",
          payload:
            error instanceof Error ? error.message : "Failed to complete order",
        });
      }
    },
    [state]
  );

  const resetCheckout = React.useCallback(() => {
    dispatch({ type: "RESET_CHECKOUT" });
  }, []);

  const value = React.useMemo(
    () => ({
      state,
      setEmail,
      setDeliveryInfo,
      setShippingMethod,
      setPaymentInfo,
      setBillingInfo,
      setDiscount,
      removeDiscount,
      completeOrder,
      resetCheckout,
    }),
    [
      state,
      setEmail,
      setDeliveryInfo,
      setShippingMethod,
      setPaymentInfo,
      setBillingInfo,
      setDiscount,
      removeDiscount,
      completeOrder,
      resetCheckout,
    ]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}
