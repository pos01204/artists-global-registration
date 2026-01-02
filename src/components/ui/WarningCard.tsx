'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, XCircle, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

type CardVariant = 'warning' | 'info' | 'success' | 'error';

interface WarningCardProps {
  variant?: CardVariant;
  title?: string;
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
  animate?: boolean;
}

const VARIANTS = {
  warning: {
    bg: 'bg-gradient-to-r from-amber-50 to-orange-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-500',
    titleColor: 'text-amber-800',
    textColor: 'text-amber-700',
    defaultIcon: AlertTriangle,
  },
  info: {
    bg: 'bg-gradient-to-r from-blue-50 to-sky-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-500',
    titleColor: 'text-blue-800',
    textColor: 'text-blue-700',
    defaultIcon: Info,
  },
  success: {
    bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
    border: 'border-green-200',
    iconBg: 'bg-green-500',
    titleColor: 'text-green-800',
    textColor: 'text-green-700',
    defaultIcon: CheckCircle,
  },
  error: {
    bg: 'bg-gradient-to-r from-red-50 to-rose-50',
    border: 'border-red-200',
    iconBg: 'bg-red-500',
    titleColor: 'text-red-800',
    textColor: 'text-red-700',
    defaultIcon: XCircle,
  },
};

export default function WarningCard({
  variant = 'warning',
  title,
  children,
  icon,
  className = '',
  animate = true,
}: WarningCardProps) {
  const config = VARIANTS[variant];
  const Icon = icon || config.defaultIcon;

  const content = (
    <div className={`
      ${config.bg} ${config.border} border rounded-xl p-4 ${className}
    `}>
      <div className="flex items-start gap-3">
        <div className={`
          w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center 
          flex-shrink-0 shadow-lg shadow-${variant === 'warning' ? 'amber' : variant}-500/20
        `}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          {title && (
            <div className={`font-bold ${config.titleColor} mb-1`}>{title}</div>
          )}
          <div className={`text-sm ${config.textColor}`}>{children}</div>
        </div>
      </div>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
