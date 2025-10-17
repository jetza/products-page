"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Buttons/Button";
import { DeliveryInfo } from "@/lib/checkout-context";
import { countries } from "@/lib/constants/countries";

interface DeliveryFormProps {
  onSubmit: (data: DeliveryInfo) => void;
  initialData?: DeliveryInfo | null;
}

export const DeliveryForm: React.FC<DeliveryFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<DeliveryInfo>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    company: initialData?.company || "",
    address: initialData?.address || "",
    apartment: initialData?.apartment || "",
    city: initialData?.city || "",
    country: initialData?.country || "Croatia",
    postalCode: initialData?.postalCode || "",
    phone: initialData?.phone || "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryInfo, string>>>({});

  const handleChange = (field: keyof DeliveryInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof DeliveryInfo, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[+]?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="First name"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          fullWidth
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <Input
          type="text"
          placeholder="Last name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          fullWidth
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </div>

      <Input
        type="text"
        placeholder="Company (optional)"
        value={formData.company}
        onChange={(e) => handleChange("company", e.target.value)}
        fullWidth
      />

      <Input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => handleChange("address", e.target.value)}
        fullWidth
        error={!!errors.address}
        helperText={errors.address}
      />

      <Input
        type="text"
        placeholder="Apartment, suite, etc. (optional)"
        value={formData.apartment}
        onChange={(e) => handleChange("apartment", e.target.value)}
        fullWidth
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
          fullWidth
          error={!!errors.city}
          helperText={errors.city}
        />
        <Input
          type="text"
          placeholder="Postal code"
          value={formData.postalCode}
          onChange={(e) => handleChange("postalCode", e.target.value)}
          fullWidth
          error={!!errors.postalCode}
          helperText={errors.postalCode}
        />
        <Select
          value={formData.country}
          onChange={(value) => handleChange("country", value)}
          options={countries.map((c) => ({ value: c, label: c }))}
          fullWidth
        />
      </div>

      <Input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        fullWidth
        error={!!errors.phone}
        helperText={errors.phone}
      />

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Continue to shipping
      </Button>
    </form>
  );
};
