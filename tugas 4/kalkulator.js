//Dicky Ade Mahendra
export const hitung = (a, b, operator) => {
  switch (operator) {
    case '+':
    case 'tambah':
      return a + b;
    case '-':
    case 'kurang':
      return a - b;
    case '*':
    case 'kali':
      return a * b;
    case '/':
    case 'bagi':
      return b === 0 ? 'Error: Pembagian dengan nol' : a / b;
    case '%':
    case 'modulus':
      return a % b;
    case '**':
    case 'pangkat':
      return a ** b;
    default:
      return 'Operator tidak dikenal';
  }
};