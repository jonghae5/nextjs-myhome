import React from 'react';
import AppLayout from '../../components/AppLayout';
import CheckoutForm from '../../components/CheckoutForm';

import CompareFormFirst from '../../components/compare/CompareFormFirst';
import CompareFormSecond from '../../components/compare/CompareFormSecond';
import CompareFormThird from '../../components/compare/CompareFormThird';
import { initialState } from '../../slices/compareSlice';
function getStepContent(step) {
  switch (step) {
    case 0:
      return <CompareFormFirst formName='compare' />;
    case 1:
      return <CompareFormSecond formName='compare' />;
    case 2:
      return <CompareFormThird formName='compare' />;
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
        data='compare'
        initialValue={initialState}
      />
    </AppLayout>
  );
};

export default Compare;
