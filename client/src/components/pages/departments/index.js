import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import api from '../../../api';
import Container from "@material-ui/core/Container";
import FeaturedPost from "../../FeaturedPost";
import Grid from "@material-ui/core/Grid";

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
      <Grid style={{marginBottom: '20px'}} container spacing={4}>
        <FeaturedPost post={{
          title: 'Departments',
          date: 'eg: Development',
          description:
            'Specialized functional area within an organization or a division.',
          image: 'https://image.freepik.com/free-vector/abstract-realistic-technology-particle-background-design_23-2148433469.jpg',
          imageText: 'Departments',
          url: 'https://www.tutorialspoint.com/tourism_management/tourism_management_business_departments.htm'
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
