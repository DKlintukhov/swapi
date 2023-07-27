import { CircularProgress, Pagination } from '@mui/material'
import { useGetPageQuery } from '../../store/swAPI/swAPI'
import { PeopleMenu } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Person } from '../../data-models';
import { RootState, root, selectPage, selectPerson } from '../../store';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export const HomePage = () => {
  const peoplePerPage = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNum = useSelector((state: RootState) => state[root.name].page);
  const { isLoading, isFetching, data: page, } = useGetPageQuery(pageNum);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    dispatch(selectPage(page));
  };

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
            defaultPage={pageNum}
            count={Math.ceil(page.total / peoplePerPage)}
            variant="outlined"
            shape='rounded'
            onChange={handlePageChange}
          />}
      </div>
    </div>
  )
}
