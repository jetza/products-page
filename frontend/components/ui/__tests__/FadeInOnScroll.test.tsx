import React from "react";
import { render, screen } from "@testing-library/react";
import { FadeInOnScroll } from "../FadeInOnScroll";

describe("FadeInOnScroll Component", () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    });
    window.IntersectionObserver =
      mockIntersectionObserver as typeof window.IntersectionObserver;
  });

  it("renders children correctly", () => {
    render(
      <FadeInOnScroll>
        <div>Test Content</div>
      </FadeInOnScroll>,
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies default fade-up variant", () => {
    const { container } = render(
      <FadeInOnScroll>
        <div>Test</div>
      </FadeInOnScroll>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("opacity-0", "translate-y-12");
  });

  it("applies custom variant", () => {
    const { container } = render(
      <FadeInOnScroll variant="fade-left">
        <div>Test</div>
      </FadeInOnScroll>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("opacity-0", "translate-x-12");
  });

  it("applies custom duration", () => {
    const { container } = render(
      <FadeInOnScroll duration={1000}>
        <div>Test</div>
      </FadeInOnScroll>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ transitionDuration: "1000ms" });
  });

  it("applies custom className", () => {
    const { container } = render(
      <FadeInOnScroll className="custom-class">
        <div>Test</div>
      </FadeInOnScroll>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("creates IntersectionObserver on mount", () => {
    render(
      <FadeInOnScroll>
        <div>Test</div>
      </FadeInOnScroll>,
    );
    expect(window.IntersectionObserver).toHaveBeenCalled();
  });

  it("handles scale variant", () => {
    const { container } = render(
      <FadeInOnScroll variant="scale">
        <div>Test</div>
      </FadeInOnScroll>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("opacity-0", "scale-95");
  });

  it("handles slide-up variant", () => {
    const { container } = render(
      <FadeInOnScroll variant="slide-up">
        <div>Test</div>
      </FadeInOnScroll>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("translate-y-16", "opacity-0");
  });

  it("handles fade-right variant", () => {
    const { container } = render(
      <FadeInOnScroll variant="fade-right">
        <div>Test</div>
      </FadeInOnScroll>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("opacity-0", "-translate-x-12");
  });

  it("handles fade-down variant", () => {
    const { container } = render(
      <FadeInOnScroll variant="fade-down">
        <div>Test</div>
      </FadeInOnScroll>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("opacity-0", "-translate-y-12");
  });
});
