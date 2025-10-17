"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Buttons/Button";
import { Input } from "@/components/ui/Input";
import { UserIcon } from "@/components/icons";
import { useCheckout } from "@/lib/hooks/useCheckout";

export const PersonalSecurity: React.FC = () => {
  const { state } = useCheckout();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const firstName = state.deliveryInfo?.firstName || "";
  const lastName = state.deliveryInfo?.lastName || "";
  const phone = state.deliveryInfo?.phone || "";
  const email = state.email || "";

  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  const handleStartEditing = () => {
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
    setEditedPhone(phone);
    setIsEditingName(true);
  };

  const handleSave = () => {
    setIsEditingName(false);
  };

  return (
    <div>
      <h1 className="text-[32px] font-semibold mb-8 md:mb-12">
        Personal & security
      </h1>

      <div className="mb-8 md:mb-12">
        <h2 className="text-base md:text-body font-medium mb-4 md:mb-6">
          Personal information
        </h2>

        <div className="border border-gray-200 rounded-lg p-4 md:p-6 mb-4">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <UserIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 flex-shrink-0 mt-1" />
            
            {isEditingName ? (
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  type="text"
                  value={`${editedFirstName} ${editedLastName}`}
                  onChange={(e) => {
                    const names = e.target.value.split(' ');
                    setEditedFirstName(names[0] || '');
                    setEditedLastName(names.slice(1).join(' ') || '');
                  }}
                  fullWidth
                />
                <Input
                  label="Number"
                  type="text"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  fullWidth
                />
              </div>
            ) : (
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Name</p>
                  <p className="text-sm md:text-base text-gray-900">{firstName} {lastName}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Number</p>
                  <p className="text-sm md:text-base text-gray-900">{phone}</p>
                </div>
              </div>
            )}

            <Button
              variant="secondary"
              size="md"
              onClick={isEditingName ? handleSave : handleStartEditing}
              className="w-full md:w-auto md:flex-shrink-0"
            >
              {isEditingName ? "Save" : "Change"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8 md:mb-12">
        <h2 className="text-base md:text-body font-medium mb-4 md:mb-6">
          Contact
        </h2>

        <div className="border border-gray-200 rounded-lg p-4 md:p-6 mb-2">
          <div className="flex items-start gap-4">
            <UserIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 flex-shrink-0 mt-1" />
            
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-500 mb-1">Email</p>
              <p className="text-sm md:text-base text-gray-900">{email}</p>
            </div>
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-500 mt-2">
          If you want to change your email please contact us via customer support.
        </p>
      </div>

      <div className="mb-8 md:mb-12">
        <h2 className="text-base md:text-body font-medium mb-4 md:mb-6">
          Address
        </h2>

        <Button
          variant="primary"
          size="md"
          className="w-full md:w-auto"
        >
          Add address
        </Button>
      </div>

      <div>
        <h2 className="text-base md:text-body font-medium mb-4 md:mb-6">
          Change password
        </h2>

        <p className="text-xs md:text-sm text-gray-500 mb-4">
          To change your password, we&apos;ll send you an email. Just click on the reset button below.
        </p>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsChangingPassword(!isChangingPassword)}
          className="w-full md:w-auto"
        >
          Reset password
        </Button>
      </div>
    </div>
  );
};
