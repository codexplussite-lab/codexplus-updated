'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  ...props
}: MotionWrapperProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 28 };
      case 'down':
        return { opacity: 0, y: -28 };
      case 'left':
        return { opacity: 0, x: 28 };
      case 'right':
        return { opacity: 0, x: -28 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  staggerChildren = 0.1,
  ...props
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
