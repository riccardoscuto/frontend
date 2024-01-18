import { ChakraProvider, Box, Text } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Profile from './pages/profile';
import Redeem from './pages/redeem';
import Layout from './layout/layout';
import Review from './pages/review';
import Trade from './pages/trade';
import '@splidejs/splide/css/sea-green';


export default function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="redeem" element={<Redeem />} />
          <Route path="review" element={<Review />} />
          <Route path="trade" element={<Trade />} />
          <Route path="*" element={<Text> 404</Text> } />
        </Route>
      </Routes>
    </Box>
  );

}
