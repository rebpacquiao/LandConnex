interface User {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  accountType: string;
  residency: string;
  taxId: string;
  contaInfo: {
    country: string;
    states: string;
    city: string;
    address: string;
    zipCode: string;
  }[];
}

export default User;
