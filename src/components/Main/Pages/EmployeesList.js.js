import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnyList from "../../../non-hooks/AnyList";
import DynamicOpener from "../../../non-hooks/DynamicOpener";
import { provideEmployees } from "../../../tempFolder/temp";

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
        <DynamicOpener dynamicClass="employee-list" loadHandler={ loadEmployees } btnLabel={ "Employees" }>
            <AnyList arrList={ employeesDisplay } listClass={ "employee-list" } />
        </DynamicOpener>
    )
}

export default EmployeesList;