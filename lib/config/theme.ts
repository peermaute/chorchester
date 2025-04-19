export const theme = {
  colors: {
    background: {
      primary: "bg-background",
      secondary: "bg-muted",
    },
    border: {
      default: "border-border",
      accent: "border-accent",
    },
    text: {
      primary: "text-foreground",
      secondary: "text-muted-foreground",
      accent: "text-accent-foreground",
    },
  },
  spacing: {
    container: {
      padding: "px-4 sm:px-6 lg:px-8",
      maxWidth: "max-w-7xl",
    },
    elements: {
      small: "gap-2",
      medium: "gap-4",
      large: "gap-6",
    },
  },
  typography: {
    heading: {
      h1: "text-xl font-extrabold uppercase tracking-tight",
      h2: "text-lg font-bold",
      h3: "text-base font-semibold",
    },
    body: {
      default: "text-sm",
      small: "text-xs",
    },
  },
  transitions: {
    default: "transition-all duration-300",
    hover: "hover:scale-[1.02] active:scale-[0.98]",
  },
  layout: {
    header: {
      height: "h-[78px]",
    },
  },
} as const;
