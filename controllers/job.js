exports.calcurateCostFor10Days = async (req, res) => {
    try {
      const hourRate = {
        projectLead: {
          Sun: 150,
          Mon: 100,
          Tue: 100,
          Wed: 100,
          Thu: 100,
          Fri: 100,
          Sat: 120,
        },
        employee: {
          Sun: 100,
          Mon: 40,
          Tue: 40,
          Wed: 40,
          Thu: 40,
          Fri: 40,
          Sat: 60,
        },
      };
  
      const workingHours = [
        {
          name: "Mr.A",
          position: "projectLead",
          hours: [8, 10, 8, 8, 8, 4, 0, 8, 8, 0]
        },
        {
          name: "Ms.B",
          position: "employee",
          hours: [4, 5, 4, 8, 8, 0, 10, 8, 8, 0],
        },
        {
          name: "Mr.C",
          position: "employee",
          hours: [4, 5, 4, 8, 8, 0, 10, 8, 8, 0],
        },
      ];
  
      const dayWork = [
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"
      ];
      let costAll = [];
      workingHours.forEach((item) => {
        let totalWages = 0;
        item.hours.forEach((hoursWorked, index) => {
          const day = dayWork[index];
          const moneyPerHour = hourRate[item.position][day];
  
          if (typeof moneyPerHour !== 'number' || typeof hoursWorked !== 'number') {
            console.log(`Invalid value found: moneyPerHour = ${moneyPerHour}, hoursWorked = ${hoursWorked}`);
          }
          const moneyPerDay = hoursWorked * moneyPerHour;
          if (!isNaN(moneyPerDay)) {
            totalWages += moneyPerDay;
          } else {
            console.log(`Invalid wage calculated: ${moneyPerDay}`);
          }
        });
  
        if (!isNaN(totalWages)) {
          costAll.push(totalWages); 
        } else {
          console.log(`Invalid totalWages for ${item.name}: ${totalWages}`);
        }
      });
  
      const totalCost = costAll.reduce((acc, current) => acc + current, 0); 
      console.log('totalCost', totalCost);
  
      return res.json({
        status: "200",
        results: [
          {
            name: "Mr.A",
            position: "Project Lead",
            cost: costAll[0],
          },
          {
            name: "Ms.B",
            position: "Employee",
            cost: costAll[1],
          },
          {
            name: "Mr.C",
            position: "Employee",
            cost: costAll[2],
          },
        ],
        total: totalCost,
        success: true,
      });
    } catch (err) {
      console.log(err.message);
      return res.json({ status: "500", message: err.message, success: false });
    }
  };
  