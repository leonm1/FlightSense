import csv

filename = 'ORD_STATS.csv'

with open(filename, newline='') as csvfile:
    try:
        reader = csv.reader(csvfile, delimiter=',')
        for row in reader:
            airportcode = row.items()
            
    finally:
        reader.close()