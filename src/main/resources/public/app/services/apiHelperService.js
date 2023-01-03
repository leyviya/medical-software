
export function getStaffById(staffId, staffList){
    return staffList.find((st)=> st.id === staffId) || {};
}

export function getDepartmentById(deptId, deptList){
    return deptList.find((dt)=> dt.id === deptId) || {};
}

export function getPatientById(patientId, patientList){
    return patientList.find((pt)=> pt.id === patientId) || {};
}