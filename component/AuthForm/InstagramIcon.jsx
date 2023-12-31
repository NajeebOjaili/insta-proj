import { Box } from '@chakra-ui/react';
import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import RotatingText from 'react-rotating-text';


const InstagramIcon = () => {
  const iconStyle = {
    fontSize: '50px', // حجم الأيقونة
    color: 'purple', // لون الأيقونة
  };

  return (
 <Box>
      <RotatingText items={['Instagram', '']} /> {/* يمكنك تغيير النص هنا */}
      <FaInstagram style={iconStyle} />
   </Box>
  );
};

export default InstagramIcon;