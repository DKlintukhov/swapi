import { CircularProgress, Pagination } from '@mui/material'
import { useGetPageQuery } from '../../store/swAPI/swAPI'
import { useState } from 'react';
import { PeopleMenu } from '../../components';
import { useDispatch } from 'react-redux';
import { Person } from '../../data-models';
import { selectPerson } from '../../store';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export const HomePage = () => {
  const peoplePerPage = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNum, setPage] = useState(1);
  const { isLoading, isFetching, data: page, } = useGetPageQuery(pageNum);
  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => setPage(page);
  const personSelectedHandler = (person: Person) => {
    dispatch(selectPerson(person));
    navigate(`/info/${person.name}`);
  };

  return (
    <div className='container'>
      {isLoading && <div className='section'><CircularProgress size="10rem" /></div>}
      <div className="section">
        {!isLoading && isFetching && <CircularProgress size="7rem" />}
        {!isFetching && page && <PeopleMenu people={page.people} onPersonSelect={personSelectedHandler} />}
      </div>
      <div>
        {!isLoading && page &&
          <Pagination
            count={Math.ceil(page.total / peoplePerPage)}
            variant="outlined"
            shape='rounded'
            onChange={handleChange}
          />}
      </div>
    </div>
  )
}
