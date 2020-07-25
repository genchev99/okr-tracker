import React, {useContext, useEffect, useState} from 'react';
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
import FeaturedPost from "../../FeaturedPost";
import Grid from "@material-ui/core/Grid";
import SnackbarContext from "../../../contexts/SnackbarContext";

const frontendAuthBase = 'http://localhost:3000/auth/sign-up';

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
  const {error, success, warn} = useContext(SnackbarContext);

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmployees = async () => {
    await api.employees.get().then(({data}) => {
      setEmployees(data.employees.map(employee => ({...employee, link: !employee.activated && `${frontendAuthBase}/${employee._id}` || 'activated'})));
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
      <Grid style={{marginBottom: '20px'}} container spacing={4}>
        <FeaturedPost post={{
          title: 'Employees',
          date: 'eg: Ivan',
          description:
            'An employee is a worker that gets paid an hourly wage or annual salary for a set job.',
          image: 'https://i.pinimg.com/736x/1b/af/67/1baf67d9c5836c18da89fff77b7348cf.jpg',
          imageText: 'Departments',
          url: 'https://www.thebalancesmb.com/what-is-the-definition-of-an-employee-398246'
        }}/>
        <FeaturedPost post={{
          title: 'Teams',
          date: 'eg: Sofia devs',
          description:
            'One of the many ways for a business to organize employees is in teams.',
          image: 'https://i.pinimg.com/736x/b8/9d/22/b89d221eaf478e368e9b205a30d5d263.jpg',
          imageText: 'Key results',
          url: 'https://study.com/academy/lesson/what-is-an-effective-team-in-organizations-characteristics-definition-qualities.html#:~:text=of%20effective%20teams.-,Effective%20Teams%20Defined,to%20achieve%20a%20common%20goal.&text=Work%20groups%20are%20mainly%20for,or%20her%20individual%20work%20goals'
        }}/>
      </Grid>

      <MaterialTable
        isLoading={isLoading}
        title="Employees"
        columns={[
          {title: 'First name', field: 'firstName'},
          {title: 'Last name', field: 'lastName'},
          {title: 'Email', field: 'email'},
          {title: 'Role', field: 'role', lookup: {root: 'Root', admin: 'Admin', 'teamLead': 'TeamLead', employee: 'Employee'}},
          {title: 'Department', field: 'department.name', lookup: { ...departments },},
          {title: 'Invite link', field: 'link', editable: 'never'},
        ]}
        data={employees}
        editable={{
          onRowAdd: async (newData) => {
            try {
              await api.employees.enroll(newData);

              success('Employee was successfully enrolled!');
            } catch (e) {
              error(e.toString());
            }

            fetchEmployees();
          },
          onRowUpdate: async (newData, oldData) => {
            try {
              await api.employees.update(oldData._id, newData);

              success('Employee was successfully updated!');
            } catch (e) {
              error(e.toString());
            }

            fetchEmployees();
          },
          onRowDelete: async (oldData) => {
            try {
              await api.employees.delete(oldData._id);

              success('Employee was successfully deleted!');
            } catch (e) {
              error(e.toString());
            }

            fetchEmployees();
          }
        }}
      />
    </Container>
  );
};

export default Employees;
