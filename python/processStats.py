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
            if len(row) == 2 and row[0].startswith("Origin"):
                # Extract origin airport IATA Code
                origin = row[1].split("(")[0:2]
            elif len(row) > 1 and len(row[0]) == 2:
                airline = row[0]
                timeZone = None

                # Parse date
                month,day,year = row[1].split('/')
                # Parse into int
                year = int(year)
                day = int(day)
                month = int(month)

                if year < 50:
                    year += 2000
                elif year < 100:
                    year += 1900

                # Parse time from CSV
                schHour,schMin = row[5].split(':')
                actHour,actMin = row[6].split(':')
                wheelsOffHour,wheelsOffMin = row[10].split(':')


                # Parse into int
                schHour = int(schHour)
                schMin = int(schMin)
                actHour = int(actHour)
                actMin = int(actMin)
                wheelsOffHour = int(wheelsOffHour)
                wheelsOffMin = int(wheelsOffMin)

                # Parse date and scheduledTime into datetime object
                scheduledTime = datetime.datetime(year, month, day, schHour, schMin, 0, 0, timeZone).timestamp()
                actualTime = datetime.datetime(year, month, day, actHour, actMin, 0, 0, timeZone).timestamp()
                wheelsOffTime = datetime.datetime(year, month, day, wheelsOffHour, wheelsOffMin, 0, 0, timeZone).timestamp()

                predictedElapsed = row[7]
                actualElapsed = row[8]

                # timedelta obj from datetime module
                totalDelay = actualTime - scheduledTime

                
                delayCarrier = row[12]
                delayWeather = row[13]
                delayNAS = row[14]
                delaySecurity = row[15]
                delayLateCraft = row[16]