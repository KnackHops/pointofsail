import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { provideEmployees } from "../../../tempFolder/temp";
import DynamicListButton from "./DynamicListButton"

const EmployeesList = () => {
    const { establishment_id } = useParams();

    const [ employees, setEmployees ] = useState( [] );
    const [ employeesDisplay, setEmployeesDisplay ] = useState( null );

    const loadEmployees = () => {
        const _employees = provideEmployees( Number( establishment_id ) );

        setEmployees( _employees );
    }

    useEffect( () => {
        const _employeesDisplay = [];
        
        _employeesDisplay.push( { 
            label: <> <span> Employee ID </span> <span> Employee Name </span> <span> Role </span> </>,
            whichEl: "p"
         } )

        employees.forEach( emp => {
            _employeesDisplay.push( {
                label: <> <span> { emp?.employee_id } </span> <span> { emp?.employee_name } </span> <span> { emp?.role } </span> </>,
                whichEl: "p"
            } )
        } )

        setEmployeesDisplay( _employeesDisplay );
    }, [ employees ] )

    return (
        <DynamicListButton listClass={ "employee-list" } arrLoader={ loadEmployees } arrCheck={ employees?.length ? true : false } listHeader={ "Employees" } arrDisplay={ employeesDisplay } />
    )
}

export default EmployeesList;