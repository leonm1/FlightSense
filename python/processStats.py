import csv
import os
import datetime
from multiprocessing import Pool
import uuid

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

    # ex: you can just address data by their id's
    date_obj = datetime.datetime.strptime(row["FL_DATE"], "%m/%d/%Y")
    crs_time_obj = datetime.datetime.combine(date_obj, datetime.datetime.strptime(row["CRS_DEP_TIME"], "%H%M"))

    


if __name__ == "__main__":
    for file in os.listdir(path):
        filename = os.path.join(path, file)

        # Open files
        with open(filename, newline='') as csvfile:
            reader = csv.DictReader(csvfile)

            pool = Pool(processes=WORKERS)

            pool.map(row_handler, reader)