import csv
import os
import datetime
from multiprocessing import Pool
import uuid
import time
import json
import requests

Num_Done = 0

# Filepaths
path = os.path.abspath(os.path.dirname(__file__))
# relative path to the data folder
path += '/../data'



WORKERS = 20

# Do whatever you need to do with the row data in here
def row_handler(row):
    # since I used dictReader each row is now formatted in a dictionary so you can get 
    # values by the names at the top of the columns, that'll make it much simpler
        origin = row['ORIGIN']
        dest = row['DEST']

        # Zero out negative delay values
        delay = 0 if int(row["CRS_DEP_TIME"]) < 0 else row["CRS_DEP_TIME"]

        # Pre-process time
        time_raw = row["CRS_DEP_TIME"]
        while len(time_raw) < 4:
            time_raw = "0" + time_raw

        # Create naive date objects 
        date_obj = datetime.datetime.strptime(row["FL_DATE"] + "\t" + time_raw, "%Y-%m-%d\t%H%M")

        # Get weather data
        weather_origin = get_weather_data(origin, date_obj)

        weather_dest = get_weather_data(dest, date_obj)

        try:
            processedTime = weather_origin["processedTime"]
        except:
            print(json.dumps(weather_origin.json(), indent=4) + " " + str(origin) + str(date_obj))

        try:
            precip_type_orig = "N/A" if weather_origin["weather"]["precipIntensity"] == 0 else weather_origin["weather"]["precipType"]
            precip_type_dest = "N/A" if weather_dest["weather"]["precipIntensity"] == 0 else weather_dest["weather"]["precipType"]
        except:
            time.sleep(3)
            precip_type_orig = "N/A" if weather_origin["weather"]["precipIntensity"] == 0 else weather_origin["weather"]["precipType"]
            precip_type_dest = "N/A" if weather_dest["weather"]["precipIntensity"] == 0 else weather_dest["weather"]["precipType"]

        # Parse dst
        dst = 1 if weather_origin["processedTime"]["dst"] == "true" else 0

        #origin_bearing = "N/A" if weather_origin["weather"]["windSpeed"] == None or weather_origin["weather"]["windSpeed"] == 0 else weather_origin["weather"]["windBearing"]
        #dest_bearing = "N/A" if weather_origin["weather"]["windSpeed"] == None or weather_dest["weather"]["windSpeed"] == 0 else weather_dest["weather"]["windBearing"]


        return {'UTC_TIME':weather_origin["processedTime"]["time"], 
            'CARRIER':row["UNIQUE_CARRIER"], 
            'ORIGIN':origin, 
            'DEST':dest, 
            'DEP_DELAY':delay, 
            'CANCELLED':row['CANCELLED'],
            'DST':dst,
            "TEMP_ORIGIN":weather_origin["weather"]["temperature"], 
            "PRECIP_ORIGIN":weather_origin["weather"]["precipIntensity"], 
            "PRECIP_TYPE_ORIGIN":precip_type_orig,
            #"WIND_SPEED_ORIGIN":weather_origin["weather"]["windSpeed"], 
            #"WIND_BEARING_ORIGIN":origin_bearing, 
            #"WIND_SPEED_DEST":weather_dest["weather"]["windSpeed"], 
            #"WIND_BEARING_DEST":weather_dest, 
            "TEMP_DEST":weather_dest["weather"]["temperature"], 
            "PRECIP_DEST":weather_dest["weather"]["precipIntensity"],
            "PRECIP_TYPE_DEST":precip_type_dest
            }

def get_weather_data(iata, time):
    time = str(time)
    time = time[0:len(time) - 3]
    BASE_URL = "http://ec2-34-224-81-253.compute-1.amazonaws.com/"
    params = {'code':iata, 'time':time}

    res = requests.get(BASE_URL, params=params)
    #print(str(res.status_code) + " " + str(iata) + " " + str(time))
    
    return res.json()

    


if __name__ == "__main__":
    #for file in os.listdir(path):
        filename = os.path.join(path, "255932176_T_ONTIME_JAN_CONCISE.csv") #FIXME replace with 'file'

        with open("output.csv", mode="w+", newline='') as outfile:
            fieldnames = ["UTC_TIME", 
            "CARRIER", 
            "ORIGIN", 
            "DEST", 
            "DEP_DELAY", 
            "CANCELLED", 
            "DST", 
            "TEMP_ORIGIN", 
            "PRECIP_ORIGIN", 
            "PRECIP_TYPE_ORIGIN",
            #"WIND_SPEED_ORIGIN", 
            #"WIND_BEARING_ORIGIN", 
            #"WIND_SPEED_DEST", 
            #"WIND_BEARING_DEST", 
            "TEMP_DEST", 
            "PRECIP_DEST",
            "PRECIP_TYPE_DEST"]
            writer = csv.DictWriter(outfile, fieldnames)
            writer.writeheader()

            # Open files
            with open(filename, newline='') as csvfile: 
                reader = csv.DictReader(csvfile)

                pool = Pool(processes=WORKERS)

                writer.writerows(pool.map(row_handler, reader))
