import { ChakraProvider, Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Redeem from './pages/redeem';
import Layout from './layout/layout';


export default function App() {
  return (
      <Box>
       
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="redeem" element={<Redeem />} />
          </Route>
        </Routes>
      </Box>
  );
  
}
