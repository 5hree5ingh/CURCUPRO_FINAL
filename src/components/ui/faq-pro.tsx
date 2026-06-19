"use client";

import { ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

// Tailored to Curcupure brand: Warm cream, charcoal text, elegant gold accents.
const componentThemeClassName =
  "[--ic-background:#fdfaf5] [--ic-foreground:#1a1105] [--ic-primary:#b0741a] [--ic-secondary:#5c4a32] [--ic-surface-border:#e9e0d2] [--ic-border:#e5dcd0] [--ic-card:#fdfaf5] [--ic-card-foreground:#1a1105] [--ic-muted:#f9f4e8] [--ic-muted-foreground:#5c4a32] [--ic-accent:#f4ebd9] [--color-accent:var(--ic-accent)] [--color-accent-foreground:var(--ic-accent-foreground)] [--ic-accent-foreground:#1a1105] [--ic-input:#e5dcd0] [--ic-ring:rgba(176,116,26,0.2)] [--ic-destructive:#dc2626] [--ic-paper:#fdfaf5] [--ic-popover-foreground:#1a1105] [--ic-brand:#b0741a] [--ic-brand-soft:rgba(176,116,26,0.1)] [--ic-shadow-soft:0_18px_38px_-24px_rgba(92,74,50,0.15)] [--ic-chart-1:oklch(0.52_0.19_254)] [--ic-chart-2:oklch(0.74_0.11_232)] [--ic-chart-3:oklch(0.42_0.16_262)] [--ic-chart-4:oklch(0.84_0.07_228)] [--ic-chart-5:oklch(0.62_0.14_240)] [--color-background:var(--ic-background)] [--color-foreground:var(--ic-foreground)] [--color-primary:var(--ic-primary)] [--color-secondary:var(--ic-secondary)] [--color-border:var(--ic-border)] [--color-card:var(--ic-card)] [--color-card-foreground:var(--ic-card-foreground)] [--color-muted:var(--ic-muted)] [--color-muted-foreground:var(--ic-muted-foreground)] [--color-accent:var(--ic-accent)] [--color-accent-foreground:var(--ic-accent-foreground)] [--color-input:var(--ic-input)] [--color-ring:var(--ic-ring)] [--color-destructive:var(--ic-destructive)] [--color-paper:var(--ic-paper)] [--color-popover-foreground:var(--ic-popover-foreground)] [--color-brand:var(--ic-brand)] [--color-brand-soft:var(--ic-brand-soft)] [--color-chart-1:var(--ic-chart-1)] [--color-chart-2:var(--ic-chart-2)] [--color-chart-3:var(--ic-chart-3)] [--color-chart-4:var(--ic-chart-4)] [--color-chart-5:var(--ic-chart-5)] dark:[--ic-background:#1a1105] dark:[--ic-foreground:#f4ebd9] dark:[--ic-primary:#b0741a] dark:[--ic-secondary:#cbc6bb] dark:[--ic-surface-border:#2b231a] dark:[--ic-border:#33291e] dark:[--ic-card:#1a1105] dark:[--ic-card-foreground:#f4ebd9] dark:[--ic-muted:#24190c] dark:[--ic-muted-foreground:#cbc6bb] dark:[--ic-accent:#2e2214] [--color-accent:var(--ic-accent)] [--color-accent-foreground:var(--ic-accent-foreground)] dark:[--ic-accent-foreground:#f4ebd9] dark:[--ic-input:#33291e] dark:[--ic-ring:rgba(176,116,26,0.3)] dark:[--ic-destructive:#f87171] dark:[--ic-paper:#24190c] dark:[--ic-popover-foreground:#f4ebd9] dark:[--ic-brand:#b0741a] dark:[--ic-brand-soft:rgba(176,116,26,0.15)] dark:[--ic-shadow-soft:0_20px_44px_-28px_rgba(0,0,0,0.6)] dark:[--ic-chart-1:oklch(0.68_0.17_250)] dark:[--ic-chart-2:oklch(0.82_0.09_225)] dark:[--ic-chart-3:oklch(0.58_0.15_260)] dark:[--ic-chart-4:oklch(0.75_0.12_235)] dark:[--ic-chart-5:oklch(0.88_0.06_220)]";

const PANEL_EASE = [0.16, 1, 0.3, 1] as const;
const EXPAND_SPRING = {
  type: "spring" as const,
  stiffness: 150,
  damping: 26,
  mass: 1.05,
};
const COLLAPSE_SPRING = {
  type: "spring" as const,
  stiffness: 190,
  damping: 30,
  mass: 1.1,
};

export type FaqProItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqProProps = {
  className?: string;
  defaultOpenFirst?: boolean;
  items: FaqProItem[];
  searchPlaceholder?: string;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text: string, query: string) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return text;
  }

  const parts = text.split(
    new RegExp(`(${escapeRegExp(normalizedQuery)})`, "gi")
  );

  return parts.map((part, index) => {
    if (part.toLowerCase() === normalizedQuery.toLowerCase()) {
      return (
        <mark
          className="rounded-sm bg-[#b0741a]/20 text-[#8c540c] font-semibold px-0.5"
          key={index}
        >
          {part}
        </mark>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function itemMatchesQuery(item: FaqProItem, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return (
    item.question.toLowerCase().includes(normalizedQuery) ||
    item.answer.toLowerCase().includes(normalizedQuery)
  );
}

function getDefaultOpenId(items: FaqProItem[], defaultOpenFirst: boolean) {
  if (defaultOpenFirst && items[0]) {
    return items[0].id;
  }

  return null;
}

type FaqProRowProps = {
  isOpen: boolean;
  item: FaqProItem;
  onToggle: () => void;
  panelId: string;
  query: string;
  triggerId: string;
};

function FaqProRow({
  isOpen,
  item,
  onToggle,
  panelId,
  query,
  triggerId,
}: FaqProRowProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#fdfaf5] border border-[#e5dcd0] transition-colors duration-200 hover:bg-[#faf5eb] dark:bg-[#24190c] dark:border-[#33291e] dark:hover:bg-[#2c2013]">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left outline-none cursor-pointer"
        id={triggerId}
        onClick={onToggle}
        type="button"
      >
        <span className="font-serif font-medium text-[16px] text-[#1a1105] dark:text-[#f4ebd9] leading-6 tracking-tight">
          {highlightText(item.question, query)}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "mt-0.5 size-4 shrink-0 text-[#b0741a] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <motion.div
        animate={{ height: isOpen ? "auto" : 0 }}
        aria-labelledby={triggerId}
        className="overflow-hidden"
        id={panelId}
        initial={false}
        role="region"
        transition={{
          height: isOpen ? EXPAND_SPRING : COLLAPSE_SPRING,
        }}
      >
        <motion.div
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -6,
          }}
          aria-hidden={!isOpen}
          className="px-6 pb-5 text-[14px] text-[#5c4a32] dark:text-[#cbc6bb]/90 leading-relaxed font-sans"
          inert={isOpen ? undefined : true}
          initial={false}
          transition={{
            opacity: {
              duration: isOpen ? 0.38 : 0.2,
              ease: PANEL_EASE,
              delay: isOpen ? 0.06 : 0,
            },
            y: isOpen ? EXPAND_SPRING : COLLAPSE_SPRING,
          }}
        >
          {highlightText(item.answer, query)}
        </motion.div>
      </motion.div>
    </div>
  );
}

function FaqPro({
  className,
  defaultOpenFirst = false,
  items,
  searchPlaceholder = "Search FAQs...",
}: FaqProProps) {
  const listId = React.useId();
  const wasSearchingRef = React.useRef(false);

  const [query, setQuery] = React.useState("");
  const [openId, setOpenId] = React.useState<string | null>(() =>
    getDefaultOpenId(items, defaultOpenFirst)
  );

  const normalizedQuery = query.trim();
  const isSearching = normalizedQuery.length > 0;

  const visibleItems = React.useMemo(
    () => items.filter((item) => itemMatchesQuery(item, query)),
    [items, query]
  );

  React.useEffect(() => {
    if (isSearching) {
      wasSearchingRef.current = true;
      setOpenId((current) => {
        if (current && visibleItems.some((item) => item.id === current)) {
          return current;
        }

        return visibleItems[0]?.id ?? null;
      });
      return;
    }

    if (wasSearchingRef.current) {
      wasSearchingRef.current = false;
      setOpenId(getDefaultOpenId(items, defaultOpenFirst));
      return;
    }
  }, [defaultOpenFirst, isSearching, items, visibleItems]);

  React.useEffect(() => {
    setOpenId((current) => {
      if (!current) {
        return current;
      }

      return items.some((item) => item.id === current) ? current : null;
    });
  }, [items]);

  const toggleItem = React.useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <div
      className={cn(
        componentThemeClassName,
        "mx-auto flex w-full max-w-3xl flex-col gap-4",
        className
      )}
    >
      <div className="relative">
        <input
          aria-label={searchPlaceholder}
          className={cn(
            "h-12 w-full appearance-none rounded-full border border-[#e5dcd0] bg-[#fdfaf5] px-6 pr-12 text-[14px] text-[#1a1105] font-sans",
            "shadow-none outline-none focus:outline-none focus-visible:outline-none focus:border-[#b0741a] focus:ring-1 focus:ring-[#b0741a]/30 transition-all duration-200",
            "placeholder:text-[#5c4a32]/40",
            "dark:bg-[#1a1105] dark:border-[#33291e] dark:text-[#f4ebd9] dark:placeholder:text-[#cbc6bb]/30 dark:focus:border-[#b0741a]",
            "[&::-webkit-search-cancel-button]:appearance-none",
            "[&::-webkit-search-decoration]:appearance-none"
          )}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          type="search"
          value={query}
        />
        {query ? (
          <button
            aria-label="Clear search"
            className="absolute top-1/2 right-3 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-[#5c4a32]/60 hover:bg-[#f4ebd9] hover:text-[#1a1105] dark:text-[#cbc6bb]/60 dark:hover:bg-[#2c2013] dark:hover:text-[#f4ebd9] cursor-pointer"
            onClick={() => setQuery("")}
            type="button"
          >
            <X aria-hidden className="size-4" />
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleItems.length > 0 ? (
            visibleItems.map((item) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                initial={{ opacity: 0, y: 4 }}
                key={item.id}
                layout="position"
                transition={{ duration: 0.2, ease: PANEL_EASE }}
              >
                <FaqProRow
                  isOpen={openId === item.id}
                  item={item}
                  onToggle={() => toggleItem(item.id)}
                  panelId={`${listId}-${item.id}-panel`}
                  query={query}
                  triggerId={`${listId}-${item.id}-trigger`}
                />
              </motion.div>
            ))
          ) : (
            <motion.p
              animate={{ opacity: 1 }}
              className="px-2 py-8 text-center text-[14px] text-[#5c4a32]/60 dark:text-[#cbc6bb]/60 font-sans"
              initial={{ opacity: 0 }}
              key="empty"
            >
              No FAQs match your search.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
FaqPro.displayName = "FaqPro";

export { FaqPro };
