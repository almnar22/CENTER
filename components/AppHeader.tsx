
import React from 'react';

const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path d="M12.001 2.003c.87 0 1.704.246 2.404.69l6.304 3.998c1.4  .885 1.4 2.94 0 3.824l-6.304 3.998a4.503 4.503 0 0 1-4.808 0l-6.304-3.998a2.25 2.25 0 0 1 0-3.824l6.304-3.998a4.503 4.503 0 0 1 2.404-.69Zm-9.19 8.293L9.6 13.094a6.004 6.004 0 0 0 4.803 0l6.789-4.298-6.305-3.998a4.503 4.503 0 0 1-4.808 0l-6.304 3.998ZM2.81 13.801l6.305 3.998a4.503 4.503 0 0 0 4.808 0l6.304-3.998-6.789-4.298a6.004 6.004 0 0 1-4.803 0L2.81 13.8Z" />
  </svg>
);

export const AppHeader: React.FC = () => {
  return (
    <div className="bg-[var(--color-card)] p-4 rounded-lg shadow-md border-t-4 border-[var(--color-primary)] text-center">
      <div className="flex items-center justify-center gap-2">
        <DiamondIcon className="text-[var(--color-primary)]" />
        <DiamondIcon className="text-[var(--color-secondary)]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
          نظام المندوب الذكي - المركز الأوروبي
        </h1>
        <DiamondIcon className="text-[var(--color-secondary)]" />
        <DiamondIcon className="text-[var(--color-primary)]" />
      </div>
      <div className="mt-2 text-[var(--color-text-muted)]">
        <p>📍 المركز الأوروبي - حجة شارع مجمع الثورة | 📞 07223242 - 771991074</p>
      </div>
    </div>
  );
};