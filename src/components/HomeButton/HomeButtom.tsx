import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function HomeButton() {
  const navigate = useNavigate();

  const clickHandle = () => {
    navigate('/');
  }

  return (
    <Tooltip title="Navigate to home page">
      <IconButton color="primary" role="home-btn" onClick={clickHandle}>
        <HomeIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  )
}
