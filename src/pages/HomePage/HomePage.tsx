import { CircularProgress, Pagination } from '@mui/material'
import { useGetPageQuery } from '../../store/swAPI/swAPI'
import { ErrorMessage, PeopleMenu } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Person } from '../../data-models';
import { RootState, setPage, setPerson, addPeople, addCurrentPage } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './HomePage.css';

export function HomePage() {
  const peoplePerPage = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNum = useSelector(({ ui }: RootState) => ui.page);
  const { isLoading, isFetching, data: page, error } = useGetPageQuery(pageNum);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    if (page) {
      dispatch(addPeople(page.people));
      dispatch(addCurrentPage(page.people));
    }
  }, [page, dispatch]);

  const personSelectedHandl = (person: Person) => {
    dispatch(setPerson(person));
    navigate(`/info/${person.name}`);
  };

  const retryHandle = () => {
    window.location.reload();
  }

  return (
    <div className="home-page__container">
      {isLoading && <div className="home-page__section"><CircularProgress size="10rem" /></div>}
      <div className="home-page__section">
        {!isLoading && isFetching && !error && <CircularProgress size="7rem" />}
        {!isFetching && !error && <PeopleMenu onPersonSelect={personSelectedHandl} />}
        {!isFetching && error &&
          <div>
            <ErrorMessage onRetry={retryHandle} />
          </div>}
      </div>
      <div>
        {!isLoading && page && !error &&
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
