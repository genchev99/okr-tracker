import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import api from '../../../api';
import Container from "@material-ui/core/Container";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmployees = () => {
    api.employees.get().then(({data}) => {
      setEmployees(data.employees);
    })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchEmployees()
  }, []);

  return (
    <Container component="main" maxWidth="md" style={{'paddingTop': '30px'}}>
      <MaterialTable
        isLoading={isLoading}
        title="Employees"
        columns={[
          {title: 'First name', field: 'firstName'},
          {title: 'Last name', field: 'lastName'},
          {title: 'Email', field: 'email'},
          {title: 'Role', field: 'role'},
          // { title: 'Status', field: 'status' },
          // { title: 'Activated', field: 'activated' },
        ]}
        data={employees}
        editable={{
          onRowAdd: async (newData) => {
            await api.employees.enroll(newData);
            fetchEmployees()
          },
          onRowUpdate: (newData, oldData) => {
            // new Promise((resolve) => {
            //   setTimeout(() => {
            //     resolve();
            //     if (oldData) {
            //       setState((prevState) => {
            //         const data = [...prevState.data];
            //         data[data.indexOf(oldData)] = newData;
            //         return { ...prevState, data };
            //       });
            //     }
            //   }, 600);
            // })
            console.log(newData, oldData);
          },
          onRowDelete: (oldData) => {
            console.log(oldData);
            // new Promise((resolve) => {
            //   setTimeout(() => {
            //     resolve();
            //     setState((prevState) => {
            //       const data = [...prevState.data];
            //       data.splice(data.indexOf(oldData), 1);
            //       return { ...prevState, data };
            //     });
            //   }, 600);
            // }),
          }
        }}
      />
    </Container>
  );
};

export default Employees;
