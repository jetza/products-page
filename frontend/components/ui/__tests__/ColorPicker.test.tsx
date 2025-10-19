import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ColorPicker } from "../ColorPicker";

// Mock colors.config
jest.mock("@/lib/constants/colors.config", () => ({
  getColorValue: (color: string) => {
    const colors: Record<string, string> = {
      Red: "#EF4444",
      Blue: "#3B82F6",
      Green: "#10B981",
      Black: "#000000",
      White: "#FFFFFF",
    };
    return colors[color] || "#808080";
  },
}));

// Mock content
jest.mock("@/lib/constants/content", () => ({
  CONTENT: {
    filters: {
      colors: "Color",
    },
  },
}));

describe("ColorPicker Component", () => {
  const mockColors = ["Red", "Blue", "Green"];
  const mockOnColorSelect = jest.fn();

  beforeEach(() => {
    mockOnColorSelect.mockClear();
  });

  it("renders all color options", () => {
    render(
      <ColorPicker
        colors={mockColors}
        selectedColor="Red"
        onColorSelect={mockOnColorSelect}
      />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it("displays color label", () => {
    render(
      <ColorPicker
        colors={mockColors}
        selectedColor="Red"
        onColorSelect={mockOnColorSelect}
      />,
    );
    expect(screen.getByText("Color")).toBeInTheDocument();
  });

  it("displays selected color name", () => {
    render(
      <ColorPicker
        colors={mockColors}
        selectedColor="Blue"
        onColorSelect={mockOnColorSelect}
      />,
    );
    expect(screen.getByText("Blue")).toBeInTheDocument();
  });

  it("calls onColorSelect when color button is clicked", () => {
    render(
      <ColorPicker
        colors={mockColors}
        selectedColor="Red"
        onColorSelect={mockOnColorSelect}
      />,
    );
    const blueButton = screen.getByLabelText("Select Blue color");
    fireEvent.click(blueButton);
    expect(mockOnColorSelect).toHaveBeenCalledWith("Blue");
  });

  it("renders nothing when colors array is empty", () => {
    const { container } = render(
      <ColorPicker
        colors={[]}
        selectedColor=""
        onColorSelect={mockOnColorSelect}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows first color when no color is selected", () => {
    render(
      <ColorPicker
        colors={mockColors}
        selectedColor=""
        onColorSelect={mockOnColorSelect}
      />,
    );
    expect(screen.getByText("Red")).toBeInTheDocument();
  });

  it("renders color buttons with correct aria labels", () => {
    render(
      <ColorPicker
        colors={["Red", "Black"]}
        selectedColor="Red"
        onColorSelect={mockOnColorSelect}
      />,
    );
    expect(screen.getByLabelText("Select Red color")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Black color")).toBeInTheDocument();
  });
});
