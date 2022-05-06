import { number, object } from 'yup';

export const abilityBasicFormSchema = object().shape({
  yearMoney: number().integer().min(-0.1).required('세후 연소득 is required'),
  savingRatioMoney: number().min(-0.1).required('저축율 is required').max(100),
  mortgageLoan: number()
    .min(-0.1)
    .required('주택담보대출 금리 is required')
    .max(100),
});

export const abilityFormSchema = object().shape({
  stockMoney: number().integer().min(-0.1).required('주식 is required'),
  bitcoinMoney: number().integer().min(-0.1).required('가상화폐 is required'),
  savingMoney: number().integer().min(-0.1).required('저축 is required'),
  insuranceMoney: number()
    .integer()
    .min(-0.1)
    .required('보험해약금 is required'),
  severanceMoney: number()
    .integer()
    .min(-0.1)
    .required('퇴직금정산 is required'),
  etcMoney: number().integer().min(-0.1).required('기타자산 is required'),

  jeonDepositHome: number()
    .integer()
    .min(-0.1)
    .required('전월세보증금 is required'),
  jutaekPriceHome: number()
    .integer()
    .min(-0.1)
    .required('주택매매시세 is required'),

  jeonWolLoan: number()
    .integer()
    .min(-0.1)
    .required('전월보증대출 is required'),
  jutaekLoan: number().integer().min(-0.1).required('주택담보대출 is required'),
  tenantLoan: number().integer().min(-0.1).required('임차인보증금 is required'),
  creditLoan: number().integer().min(-0.1).required('신용대출 is required'),
  businessLoan: number()
    .integer()
    .min(-0.1)
    .required('사업자/회사복지대출 is required'),
  schoolLoan: number().integer().min(-0.1).required('학자금대출 is required'),
  etcLoan: number().integer().min(-0.1).required('기타대출 is required'),
});
