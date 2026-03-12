import { useState } from 'react';
import type { Language } from '../../App';
import { Users, Plus, Trash2 } from 'lucide-react';
import { SaveConfirmationModal } from '../SaveConfirmationModal';
import { toast } from 'sonner';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  permissions: {
    viewOrders: boolean;
    viewEarnings: boolean;
    editProducts: boolean;
    inventoryAccess: boolean;
  };
}

interface StaffPermissionsSettingsProps {
  language: Language;
}

export function StaffPermissionsSettings({ language }: StaffPermissionsSettingsProps) {
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      role: 'مدير المتجر',
      permissions: {
        viewOrders: true,
        viewEarnings: false,
        editProducts: true,
        inventoryAccess: true
      }
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('');

  const t = {
    ar: {
      title: 'التحكم بصلاحيات لوحة الأرباح',
      subtitle: 'إدارة صلاحيات الموظفين للوصول إلى البيانات المالية',
      addStaff: 'إضافة موظف',
      staffName: 'اسم الموظف',
      role: 'الدور الوظيفي',
      permissions: 'الصلاحيات',
      viewOrders: 'عرض الطلبات',
      viewEarnings: 'عرض الأرباح',
      editProducts: 'تعديل المنتجات',
      inventoryAccess: 'الوصول للمخزون',
      save: 'حفظ الصلاحيات',
      cancel: 'إلغاء',
      delete: 'حذف',
      noStaff: 'لا يوجد موظفين',
      addFirstStaff: 'أضف أول موظف للتحكم بالصلاحيات',
      permissionsSaved: 'تم تحديث الصلاحيات بنجاح'
    },
    en: {
      title: 'Financial Dashboard Access Control',
      subtitle: 'Manage staff permissions to access financial data',
      addStaff: 'Add Staff Member',
      staffName: 'Staff Name',
      role: 'Role',
      permissions: 'Permissions',
      viewOrders: 'View Orders',
      viewEarnings: 'View Earnings',
      editProducts: 'Edit Products',
      inventoryAccess: 'Inventory Access',
      save: 'Save Staff Permissions',
      cancel: 'Cancel',
      delete: 'Delete',
      noStaff: 'No staff members',
      addFirstStaff: 'Add your first staff member to control permissions',
      permissionsSaved: 'Permissions updated successfully'
    }
  };

  const togglePermission = (staffId: string, permission: keyof StaffMember['permissions']) => {
    setStaff(staff.map(s => 
      s.id === staffId 
        ? { ...s, permissions: { ...s.permissions, [permission]: !s.permissions[permission] } }
        : s
    ));
  };

  const deleteStaff = (staffId: string) => {
    setStaff(staff.filter(s => s.id !== staffId));
  };

  const addStaff = () => {
    if (newStaffName && newStaffRole) {
      const newStaff: StaffMember = {
        id: Date.now().toString(),
        name: newStaffName,
        role: newStaffRole,
        permissions: {
          viewOrders: false,
          viewEarnings: false,
          editProducts: false,
          inventoryAccess: false
        }
      };
      setStaff([...staff, newStaff]);
      setNewStaffName('');
      setNewStaffRole('');
      setShowAddForm(false);
    }
  };

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleSave = () => {
    setIsSaveModalOpen(true);
  };

  const confirmSave = () => {
    toast.success(t[language].permissionsSaved);
    setIsSaveModalOpen(false);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-purple-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-gray-800 text-lg">{t[language].title}</h2>
          <p className="text-gray-500 text-xs">{t[language].subtitle}</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Add Staff Form */}
      {showAddForm && (
        <div className="mb-4 p-4 bg-purple-50 rounded-xl space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t[language].staffName}</label>
            <input
              type="text"
              value={newStaffName}
              onChange={(e) => setNewStaffName(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed'}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t[language].role}</label>
            <input
              type="text"
              value={newStaffRole}
              onChange={(e) => setNewStaffRole(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={language === 'ar' ? 'مدير المتجر' : 'Store Manager'}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={addStaff}
              className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              {t[language].addStaff}
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              {t[language].cancel}
            </button>
          </div>
        </div>
      )}

      {/* Staff List */}
      {staff.length === 0 ? (
        <div className="p-8 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <div className="text-sm text-gray-500 mb-1">{t[language].noStaff}</div>
          <p className="text-xs text-gray-400">{t[language].addFirstStaff}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {staff.map((member) => (
            <div key={member.id} className="p-4 bg-white rounded-xl border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-gray-800">{member.name}</div>
                  <div className="text-xs text-gray-500">{member.role}</div>
                </div>
                <button
                  onClick={() => deleteStaff(member.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-gray-600 mb-2">{t[language].permissions}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-xs text-gray-700">{t[language].viewOrders}</span>
                  <button
                    onClick={() => togglePermission(member.id, 'viewOrders')}
                    className={`relative w-9 h-4 rounded-full transition-colors ${
                      member.permissions.viewOrders ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${
                        member.permissions.viewOrders ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-xs text-gray-700">{t[language].viewEarnings}</span>
                  <button
                    onClick={() => togglePermission(member.id, 'viewEarnings')}
                    className={`relative w-9 h-4 rounded-full transition-colors ${
                      member.permissions.viewEarnings ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${
                        member.permissions.viewEarnings ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-xs text-gray-700">{t[language].editProducts}</span>
                  <button
                    onClick={() => togglePermission(member.id, 'editProducts')}
                    className={`relative w-9 h-4 rounded-full transition-colors ${
                      member.permissions.editProducts ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${
                        member.permissions.editProducts ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-xs text-gray-700">{t[language].inventoryAccess}</span>
                  <button
                    onClick={() => togglePermission(member.id, 'inventoryAccess')}
                    className={`relative w-9 h-4 rounded-full transition-colors ${
                      member.permissions.inventoryAccess ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${
                        member.permissions.inventoryAccess ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all"
        onClick={handleSave}
      >
        {t[language].save}
      </button>

      <SaveConfirmationModal
        isOpen={isSaveModalOpen}
        onConfirm={confirmSave}
        onCancel={() => setIsSaveModalOpen(false)}
        language={language}
        type="permissions"
      />
    </div>
  );
}