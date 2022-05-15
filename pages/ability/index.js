import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import WriteForm from '../../components/WriteForm';
const BasicAbility = () => {
  const initialData = {
    yearMoney: '',
    savingRatioMoney: '',
    mortgageLoan: '',
  };
  return (
    <AppLayout>
      <WriteForm
        formName='ability'
        title='주택 구매 능력'
        initialValue={initialData}
      />
    </AppLayout>
  );
};

export default BasicAbility;
