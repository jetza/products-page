export type ModalStyleConfig = {
  width: string;
  minHeight?: string;
  height?: string;
  gap: string;
  padding: string;
};

const MODAL_STYLES: Record<string, Record<string, ModalStyleConfig>> = {
  "popup-1": {
    desktop: {
      width: "616px",
      minHeight: "530px",
      gap: "40px",
      padding: "24px",
    },
    mobile: {
      width: "344px",
      minHeight: "538px",
      gap: "32px",
      padding: "24px 16px",
    },
  },
  "popup-2": {
    desktop: {
      width: "616px",
      minHeight: "482px",
      gap: "40px",
      padding: "24px",
    },
    mobile: {
      width: "344px",
      minHeight: "482px",
      gap: "40px",
      padding: "24px",
    },
  },
  "popup-3": {
    desktop: {
      width: "432px",
      minHeight: "392px",
      gap: "40px",
      padding: "24px",
    },
    mobile: {
      width: "344px",
      minHeight: "376px",
      gap: "32px",
      padding: "24px 16px",
    },
  },
  confirmation: {
    desktop: { width: "608px", height: "162px", gap: "32px", padding: "24px" },
    mobile: { width: "344px", height: "162px", gap: "32px", padding: "24px" },
  },
};

export default MODAL_STYLES;
