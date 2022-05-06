import React from 'react';
import AppLayout from '../../components/AppLayout';
import WriteForm from '../../components/WriteForm';
import { initialState } from '../../slices/compareSlice';
const BasicCompare = () => {
  return (
    <AppLayout>
      <WriteForm
        formName='compare'
        title='소득 지출 비교'
        initialValue={initialState.data}
      />
    </AppLayout>
  );
};

export default BasicCompare;
