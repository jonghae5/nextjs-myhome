import { number, object } from 'yup';

export const abilityBasicFormSchema = object().shape({
  yearMoney: number()
    .integer()
    .min(-0.1)
    .required('세후 연소득을 입력해주세요.'),
  savingRatioMoney: number()
    .min(-0.1)
    .required('저축율을 입력해주세요.(%)')
    .max(100),
  mortgageLoan: number()
    .min(-0.1)
    .required('주택담보대출 금리을 입력해주세요.(%)')
    .max(100),
});

export const abilityFormSchema = object().shape({
  stockMoney: number().integer().min(-0.1).required('주식을 입력해주세요.'),
  bitcoinMoney: number()
    .integer()
    .min(-0.1)
    .required('가상화폐를 입력해주세요.'),
  savingMoney: number()
    .integer()
    .min(-0.1)
    .required('저축금액을 입력해주세요.'),
  insuranceMoney: number()
    .integer()
    .min(-0.1)
    .required('보험해약금을 입력해주세요.'),
  severanceMoney: number()
    .integer()
    .min(-0.1)
    .required('퇴직금을 입력해주세요.'),
  etcMoney: number().integer().min(-0.1).required('기타자산을 입력해주세요.'),

  jeonDepositHome: number()
    .integer()
    .min(-0.1)
    .required('전월세보증금을 입력해주세요.'),
  jutaekPriceHome: number()
    .integer()
    .min(-0.1)
    .required('주택매매시세를 입력해주세요.'),

  jeonWolLoan: number()
    .integer()
    .min(-0.1)
    .required('전월보증대출을 입력해주세요.'),
  jutaekLoan: number()
    .integer()
    .min(-0.1)
    .required('주택담보대출을 입력해주세요.'),
  tenantLoan: number()
    .integer()
    .min(-0.1)
    .required('임차인보증금을 입력해주세요.'),
  creditLoan: number().integer().min(-0.1).required('신용대출을 입력해주세요.'),
  businessLoan: number()
    .integer()
    .min(-0.1)
    .required('사업자/회사복지대출을 입력해주세요.'),
  schoolLoan: number()
    .integer()
    .min(-0.1)
    .required('학자금대출을 입력해주세요.'),
  etcLoan: number().integer().min(-0.1).required('기타대출을 입력해주세요.'),
});
