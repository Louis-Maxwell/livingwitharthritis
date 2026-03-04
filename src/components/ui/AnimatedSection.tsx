import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const directionMap = {
  up: { y: 16, x: 0 },
  left: { y: 0, x: -16 },
  right: { y: 0, x: 16 },
  none: { y: 0, x: 0 },
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, y: offset.y, x: offset.x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.2, delay: delay * 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
