import React from 'react';
import AppLayout from '../components/AppLayout';
import CheckoutForm from '../components/CheckoutForm';

import CompareFormFirst from '../components/CompareFormFirst';
import CompareFormSecond from '../components/CompareFormSecond';
import CompareFormThird from '../components/CompareFormThird';
import { initialState } from '../slices/compareSlice';
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

export const initialValue = {
  compare: {
    homeFirst: '',
    necessityFirst: '',
    nurtureFirst: '',
    clothFirst: '',
    eatOutSecond: '',
    leisureSecond: '',
    pinMoneySecond: '',
    communicationThird: '',
    insuranceThird: '',
    gitfThird: '',
    savingThird: '',
  },
};

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
