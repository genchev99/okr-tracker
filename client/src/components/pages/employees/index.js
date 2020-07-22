import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import api from '../../../api';
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import NativeSelect from "@material-ui/core/NativeSelect";
import withStyles from "@material-ui/core/styles/withStyles";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmployees = async () => {
    await api.employees.get().then(({data}) => {
      setEmployees(data.employees);
    })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const loadDepartments = async () => {
    await api.departments.get().then(({data}) => {
      const dep = {};

      for (const {name} of data.departments) {
        dep[name] = name;
      }

      setDepartments(dep) ;
    }).catch(err => console.error(err));
  };

  useEffect(() => {
    loadDepartments().then(() => {
      fetchEmployees();
    }).catch(err => console.error(err));
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
          {title: 'Role', field: 'role', lookup: {root: 'Root', admin: 'Admin', 'teamLead': 'TeamLead', employee: 'Employee'}},
          {title: 'Department', field: 'department', lookup: { ...departments },},
        ]}
        data={employees}
        editable={{
          onRowAdd: async (newData) => {
            await api.employees.enroll(newData);
            fetchEmployees()
          },
          onRowUpdate: async (newData, oldData) => {
            await api.employees.update(oldData._id, newData);
            fetchEmployees();
          },
          onRowDelete: async (oldData) => {
            await api.employees.delete(oldData._id);
            fetchEmployees();
          }
        }}
      />
    </Container>
  );
};

export default Employees;
