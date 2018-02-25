import csv
import os
import datetime
from multiprocessing import Pool
import uuid
import time
import json
import requests

# Filepaths
path = os.path.abspath(os.path.dirname(__file__))
# relative path to the data folder
path += '/../data'



WORKERS = 10

# Do whatever you need to do with the row data in here
def row_handler(row):
    # since I used dictReader each row is now formatted in a dictionary so you can get 
    # values by the names at the top of the columns, that'll make it much simpler

    
        # Generate row UUID
        unique_id = uuid.uuid1()

        origin = row['ORIGIN']
        dest = row['DEST']

        # Zero out negative delay values
        delay = 0 if int(row["CRS_DEP_TIME"]) < 0 else row["CRS_DEP_TIME"]

        # Pre-process time
        time_raw = row["CRS_DEP_TIME"]
        while len(time_raw) < 4:
            time_raw = "0" + time_raw

        # Create naive date objects 
        date_obj = datetime.datetime.strptime(row["FL_DATE"] + "\t" + time_raw, "%m/%d/%Y\t%H%M")
        # FIXME: Localize date_obj

        # FIXME: Grab temperature

        return {'UUID':unique_id, 'UTC_TIME':date_obj, 'CARRIER':row["UNIQUE_CARRIER"], 'ORIGIN':origin, 'DEST':dest, 
            'DEP_DELAY':delay, 'CANCELLED':row['CANCELLED']}

def get_weather_data(iata, time):
    BASE_URL = "localhost:8080"
    params = {'code':iata, 'time':str(time)}

    req = requests.get(BASE_URL, params=params)

    return req.json()


if __name__ == "__main__":
    for file in os.listdir(path):
        filename = os.path.join(path, file)

        with open("output.csv", mode="w+", newline='') as outfile:
            fieldnames = ["UUID", "UTC_TIME", "CARRIER", "ORIGIN", "DEST", "DEP_DELAY", "CANCELLED", "DST", "TEMP_ORIGIN", "PRECIP_ORIGIN", 
            "WIND_SPEED_ORIGIN", "WIND_BEARING_ORIGIN", "WIND_SPEED_DEST", "WIND_BEARING_DEST", "TEMP_DEST", "PRECIP_DEST"]
            writer = csv.DictWriter(outfile, fieldnames)
            writer.writeheader()

            # Open files
            with open(filename, newline='') as csvfile: 
                reader = csv.DictReader(csvfile)

                pool = Pool(processes=WORKERS)

                writer.writerows(pool.map(row_handler, reader))