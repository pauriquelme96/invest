const fs = require("fs");

/*

{
    date: Date,
}

*/
const main = () => {
  const csvData = JSON.parse(fs.readFileSync("./data.json", "utf8"));

  const processedData = [];

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  csvData
    .map((row) => {
      const date = new Date(`${months.indexOf(row["PAU"]) + 1}/1/2021`);
      const benefit = row["Beneficio"] || 0;
      const deposit = row["Ingresado"] || 0;
      const retire = row["Retirado"] || 0;
      const lastAccount = row["Capital ant."] || 0;
      const account = row["Capital post."];

      return {
        date,
        benefit,
        deposit,
        retire,
        lastAccount,
        account,
      };
    })
    .forEach((row) => {
      // FIRST DEPOSIT
      if (row.lastAccount === 0) {
        processedData.push({
          date: row.date,
          type: "deposit",
          amount: Math.round(row.deposit),
          account: Math.round(row.deposit),
        });
      } else {
        // COLLECT
        if (row.benefit) {
          processedData.push({
            date: row.date,
            type: "collect",
            amount: Math.round(row.benefit),
            account: Math.round(row.lastAccount + row.benefit),
          });
        }

        // RETIRE
        if (row.retire) {
          processedData.push({
            date: row.date,
            type: "retire",
            amount: -Math.round(row.retire),
            account: Math.round(row.lastAccount + row.benefit - row.retire),
          });
        }

        // DEPOSIT
        if (row.deposit) {
          processedData.push({
            date: row.date,
            type: "deposit",
            amount: Math.round(row.deposit),
            account: Math.round(
              row.lastAccount + row.benefit - row.retire + row.deposit
            ),
          });
        }
      }
    });

  fs.writeFileSync("./mock-data.json", JSON.stringify(processedData));
};

main();
