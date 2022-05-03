import CompareFormFirst from '../components/CompareFormFirst';
import CompareFormSecond from '../components/CompareFormSecond';
import CompareFormThird from '../components/CompareFormThird';

import React, { useCallback, useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';

import CheckoutForm from '../components/CheckoutForm';
function getStepContent(step) {
  switch (step) {
    case 0:
      return <CompareFormFirst />;
    case 1:
      return <CompareFormSecond />;
    case 2:
      return <CompareFormThird />;
  }
}

const Compare = () => {
  const steps = ['First', 'Second', 'Third'];

  return (
    <AppLayout>
      <CheckoutForm
        title={`소득 지출 비교`}
        steps={steps}
        getStepContent={getStepContent}
      />
    </AppLayout>
  );
};

export default Compare;
