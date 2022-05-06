import React from 'react';
import AppLayout from '../../components/layout/AppLayout';

import AbilityFormMoney from '../../components/ability/AbilityFormMoney';
import AbilityFormHome from '../../components/ability/AbilityFormHome';
import AbilityFormLoan from '../../components/ability/AbilityFormLoan';
import CheckoutForm from '../../components/CheckoutForm';
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

  const initialData = {
    stockMoney: '',
    bitcoinMoney: '',
    savingMoney: '',
    insuranceMoney: '',
    severanceMoney: '',
    etcMoney: '',

    jeonDepositHome: '',
    jutaekPriceHome: '',

    jeonWolLoan: '',
    jutaekLoan: '',
    tenantLoan: '',
    creditLoan: '',
    businessLoan: '',
    schoolLoan: '',
    etcLoan: '',
  };

  return (
    <AppLayout>
      <CheckoutForm
        title={`주택 구매 능력`}
        steps={steps}
        getStepContent={getStepContent}
        data='ability'
        initialValue={initialData}
      />
    </AppLayout>
  );
};

export default Ability;
