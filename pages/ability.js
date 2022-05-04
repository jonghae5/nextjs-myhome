import React from 'react';
import AppLayout from '../components/AppLayout';

import AbilityFormMoney from '../components/AbilityFormMoney';
import AbilityFormHome from '../components/AbilityFormHome';
import AbilityFormLoan from '../components/AbilityFormLoan';
import CheckoutForm from '../components/CheckoutForm';
import { initialState } from '../slices/abilitySlice';
function getStepContent(step) {
  switch (step) {
    case 0:
      return <AbilityFormMoney formName='ability' />;
    case 1:
      return <AbilityFormHome formName='ability' />;
    case 2:
      return <AbilityFormLoan formName='ability' />;
  }
}

const Ability = () => {
  const steps = ['Money', 'Home', 'Loan'];

  return (
    <AppLayout>
      <CheckoutForm
        title={`주택 구매 능력`}
        steps={steps}
        getStepContent={getStepContent}
        data='ability'
        initialValue={initialState}
      />
    </AppLayout>
  );
};

export default Ability;
