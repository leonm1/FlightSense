async function getAirportLocation(code) {

    return new Promise((resolve, reject) => {
        fetch('https://airport-information.azurewebsites.net/api/azure-function?code=' + code).then(data => {
            resolve([latitude, longitude]);
        }).catch(err => {
            reject(err);
        });
    });
}