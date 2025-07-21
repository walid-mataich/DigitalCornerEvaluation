export const transformToChartData = (data, type = 'generalTotalMonthlyAvis') => {
    const years = Object.keys(data[type]);
    const allMonths = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];

    const satisfactionData = {};
    const tresSatisfaitData = {};
    const peuSatisfaitData = {};
    const pasDuToutSatisfaitData = {};

    years.forEach(year => {
        satisfactionData[year] = [];
        tresSatisfaitData[year] = [];
        peuSatisfaitData[year] = [];
        pasDuToutSatisfaitData[year] = [];

        allMonths.forEach(month => {
            const monthData = data[type][year]?.[month] || {
                satisfaitNb: 0,
                tresSatisfaitNb: 0,
                peuSatisfaitNb: 0,
                pasDuToutSatisfaitNb: 0
            };

            satisfactionData[year].push(monthData.satisfaitNb);
            tresSatisfaitData[year].push(monthData.tresSatisfaitNb);
            peuSatisfaitData[year].push(monthData.peuSatisfaitNb);
            pasDuToutSatisfaitData[year].push(monthData.pasDuToutSatisfaitNb);
        });
    });

    return {
        months: allMonths,
        satisfactionData,
        tresSatisfaitData,
        peuSatisfaitData,
        pasDuToutSatisfaitData
    };
};