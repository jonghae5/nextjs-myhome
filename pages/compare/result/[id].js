import React from 'react';
import AppLayout from '../../../components/AppLayout';

const generateRandomString = () => Math.random().toString(36).slice(2);

const ID = () => {
  console.log(generateRandomString());
  return (
    <AppLayout>
      <div>결과물입니다.</div>
    </AppLayout>
  );
};

export default ID;
