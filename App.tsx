

import React, { useState, useMemo } from 'react';
import { AppHeader } from './components/AppHeader';
import { MainMenu } from './components/MainMenu';
import { Dashboard } from './components/Dashboard';
import { StudentManagement } from './components/StudentManagement';
import { DelegateManagement } from './components/DelegateManagement';
import { CommissionManagement } from './components/CommissionManagement';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import type { View, Student, Commission, Delegate } from './types';
import { Course, Schedule, CommissionStatus, StudentStatus } from './types';
import { useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { DelegateDashboard } from './components/DelegateDashboard';

const initialStudentsData: Student[] = [
    // Students for abdulmalek (delegateId: 3)
    { id: 1, firstName: 'أحمد', secondName: 'علي', thirdName: 'محمد', lastName: 'الشهري', phone: '0511111111', course: Course.Computer, schedule: Schedule.Evening, delegateId: 3, registrationDate: '2024-07-10' },
    { id: 2, firstName: 'فاطمة', secondName: 'عبدالله', thirdName: 'حسن', lastName: 'الغامدي', phone: '0511111112', course: Course.English, schedule: Schedule.Morning, delegateId: 3, registrationDate: '2024-07-12' },
    { id: 3, firstName: 'خالد', secondName: 'سعيد', thirdName: 'عمر', lastName: 'القحطاني', phone: '0511111113', course: Course.Maintenance, schedule: Schedule.Both, delegateId: 3, registrationDate: '2024-07-15' },
    // Students for hadiya (delegateId: 4)
    { id: 4, firstName: 'سارة', secondName: 'محمد', thirdName: 'سالم', lastName: 'العتيبي', phone: '0511111114', course: Course.Accounting, schedule: Schedule.Morning, delegateId: 4, registrationDate: '2024-07-18' },
    { id: 5, firstName: 'عمر', secondName: 'أحمد', thirdName: 'علي', lastName: 'الحربي', phone: '0511111115', course: Course.Graphics, schedule: Schedule.Evening, delegateId: 4, registrationDate: '2024-07-20' },
    // Students for mhajri (delegateId: 5)
    { id: 6, firstName: 'نورة', secondName: 'عبدالعزيز', thirdName: 'فهد', lastName: 'الشمري', phone: '0511111116', course: Course.Reading, schedule: Schedule.Morning, delegateId: 5, registrationDate: '2024-06-25' },
    { id: 7, firstName: 'ياسر', secondName: 'فهد', thirdName: 'ناصر', lastName: 'المطيري', phone: '0511111117', course: Course.Computer, schedule: Schedule.Both, delegateId: 5, registrationDate: '2024-06-28' },
    // Students for ammar (delegateId: 6)
    { id: 8, firstName: 'لينا', secondName: 'محسن', thirdName: 'سعيد', lastName: 'الغامدي', phone: '0511111118', course: Course.English, schedule: Schedule.Evening, delegateId: 6, registrationDate: '2024-07-22' },
    // Students for najla (delegateId: 7)
    { id: 9, firstName: 'ريماس', secondName: 'نواف', thirdName: 'بدر', lastName: 'الثبيتي', phone: '0511111119', course: Course.Custom, schedule: Schedule.Morning, delegateId: 7, registrationDate: '2024-07-25' },
    { id: 10, firstName: 'بدر', secondName: 'ناصر', thirdName: 'خالد', lastName: 'السعدي', phone: '0511111120', course: Course.Maintenance, schedule: Schedule.Evening, delegateId: 7, registrationDate: '2024-07-28' },
];

const initialCommissions: Commission[] = [
    { id: 1, studentId: 1, delegateId: 3, studentName: 'أحمد علي محمد الشهري', course: Course.Computer, amount: 500, status: CommissionStatus.Paid, studentStatus: StudentStatus.Completed, createdDate: '2024-07-10', paidDate: '2024-07-20' },
    { id: 2, studentId: 2, delegateId: 3, studentName: 'فاطمة عبدالله حسن الغامدي', course: Course.English, amount: 500, status: CommissionStatus.Confirmed, studentStatus: StudentStatus.Studying, createdDate: '2024-07-12', confirmedDate: '2024-07-18' },
    { id: 3, studentId: 3, delegateId: 3, studentName: 'خالد سعيد عمر القحطاني', course: Course.Maintenance, amount: 500, status: CommissionStatus.Pending, studentStatus: StudentStatus.FeesPaid, createdDate: '2024-07-15' },
    { id: 4, studentId: 4, delegateId: 4, studentName: 'سارة محمد سالم العتيبي', course: Course.Accounting, amount: 500, status: CommissionStatus.Confirmed, studentStatus: StudentStatus.Studying, createdDate: '2024-07-18', confirmedDate: '2024-07-22' },
    { id: 5, studentId: 5, delegateId: 4, studentName: 'عمر أحمد علي الحربي', course: Course.Graphics, amount: 500, status: CommissionStatus.Cancelled, studentStatus: StudentStatus.Dropped, createdDate: '2024-07-20' },
    { id: 6, studentId: 6, delegateId: 5, studentName: 'نورة عبدالعزيز فهد الشمري', course: Course.Reading, amount: 500, status: CommissionStatus.Paid, studentStatus: StudentStatus.Completed, createdDate: '2024-06-25', paidDate: '2024-07-05' },
    { id: 7, studentId: 7, delegateId: 5, studentName: 'ياسر فهد ناصر المطيري', course: Course.Computer, amount: 500, status: CommissionStatus.Pending, studentStatus: StudentStatus.OnHold, createdDate: '2024-06-28' },
    { id: 8, studentId: 8, delegateId: 6, studentName: 'لينا محسن سعيد الغامدي', course: Course.English, amount: 500, status: CommissionStatus.Pending, studentStatus: StudentStatus.Registered, createdDate: '2024-07-22' },
    { id: 9, studentId: 9, delegateId: 7, studentName: 'ريماس نواف بدر الثبيتي', course: Course.Custom, amount: 500, status: CommissionStatus.Pending, studentStatus: StudentStatus.FeesPaid, createdDate: '2024-07-25' },
    { id: 10, studentId: 10, delegateId: 7, studentName: 'بدر ناصر خالد السعدي', course: Course.Maintenance, amount: 500, status: CommissionStatus.Confirmed, studentStatus: StudentStatus.Studying, createdDate: '2024-07-28', confirmedDate: '2024-07-30' },
];


const App: React.FC = () => {
  const { currentUser, delegates, incrementStudentCount, decrementStudentCount } = useAuth();
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [students, setStudents] = useState<Student[]>(initialStudentsData);
  const [commissions, setCommissions] = useState<Commission[]>(initialCommissions);

  const handleAddStudent = (studentData: Omit<Student, 'id' | 'registrationDate'>) => {
    const newStudent: Student = {
      id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
      ...studentData,
      registrationDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
    setStudents(prevStudents => [newStudent, ...prevStudents]);
    incrementStudentCount(newStudent.delegateId);
    
    // Automatically create a commission log
    const newCommission: Commission = {
        id: commissions.length > 0 ? Math.max(...commissions.map(c => c.id)) + 1 : 1,
        studentId: newStudent.id,
        delegateId: newStudent.delegateId,
        studentName: `${newStudent.firstName} ${newStudent.secondName} ${newStudent.thirdName} ${newStudent.lastName}`,
        course: newStudent.course,
        amount: 500, // Updated commission amount
        status: CommissionStatus.Pending,
        studentStatus: StudentStatus.Registered,
        createdDate: newStudent.registrationDate,
    };
    setCommissions(prev => [newCommission, ...prev]);
  };

  const handleEditStudent = (studentId: number, updatedData: Partial<Omit<Student, 'id'>>) => {
      setStudents(prev => prev.map(s => s.id === studentId ? {...s, ...updatedData} : s));
  };
  
  const handleDeleteStudent = (studentId: number) => {
      const studentToDelete = students.find(s => s.id === studentId);
      if(studentToDelete){
          setStudents(prev => prev.filter(s => s.id !== studentId));
          setCommissions(prev => prev.filter(c => c.studentId !== studentId));
          decrementStudentCount(studentToDelete.delegateId);
      }
  };
  
  const updateCommissionStatus = (commissionId: number, status: CommissionStatus) => {
      setCommissions(prev => prev.map(c => {
          if (c.id === commissionId) {
              const now = new Date().toISOString().split('T')[0];
              return {
                  ...c,
                  status,
                  confirmedDate: status === CommissionStatus.Confirmed ? now : c.confirmedDate,
                  paidDate: status === CommissionStatus.Paid ? now : c.paidDate,
              };
          }
          return c;
      }));
  };

  const updateStudentStatus = (commissionId: number, studentStatus: StudentStatus) => {
      setCommissions(prev => prev.map(c => {
          if (c.id === commissionId) {
              const now = new Date().toISOString().split('T')[0];
              let newCommissionStatus = c.status;
              let newConfirmedDate = c.confirmedDate;

              // Auto-update commission status based on student status
              if (studentStatus === StudentStatus.Completed && c.status !== CommissionStatus.Paid) {
                  newCommissionStatus = CommissionStatus.Confirmed;
                  newConfirmedDate = c.confirmedDate || now;
              } else if (studentStatus === StudentStatus.Dropped) {
                  newCommissionStatus = CommissionStatus.Cancelled;
              }

              return {
                  ...c,
                  studentStatus,
                  status: newCommissionStatus,
                  confirmedDate: newConfirmedDate,
              };
          }
          return c;
      }));
  };

  const dashboardStats = useMemo(() => {
    const activeDelegates = delegates.filter(d => d.isActive);
    const topDelegate = activeDelegates.length > 0 
      ? activeDelegates.reduce((prev, current) => (prev.students > current.students) ? prev : current)
      : null;

    return {
        totalStudents: students.length,
        pendingCommissions: commissions
            .filter(c => c.status === CommissionStatus.Pending)
            .reduce((sum, c) => sum + c.amount, 0),
        paidCommissions: commissions
            .filter(c => c.status === CommissionStatus.Paid)
            .reduce((sum, c) => sum + c.amount, 0),
        topDelegate: topDelegate ? `${topDelegate.fullName} (${topDelegate.students} طالب)` : 'لا يوجد',
    };
  }, [students, commissions, delegates]);


  if (!currentUser) {
    return <Login />;
  }
  
  if (currentUser.role === 'delegate') {
      return <DelegateDashboard delegates={delegates} students={students} onAddStudent={handleAddStudent} commissions={commissions} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard stats={dashboardStats} />;
      case 'students':
        return <StudentManagement delegates={delegates} students={students} onAddStudent={handleAddStudent} onEditStudent={handleEditStudent} onDeleteStudent={handleDeleteStudent} />;
      case 'delegates':
        return <DelegateManagement />;
      case 'commissions':
        return <CommissionManagement commissions={commissions} delegates={delegates} onUpdateCommissionStatus={updateCommissionStatus} onUpdateStudentStatus={updateStudentStatus} />;
      case 'reports':
        return <Reports delegates={delegates} commissions={commissions} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard stats={dashboardStats}/>;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-base)]">
      <div className="flex flex-col md:flex-row">
        <MainMenu setActiveView={setActiveView} activeView={activeView} />
        <main className="flex-1 p-4 md:p-8">
          <AppHeader />
          <div className="mt-8">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;