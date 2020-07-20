import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import api from '../../../api';
import Container from "@material-ui/core/Container";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDepartments = () => {
    api.departments.get().then(({data}) => {
      setDepartments(data.departments);
    })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchDepartments()
  }, []);

  return (
    <Container component="main" maxWidth="md" style={{'paddingTop': '30px'}}>
      <MaterialTable
        isLoading={isLoading}
        title="Departments"
        columns={[
          {title: 'Department name', field: 'name'},
          {title: 'Description', field: 'description'},
        ]}
        data={departments}
        editable={{
          onRowAdd: async (newData) => {
            console.log(newData);
            await api.departments.create(newData);
            fetchDepartments()
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

export default Departments;
