# Names: Ranvith Adulla, Ayush Bobra
# Date: 12/07/2022
# Description: Regex Partner Quiz

# Import the re library
import re

# Read the text file
f = open("mbox-short_quiz.txt", "r")

# Create a list to store the data
ip_addresses = []

# Loop through the file and store the IP addresses in the list
for line in f:
    line = line.rstrip()
    ip = re.findall('\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]', line)
    if len(ip) > 0:
        ip_addresses.append(ip[0])

# Sort the list
ip_addresses.sort()

# Create an empty dictionary to store unique IP addresses and their counts
ip_dict = {}

# Loop through the list and add them to the dictionary
for i in ip_addresses:
    # Check if the IP address is already in the dictionary
    if i not in list(ip_dict.keys()):
        ip_dict[i] = 1          # If the IP address is not in the dictionary, give it a starting value of 1
    else:
        ip_dict[i] += 1         # If the IP address is already in the dictionary, add 1 to its count

# Create a table with rows for each IP address and its count
print("{:<20} {:<20}".format("IP Address", "Count"))
for i in ip_dict:
    print("{:<20} {:<20}".format(i, ip_dict[i]))

# Find the most common IP address
number_occurrences = 0
most_common_ip = ""

for i in ip_dict:
    if ip_dict[i] > number_occurrences:
        number_occurrences = ip_dict[i]
        most_common_ip = i

print(f"The IP address that occurs the most is: {most_common_ip}, which occurred {number_occurrences} times.")

# Count the total number of IP addresses
sum = 0

for i in ip_dict.values():
    sum += i

print(f"The server was contacted a total of {sum} times.")