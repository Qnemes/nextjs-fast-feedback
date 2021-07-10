import { Fragment } from 'react';
import { Box } from '@chakra-ui/react';

import Navbar from './Navbar';
import Footer from './Footer';

const MdxLayout = ({ children }) => (
  <Fragment>
    <Navbar />
    <Box maxW="650px" mx="auto" px={8} w="100%" wordBreak="break-word">
      {children}
    </Box>
    <Footer />
  </Fragment>
);

export default MdxLayout;
