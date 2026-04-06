'use client';

import React from 'react';
import AestheticROI_Calculator from './AestheticROI_Calculator';

interface ClientCalculatorWrapperProps {
  keyword: string;
}

const ClientCalculatorWrapper: React.FC<ClientCalculatorWrapperProps> = ({ keyword }) => {
  return (
    <AestheticROI_Calculator keyword={keyword} />
  );
};

export default ClientCalculatorWrapper;