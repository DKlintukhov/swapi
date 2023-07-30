import { render, screen, fireEvent } from '@testing-library/react';
import { FilmForm } from './FilmForm';
import { filmMock } from '../../data-models/Film.test';
import { act } from 'react-dom/test-utils';

describe('FilmForm', () => {
  const onSubmit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    render(<FilmForm data={filmMock} onSubmit={onSubmit} onDelete={mockOnDelete} />);
  });

  it('renders form fields with correct default values', () => {
    const titleField = screen.getByLabelText('Title:');
    const episodeField = screen.getByLabelText('Episode:');
    const openingCrawlField = screen.getByLabelText('Opening Crawl:');
    const directorField = screen.getByLabelText('Director:');
    const producerField = screen.getByLabelText('Producer:');
    const releaseDateField = screen.getByLabelText('Release Date:');

    expect(titleField).toHaveValue(filmMock.title);
    expect(episodeField).toHaveValue(filmMock.episodeId);
    expect(openingCrawlField).toHaveValue(filmMock.openingCrawl);
    expect(directorField).toHaveValue(filmMock.director);
    expect(producerField).toHaveValue(filmMock.producer);
    expect(releaseDateField).toHaveValue(filmMock.releaseDate);
  });

  it('calls onSubmit with updated film data on form submission', async () => {
    const titleField = screen.getByLabelText('Title:');
    const episodeField = screen.getByLabelText('Episode:');
    const openingCrawlField = screen.getByLabelText('Opening Crawl:');
    const directorField = screen.getByLabelText('Director:');
    const producerField = screen.getByLabelText('Producer:');
    const releaseDateField = screen.getByLabelText('Release Date:');

    await act(() => {
      fireEvent.change(titleField, { target: { value: 'Updated Title' } });
      fireEvent.change(episodeField, { target: { value: '5' } });
      fireEvent.change(openingCrawlField, { target: { value: 'Updated Opening Crawl' } });
      fireEvent.change(directorField, { target: { value: 'Updated Director' } });
      fireEvent.change(producerField, { target: { value: 'Updated Producer' } });
      fireEvent.change(releaseDateField, { target: { value: '2022-01-01' } });
      fireEvent.submit(screen.getByRole('submit'));
    });

    setTimeout(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        ...filmMock,
        title: 'Updated Title',
        episodeId: 5,
        openingCrawl: 'Updated Opening Crawl',
        director: 'Updated Director',
        producer: 'Updated Producer',
        releaseDate: '2022-01-01',
      });
    })
  });
});
