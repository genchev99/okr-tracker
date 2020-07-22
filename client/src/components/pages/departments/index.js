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
            await api.departments.create(newData);
            fetchDepartments();
          },
          onRowUpdate: async (newData, oldData) => {
            await api.departments.update(oldData._id, newData);
            fetchDepartments();
          },
          onRowDelete: async (oldData) => {
            await api.departments.delete(oldData._id);
            fetchDepartments();
          }
        }}
      />
    </Container>
  );
};

export default Departments;
