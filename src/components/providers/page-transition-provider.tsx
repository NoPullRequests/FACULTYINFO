"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type PageTransitionProviderProps = {
  children: React.ReactNode;
};

/**
 * Wraps page content with smooth fade + slide transitions.
 * Uses framer-motion for animations.
 */
export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname();
  const [displayPath, setDisplayPath] = useState(pathname);

  useEffect(() => {
    setDisplayPath(pathname);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={displayPath}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
