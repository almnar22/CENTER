import React from 'react';

interface DashboardStats {
  totalStudents: number;
  pendingCommissions: number;
  paidCommissions: number;
  topDelegate: string;
}

interface DashboardProps {
    stats: DashboardStats;
}


const StatCard: React.FC<{ title: string; value: string | number; icon: string; color: 'primary' | 'secondary' }> = ({ title, value, icon, color }) => {
  const colorClasses = {
    primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary)] border-[var(--color-primary)]',
    secondary: 'bg-[var(--color-secondary-light)] text-[var(--color-secondary)] border-[var(--color-secondary)]',
  };
  return (
    <div className={`p-6 rounded-lg shadow-md border-t-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-[var(--color-text-base)]">{title}</p>
          <p className={`text-3xl font-bold ${color === 'secondary' ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]'}`}>{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">🔷🔶 لوحة التحكم 🔶🔷</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="الطلاب المسجلين" value={stats.totalStudents} icon="👥" color="primary" />
        <StatCard title="العمولات المعلقة" value={`${stats.pendingCommissions.toLocaleString()} ريال`} icon="⏳" color="secondary" />
        <StatCard title="العمولات المدفوعة" value={`${stats.paidCommissions.toLocaleString()} ريال`} icon="✅" color="primary" />
        <StatCard title="أفضل المندوبين" value={stats.topDelegate} icon="🏆" color="secondary" />
      </div>
      <div className="mt-8 p-4 bg-[var(--color-card)] rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">نظرة عامة سريعة</h3>
        <p className="text-[var(--color-text-muted)]">
          مرحباً بك في لوحة تحكم المركز الأوروبي. من هنا يمكنك متابعة أداء المركز، مراقبة التسجيلات الجديدة، وإدارة العمولات المستحقة للمندوبين.
        </p>
      </div>
    </div>
  );
};