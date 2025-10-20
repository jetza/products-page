/**
 * Content Constants
 * Centralized location for all text content in the application
 */

export const CONTENT = {
  // Brand
  brand: {
    name: "SofaSocietyCo.",
    shortName: "Sofa Society",
    email: "info@sofasociety.com",
    copyright: "© 2024, Sofa Society",
  },

  // Email Templates
  emails: {
    verifyEmail: {
      title: "Verify your email",
      greeting: (name: string) =>
        `Hey ${name}, thanks for registering for an account on Sofa Society!`,
      message1:
        "Before we get started, we just need to confirm that this is you.",
      message2: "Click below to verify your email address:",
      button: "Verify email",
    },

    orderConfirmation: {
      title: "Order confirmation",
      message1: (orderNumber: string) =>
        `We are pleased to confirm that your order has been successfully placed and will be processed shortly. Your order number is #${orderNumber}.`,
      message2:
        "You'll receive another update once your order is shipped. For any questions, feel free to contact us at info@sofasociety.com.",
      thankYou: "Thank you for shopping with us!",
      deliveryAddress: "Delivery address",
      billingAddress: "Billing address",
      payment: "Payment",
      subtotal: "Subtotal",
      shipping: "Shipping",
      total: "Total",
      tax: (amount: string) => `Including ${amount} tax`,
    },

    resetPassword: {
      title: "Reset your password",
      message:
        "We received a request to reset your Sofa Society account password. Click below to set a new password:",
      button: "Reset password",
      disclaimer:
        "If you didn't request this change, please ignore this email, and your current password will remain unchanged.",
    },

    shippingUpdate: {
      title: "Shipping update",
      message1: (orderNumber: string) =>
        `Great news! Your order #${orderNumber} is now on its way to you. Here are the shipping details.`,
      message2: "You can track your package by clicking below:",
      button: "Order details",
      thankYou:
        "Thank you for choosing Sofa Society. We're excited for your new sofa to find its home with you!",
    },

    welcome: {
      title: "Welcome to Sofa Society!",
      greeting:
        "Welcome to Sofa Society! We're excited to have you join our community of comfort enthusiasts. With our carefully crafted sofas, you're just steps away from adding elegance and coziness to your living space.",
      subheading: "As a new member, here's what you can expect:",
      benefits: [
        "Premium, high-quality sofas in a range of styles and materials",
        "Dedicated customer support ready to assist you",
        "Exclusive offers and early access to new collections",
        "Explore our collections and find the sofa that suits your style!",
      ],
      signature: "Best wishes,",
      team: "The Sofa Society Team",
    },
  },

  // Common UI Elements
  common: {
    search: "Search for products...",
    searchPlaceholder: "Search",
    loading: "Loading...",
    noResults: "No products available.",
    noProductsMatch: "No products match your filters.",
    noProductsFound: "No products found",
    noVariant: "No variant",
    filter: "Filter",
    sortBy: "Sort by",
    showResults: "Show results",
    addToCart: "Add to cart",
    viewCart: "View cart",
    viewAll: "View All",
    checkout: "Checkout",
    continueShopping: "Continue shopping",
    remove: "Remove",
    quantity: "Quantity",
  },

  // Navigation
  nav: {
    about: "About",
    inspiration: "Inspiration",
    shop: "Shop",
    cart: "Cart",
    account: "My Account",
  },

  // Footer
  footer: {
    social: {
      instagram: "Instagram",
      tiktok: "TikTok",
      pinterest: "Pinterest",
      facebook: "Facebook",
    },
    newsletter: {
      title: "Join our newsletter",
      coupons:
        "Get exclusive offers, discounts, and inspiration straight to your inbox.",
      agree: "By subscribing, you agree to our",
      privacy: "Privacy Policy",
      consent: "and consent to receive marketing emails.",
    },
  },

  // Sort Options (labels)
  sort: {
    featured: "Featured",
    bestSelling: "Best selling",
    lowestPrice: "Lowest price",
    highestPrice: "Highest price",
  },

  // Filter Options (labels)
  filters: {
    collection: "Collection",
    collections: "Collections",
    browseCollections: "Collections",
    category: "Category",
    type: "Type",
    material: "Material",
    materials: "Materials",
    color: "Color",
    colors: "Colors",
    price: "Price",
    priceRange: (min: number, max: number) => `€${min} - €${max}`,
  },

  // Product
  product: {
    material: "Material",
    color: "Color",
    quantity: "Quantity",
    selectOptions: "Please select all options before adding to cart",
    outOfStock: "Out of stock",
    inStock: "In stock",
    relatedProducts: "You may also like",
    collectionInspiredInterior: "Collection Inspired Interior",
  },

  // Order
  order: {
    // Order Confirmation Page
    confirmation: {
      title: "Thank you for your order!",
      message:
        "We are pleased to confirm that your order has been successfully placed and will be processed shortly.",
      receiptSent:
        "We have sent you the receipt and order details to your email address",
      orderNumberLabel: "Your order number is",
      backToHome: "Back to home page",
      deliveryAddress: "Delivery address",
      billingAddress: "Billing address",
      payment: "Payment",
      material: "Material:",
      color: "Color:",
      quantity: "Quantity:",
    },
    // Order Summary
    summary: {
      subtotal: "Subtotal:",
      shipping: "Shipping:",
      taxes: "Taxes:",
      discount: "Discount",
      total: "Total:",
      includingVAT: "Including VAT",
    },
  },

  // Cart
  cart: {
    title: "Your Shopping Cart",
    cart: "Cart",
    shoppingBag: "Your shopping bag",
    empty: "Your cart is empty",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax",
    total: "Total",
    estimatedTotal: "Estimated total",
    viewCart: "View cart",
    proceedToCheckout: "Proceed to checkout",
    itemsInCart: (count: number) =>
      `${count} item${count !== 1 ? "s" : ""} in cart`,
  },

  // Checkout
  checkout: {
    title: "Checkout",
    deliveryInfo: "Delivery Information",
    delivery: "Delivery",
    deliveryAddress: "Delivery Address",
    paymentInfo: "Payment Information",
    orderSummary: "Order Summary",
    placeOrder: "Place Order",
    continueToShipping: "Continue to shipping",
    selectShipping: "Select shipping option",
    enterPayment: "Enter payment details",
    orderItems: (count: number) =>
      `Order - ${count} item${count !== 1 ? "s" : ""}`,
    // Form labels
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    apartment: "Apartment, suite, etc.",
    company: "Company (optional)",
    city: "City",
    postalCode: "Postal Code",
    country: "Country",
    // Placeholders
    placeholders: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      address: "Street address",
      apartment: "Apartment, suite, etc. (optional)",
      company: "Company name",
      city: "City",
      postalCode: "Postal code",
    },
    // Validation errors
    validation: {
      firstNameRequired: "First name is required",
      lastNameRequired: "Last name is required",
      emailRequired: "Email is required",
      phoneRequired: "Phone is required",
      addressRequired: "Address is required",
      cityRequired: "City is required",
      postalCodeRequired: "Postal code is required",
      countryRequired: "Country is required",
    },
    // Error modal
    errorModal: {
      title: "Order Failed",
      message: "Failed to complete order. Please try again.",
      button: "OK",
    },
  },

  // Collections
  collections: {
    scandinavianSimplicity: {
      title: "Scandinavian Simplicity:",
      subtitle: "Effortless elegance, timeless comfort",
      description1:
        "Minimalistic designs, neutral colors, and high-quality textures. Perfect for those who seek comfort with a clean and understated aesthetic.",
      description2:
        "This collection brings the essence of Scandinavian elegance to your living room.",
    },
  },

  // Privacy Policy
  privacyPolicy: {
    title: "Privacy Policy for Sofa Society",
    intro:
      "At Sofa Society, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you interact with our website, services, and products. By using our platform, you consent to the practices described in this policy.",
    sections: {
      informationWeCollect: {
        title: "1. Information We Collect:",
        description:
          "We may collect personal information you provide directly to us, such as:",
        items: [
          "Name, email address, and contact details when you sign up for an account.",
          "Billing and shipping addresses when you make a purchase.",
          "Payment information (processed securely through third-party payment processors).",
          "Personal preferences and fashion interests you share with us.",
        ],
        additionalInfo:
          "Additionally, we may automatically collect certain information when you access or use our website, including:",
        additionalItems: [
          "IP address, browser type, operating system, and device information.",
          "Usage data, such as pages visited, time spent on our platform, and referring website.",
        ],
      },
      howWeUse: {
        title: "2. How We Use Your Information:",
        description:
          "We may use your personal information for various purposes, including but not limited to:",
        items: [
          "Processing and managing your account, purchases, and orders.",
          "Customizing your shopping experience and suggesting relevant products.",
          "Sending transactional emails, order updates, and customer support (you can opt-out anytime).",
          "Analyzing user behavior to improve our website and services.",
          "Complying with legal obligations and enforcing our Terms of Service.",
        ],
      },
      cookies: {
        title: "3. Cookies and Similar Technologies:",
        description:
          "We use cookies and similar technologies to collect information about your browsing activity on our devices. These technologies help us analyze usage patterns, personalize content, remember your preferences, and measure performance through your browser settings.",
      },
      dataSharing: {
        title: "4. Data Sharing and Disclosure:",
        description:
          "We may share your personal information with third parties under certain circumstances, including:",
        items: [
          "Service providers who assist us in operating our business and delivering services.",
          "Legal authorities or government agencies as required by law.",
        ],
        note: "We do not sell or rent your personal information to third parties for their marketing purposes.",
      },
      dataSecurity: {
        title: "5. Data Security:",
        description:
          "We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.",
      },
      yourChoices: {
        title: "6. Your Choices:",
        description: "You have the right to:",
        items: [
          "Review and update your personal information in your account settings.",
          "Opt out of receiving marketing communications.",
          "Delete your account (subject to applicable laws and regulations).",
        ],
      },
      childrensPrivacy: {
        title: "7. Children's Privacy:",
        description:
          "Our services are not intended for individuals under the age of 18. If we become aware that we have collected personal information from children without parental consent, we will take prompt action to delete such data.",
      },
      changes: {
        title: "8. Changes to this Privacy Policy:",
        description:
          "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes via email or by prominently posting a notice on our website.",
      },
      contactUs: {
        title: "9. Contact Us:",
        description:
          "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us at:",
        email: "Email: privacy@sofasociety.com",
        address: "Address: Storgothögen 12, 134 65 Stockholm",
      },
    },
  },

  // Authentication
  auth: {
    // Register
    register: {
      title: "Hey, welcome to",
      titleBrand: "Sofa Society!",
      button: "Register",
      haveAccount: "Already have an account? No worries, just",
      loginLink: "log in",
      placeholders: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
      },
    },
    // Login
    login: {
      title: "Welcome back",
      button: "Log in",
      noAccount: "Don't have an account?",
      registerLink: "Sign up",
    },
  },

  // Account
  account: {
    title: "My Account",
    // Navigation tabs
    personalSecurity: "Personal & security",
    myOrders: "My orders",
    // Personal Info section
    personalInfo: "Personal information",
    contact: "Contact",
    address: "Address",
    name: "Name",
    number: "Number",
    email: "Email",
    password: "Password",
    changePassword: "Change password",
    // Actions
    change: "Change",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    logout: "Logout",
    addAddress: "Add address",
    resetPassword: "Reset password",
    // Messages
    emailChangeNote:
      "If you want to change your email please contact us via customer support.",
    passwordResetNote:
      "To change your password, we'll send you an email. Just click on the reset button below.",
    // Orders
    orderLabel: "Order:",
    orderNumber: "Order #",
    orderDate: "Order Date",
    orderStatus: "Status",
    orderTotal: "Total",
  },

  // Error Messages
  errors: {
    generic: "Something went wrong. Please try again.",
    notFound: {
      title: "Page not found",
      description:
        "The page you are looking for doesn't exist or an error occurred. Go back, or head over to our home page.",
      button: "Back to home",
    },
    productNotFound: "Product not found",
    requiredField: "This field is required",
    invalidEmail: "Please enter a valid email address",
  },

  // Success Messages
  success: {
    addedToCart: "Added to cart successfully!",
    orderPlaced: "Your order has been placed successfully!",
    emailVerified: "Email verified successfully!",
    passwordReset: "Password reset successfully!",
  },
} as const;

// Type for accessing nested content with autocomplete
export type ContentKeys = typeof CONTENT;
