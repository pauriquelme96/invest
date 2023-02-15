const balance = [
  {
    date: '2021-03-31T22:00:00.000Z',
    type: 'deposit',
    amount: 14000,
    account: 14000,
  },
  {
    date: '2021-03-31T22:00:00.000Z',
    type: 'receipt',
    account: 14000,
  },
  {
    date: '2021-04-30T22:00:00.000Z',
    type: 'collect',
    amount: 2100,
    account: 16100,
  },
  {
    date: '2021-04-30T22:00:00.000Z',
    type: 'receipt',
    account: 16100,
  },
  {
    date: '2021-05-31T22:00:00.000Z',
    type: 'collect',
    amount: 2415,
    account: 18515,
  },
  {
    date: '2021-05-31T22:00:00.000Z',
    type: 'receipt',
    account: 18515,
  },
  {
    date: '2021-06-30T22:00:00.000Z',
    type: 'collect',
    amount: 2777,
    account: 21292,
  },
  {
    date: '2021-06-30T22:00:00.000Z',
    type: 'receipt',
    account: 21292,
  },
  {
    date: '2021-07-31T22:00:00.000Z',
    type: 'collect',
    amount: 3194,
    account: 24486,
  },

  {
    date: '2021-07-31T22:00:00.000Z',
    type: 'retire',
    amount: -13891,
    account: 10595,
  },
  {
    date: '2021-07-31T22:00:00.000Z',
    type: 'receipt',
    account: 10595,
  },
  {
    date: '2021-08-31T22:00:00.000Z',
    type: 'collect',
    amount: 1589,
    account: 12184,
  },
  {
    date: '2021-08-31T22:00:00.000Z',
    type: 'deposit',
    amount: 2000,
    account: 14184,
  },
  {
    date: '2021-08-31T22:00:00.000Z',
    type: 'receipt',
    account: 14184,
  },
  {
    date: '2021-09-30T22:00:00.000Z',
    type: 'collect',
    amount: 2128,
    account: 16312,
  },
  {
    date: '2021-09-30T22:00:00.000Z',
    type: 'deposit',
    amount: 2000,
    account: 18312,
  },
  {
    date: '2021-09-30T22:00:00.000Z',
    type: 'receipt',
    account: 18312,
  },
  {
    date: '2021-10-31T23:00:00.000Z',
    type: 'collect',
    amount: 2747,
    account: 21059,
  },
  {
    date: '2021-10-31T23:00:00.000Z',
    type: 'retire',
    amount: -3000,
    account: 18059,
  },
  {
    date: '2021-10-31T23:00:00.000Z',
    type: 'deposit',
    amount: 2000,
    account: 20059,
  },
  {
    date: '2021-10-31T23:00:00.000Z',
    type: 'receipt',
    account: 20059,
  },
  /*{
    date: '2021-11-30T23:00:00.000Z',
    type: 'collect',
    amount: 3009,
    account: 23068,
  },
  {
    date: '2021-11-30T23:00:00.000Z',
    type: 'retire',
    amount: -3000,
    account: 20068,
  },
  {
    date: '2021-11-30T23:00:00.000Z',
    type: 'deposit',
    amount: 2000,
    account: 22068,
  },
  {
    date: '2021-11-30T23:00:00.000Z',
    type: 'receipt',
  },*/
];

const notifications: any[] = [
  {
    date: '2021-03-31T22:00:00.000Z',
    type: 'account-realized',
    status: 'process',
    read: true,
    body: 'Tu cuenta se está verificando, este proceso puede durar de 2 a 3 días hábiles',
  },
  {
    date: '2021-03-31T22:00:00.000Z',
    status: 'success',
    type: 'account-verified',
    read: true,
    body: 'Cuenta verificada! Bienvenido a Invest capital',
  },
];

balance.forEach((balanceRow, i) => {
  const readNumber = 18;
  if (balanceRow.type === 'receipt') {
    notifications.push({
      date: balanceRow.date,
      status: 'info',
      type: 'receipt',
      read: i < readNumber,
      body: 'Recibo de ' + balanceRow.date + ' listo para firmar y descargar',
    });
  }

  if (balanceRow.type === 'retire') {
    notifications.push({
      date: balanceRow.date,
      status: 'info',
      type: 'retire',
      read: i < readNumber,
      amount: balanceRow.amount,
      body: 'Se han retirado ' + balanceRow.amount + ' de tu capital dispoible',
    });
  }

  if (balanceRow.type === 'deposit') {
    notifications.push({
      date: balanceRow.date,
      type: 'deposit-realized',
      read: i < readNumber,
      status: 'process',
      amount: balanceRow.amount,
      body:
        'El ingreso de ' +
        balanceRow.amount +
        ' a tu capital dispoible está en curso',
    });

    notifications.push({
      date: balanceRow.date,
      status: 'success',
      type: 'deposit-verified',
      read: i < readNumber,
      amount: balanceRow.amount,
      body: 'Se han ingresado ' + balanceRow.amount + ' a tu capital dispoible',
    });
  }
});

const userData = {
  version: 1,
  fullName: 'Pablo José Riquelme Catalina',
  account: 20059,
  pay: 0,
  notifications,
  balance,
};

export const initMockData = (version: number) => {
  let mockData = JSON.parse(localStorage.getItem('mock') || '{}');

  if (mockData.version !== version) {
    localStorage.setItem('mock', JSON.stringify(userData));
    mockData = { ...userData };
  }

  return mockData;
};
