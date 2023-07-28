import { Alert, CircularProgress, Pagination } from '@mui/material'
import { useGetPageQuery } from '../../store/swAPI/swAPI'
import { PeopleMenu } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Person } from '../../data-models';
import { RootState, root, setPage, setPerson, setPeople } from '../../store';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  const peoplePerPage = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector((state: RootState) => state[root.name].page);
  const { isLoading, isFetching, data: page, error } = useGetPageQuery(currentPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  const personSelectedHandler = (person: Person) => {
    dispatch(setPerson(person));
    dispatch(setPeople(page!.people));
    navigate(`/info/${person.name}`);
  };
  
  return (
    <div className="home-page__container">
      {isLoading && <div className="home-page__section"><CircularProgress size="10rem" /></div>}
      <div className="home-page__section">
        {!isLoading && isFetching && <CircularProgress size="7rem" />}
        {!isFetching && page && <PeopleMenu people={page.people} onPersonSelect={personSelectedHandler} />}
      </div>
      <div>
        {!isLoading && page &&
          <Pagination
            defaultPage={currentPage}
            count={Math.ceil(page.total / peoplePerPage)}
            variant="outlined"
            shape='rounded'
            onChange={handlePageChange}
          />}
      </div>
    </div>
  )
}
