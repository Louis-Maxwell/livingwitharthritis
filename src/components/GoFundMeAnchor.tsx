import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { CHARITY, GOFUNDME_DONATE_LABEL } from "@/config/charity";
import { trackDonationClick } from "@/lib/ga-events";

type GoFundMeAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  source?: string;
  children: ReactNode;
  /** Defaults to the shared "opens in a new tab" label. */
  ariaLabel?: string;
};

/**
 * Homepage (and research-fund) pay link. The campaign URL lives only on
 * `CHARITY.gofundmeUrl` — do not pass a different href.
 */
const GoFundMeAnchor = forwardRef<HTMLAnchorElement, GoFundMeAnchorProps>(
  (
    {
      className,
      children,
      source = "gofundme",
      ariaLabel = GOFUNDME_DONATE_LABEL,
      onClick,
      ...props
    },
    ref,
  ) => (
    <a
      ref={ref}
      {...props}
      href={CHARITY.gofundmeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        trackDonationClick({ source, method: "gofundme" });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
);

GoFundMeAnchor.displayName = "GoFundMeAnchor";
export default GoFundMeAnchor;
