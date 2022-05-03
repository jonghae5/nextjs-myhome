import React, { useCallback, useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';

import AbilityFormMoney from '../components/AbilityFormMoney';
import AbilityFormHome from '../components/AbilityFormHome';
import AbilityFormLoan from '../components/AbilityFormLoan';

import CheckoutForm from '../components/CheckoutForm';
function getStepContent(step) {
  switch (step) {
    case 0:
      return <AbilityFormMoney />;
    case 1:
      return <AbilityFormHome />;
    case 2:
      return <AbilityFormLoan />;
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
      />
    </AppLayout>
  );
};

export default Ability;
