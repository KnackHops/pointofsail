import DynamicListWrapper from "./DynamicListWrapper"

const EmployeesList = () => {  
    return (
        <DynamicListWrapper listClass={ "employee-list" } arrLoader={ () => "" } arrCheck={ false } listHeader={ "Employees" } arrDisplay={ [] } />
    )
}

export default EmployeesList;