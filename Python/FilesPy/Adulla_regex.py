import re

# Read the text file
f = open("L10_mbox-short.txt", "r")

# Create an empty list to store the necessary lines
wanted_lines = []

# Loop through the text file and store the lines in the list
for line in f:
    line = line.rstrip()
    if re.search("^New Revision: \d+$", line):
        wanted_lines.append(line)

# Calculate the average of the numbers in the list
total = 0

for line in wanted_lines:
    line = line.split()
    total += int(line[2])

average = round(total / len(wanted_lines), 3)

# Display the average
print(f"The average of the numbers is {average}.")