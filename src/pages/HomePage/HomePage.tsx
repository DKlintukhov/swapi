import { CircularProgress, Pagination } from '@mui/material'
import { useGetPageQuery } from '../../store/swAPI/swAPI'
import { useState } from 'react';
import { PeopleMenu } from '../../components';
import './HomePage.css';

export const HomePage = () => {
  const [pageNum, setPage] = useState(1);
  const { isLoading, isFetching, data: page, } = useGetPageQuery(pageNum);
  const peoplePerPage = 10;
  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => setPage(page);

  return (
    <main className='container'>
      {isLoading && <section className='section'><CircularProgress size='10rem' /></section>}
      <section className='section'>
        {!isLoading && isFetching && <CircularProgress size='7rem' />}
        {!isFetching && page && <PeopleMenu people={page.people} />}
      </section>
      <section>
        {!isLoading && page && 
        <Pagination 
          count={Math.ceil(page.total / peoplePerPage)} 
          variant='outlined' 
          shape='rounded' 
          onChange={handleChange} 
        />}
      </section>
    </main>
  )
}
