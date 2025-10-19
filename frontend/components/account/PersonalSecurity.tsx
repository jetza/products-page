"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Buttons/Button";
import { Input } from "@/components/ui/Input";
import { UserIcon } from "@/components/icons";
import { useCheckout } from "@/lib/hooks/useCheckout";
import { CONTENT } from "@/lib/constants/content";

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
        {CONTENT.account.personalSecurity}
      </h1>

      <div className="mb-8 md:mb-12">
        <h2 className="text-base md:text-body font-medium mb-4 md:mb-6">
          {CONTENT.account.personalInfo}
        </h2>

        <div className="border border-gray-200 rounded-lg p-4 md:p-6 mb-4">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <UserIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 flex-shrink-0 mt-1" />

            {isEditingName ? (
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={CONTENT.account.name}
                  type="text"
                  value={`${editedFirstName} ${editedLastName}`}
                  onChange={(e) => {
                    const names = e.target.value.split(" ");
                    setEditedFirstName(names[0] || "");
                    setEditedLastName(names.slice(1).join(" ") || "");
                  }}
                  fullWidth
                />
                <Input
                  label={CONTENT.account.number}
                  type="text"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  fullWidth
                />
              </div>
            ) : (
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">
                    {CONTENT.account.name}
                  </p>
                  <p className="text-sm md:text-base text-gray-900">
                    {firstName} {lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">
                    {CONTENT.account.number}
                  </p>
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
              {isEditingName ? CONTENT.account.save : CONTENT.account.change}
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8 md:mb-12">
        <h2 className="text-base md:text-body font-medium mb-4 md:mb-6">
          {CONTENT.account.contact}
        </h2>

        <div className="border border-gray-200 rounded-lg p-4 md:p-6 mb-2">
          <div className="flex items-start gap-4">
            <UserIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 flex-shrink-0 mt-1" />

            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-500 mb-1">
                {CONTENT.account.email}
              </p>
              <p className="text-sm md:text-base text-gray-900">{email}</p>
            </div>
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-500 mt-2">
          {CONTENT.account.emailChangeNote}
        </p>
      </div>

      <div className="mb-8 md:mb-12">
        <h2 className="text-base md:text-body font-medium mb-4 md:mb-6">
          {CONTENT.account.address}
        </h2>

        <Button variant="primary" size="md" className="w-full md:w-auto">
          {CONTENT.account.addAddress}
        </Button>
      </div>

      <div>
        <h2 className="text-base md:text-body font-medium mb-4 md:mb-6">
          {CONTENT.account.changePassword}
        </h2>

        <p className="text-xs md:text-sm text-gray-500 mb-4">
          {CONTENT.account.passwordResetNote}
        </p>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsChangingPassword(!isChangingPassword)}
          className="w-full md:w-auto"
        >
          {CONTENT.account.resetPassword}
        </Button>
      </div>
    </div>
  );
};
