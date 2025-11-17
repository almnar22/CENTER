import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { themes, ThemeName } from '../themes';

export const Settings: React.FC = () => {
  const { theme, setThemeName } = useTheme();

  const handleReset = () => {
    setThemeName('default');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">⚙️ إعدادات النظام</h2>
      <div className="bg-[var(--color-card)] p-8 rounded-lg shadow-md space-y-12">
        
        <div>
          <h3 className="text-xl font-bold text-[var(--color-secondary)] border-b-2 border-[var(--color-secondary-light)] pb-2 mb-4">🎨 خصائص المظهر:</h3>
          <p className="text-[var(--color-text-muted)] mb-6">
            اختر سمة الألوان التي تفضلها لتخصيص واجهة النظام. سيتم تطبيق التغييرات فوراً.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(themes).map((themeOption) => (
              <button
                key={themeOption.name}
                onClick={() => setThemeName(themeOption.name as ThemeName)}
                className={`p-4 rounded-lg border-4 transition-all duration-200 text-right ${
                  theme.name === themeOption.name
                    ? 'border-[var(--color-secondary)] shadow-lg scale-105'
                    : 'border-transparent hover:border-[var(--color-border)]'
                }`}
                style={{ backgroundColor: themeOption.colors['--color-card'], color: themeOption.colors['--color-text-base'] }}
              >
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{themeOption.icon}</span>
                    <h4 className="font-bold text-lg">{themeOption.label}</h4>
                </div>
                <div className="flex space-x-2 justify-end" aria-hidden="true">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: themeOption.colors['--color-primary'] }}></div>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: themeOption.colors['--color-secondary'] }}></div>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: themeOption.colors['--color-background'], border: `1px solid ${themeOption.colors['--color-border']}` }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
            <h3 className="text-xl font-bold text-[var(--color-primary)] border-b-2 border-[var(--color-primary-light)] pb-2 mb-4">🔄 إعادة تعيين:</h3>
            <p className="text-[var(--color-text-muted)] mb-4">
              هل تريد العودة إلى المظهر الأصلي؟ انقر على الزر أدناه لإعادة تعيين السمة الافتراضية.
            </p>
            <button
              onClick={handleReset}
              className="bg-[var(--color-secondary)] text-[var(--color-primary-text)] font-bold py-2 px-6 rounded-lg hover:bg-[var(--color-secondary-hover)] transition-colors duration-300"
            >
              إعادة تعيين إلى الافتراضي
            </button>
        </div>
      </div>
    </div>
  );
};