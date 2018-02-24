import csv
import os
import datetime

# Filepaths
path = os.path.abspath(os.path.dirname(__file__))


for file in os.listdir(path):
    filename = os.path.join(path, file)

    # Open files
    with open(filename, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        origin = ""

        # Process and parse data
        for row in reader:
            if row[0] != "YEAR":
                # Extract origin airport IATA Code
                origin = row[10]
                airline = row[5]
                timeZone = None

                # Parse date into int
                year = int(row[0])
                day = int(row[2])
                month = int(row[1])

                # Process XXXX time to XX:XX time
                CRSDep = row[13]
                while len(CRSDep) < 4:
                    CRSDep = "0" + CRSDep
                delay = row[15]

                # Parse time from CSV
                schHour,schMin = CRSDep.split(':')
                actHour,actMin = row[6].split(':')

                # Parse into int
                schHour = int(schHour)
                schMin = int(schMin)
                wheelsOffHour = int(wheelsOffHour)
                wheelsOffMin = int(wheelsOffMin)

                # Parse date and scheduledTime into datetime object
                scheduledTime = datetime.datetime(year, month, day, schHour, schMin, 0, 0, timeZone).timestamp()
                actualTime = datetime.datetime(year, month, day, actHour, actMin, 0, 0, timeZone).timestamp()

                predictedElapsed = row[7]
                actualElapsed = row[8]

                # timedelta obj from datetime module
                totalDelay = actualTime - scheduledTime


                delayCarrier = row[12]
                delayWeather = row[13]
                delayNAS = row[14]
                delaySecurity = row[15]
                delayLateCraft = row[16]