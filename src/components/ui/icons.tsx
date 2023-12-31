import { cn } from "@/lib/utils";

type IconProps = React.HTMLAttributes<SVGElement>;

// For consistency, please use https://lucide.dev/icons/menu as much as possible.
// Feel free to checkout: https://www.radix-ui.com/icons
// For more info: https://github.com/shadcn-ui/ui/issues/1006
export const Icons = {
  logo: (props: IconProps) => (
    <svg
      width="107"
      height="107"
      viewBox="0 0 107 107"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="53.5" cy="53.5" r="53.5" fill="#0F172A" />
      <path
        d="M33.5037 45.9886C6.70379 42.5896 6.93067 31.8044 71.4702 22.8755L95 20L96 21.5C-0.0710144 44.9675 86.7401 34.2761 105.5 66C35.597 68.4926 115.913 103.545 86.21 104.451C29.6661 112.049 64.7702 100.372 20.1037 99.0127C-13.1861 97.9994 -10.7888 80.9654 70.8 61.6239C94.6967 55.9589 52.0778 48.3443 33.5037 45.9886Z"
        fill="#E2E8F0"
      />
    </svg>
  ),
  chevronDown: ({ className, ...otherProps }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-chevron-down", className)}
      {...otherProps}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  hamburger: ({ className, ...otherProps }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-menu", className)}
      {...otherProps}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  info: ({ className, ...otherProps }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-info", className)}
      {...otherProps}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  comment: ({ className, ...otherProps }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-message-circle", className)}
      {...otherProps}
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  ),
  check: ({ className, ...otherProps }: IconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("lucide lucide-check-circle", className)}
        {...otherProps}
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    );
  },
};
