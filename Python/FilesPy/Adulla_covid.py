# Read the text file
f = open("covid19_txt.txt", "r")

# Create two lists to store the data
states = []
cases = []

# Loop through the text file and store the data in the lists
for line in f:
    line = line.split(',')
    states.append(line[0].strip())
    cases.append(line[1].strip())

# Display the data in a table
print("{:<12}{:<12}".format("State", "Cases"))
for i in range(len(states)):
    if i == 0:
        pass
    else:
        print("{:<12}{:<12}".format(states[i], cases[i]))

# Calculate the average cases per state, rounded down
totalCases = 0

for i in range(len(cases)):
    if i == 0:
        pass
    else:
        totalCases += int(cases[i])

average = totalCases / (len(cases) - 1)

# Display the average cases per state
print(f"The average number of cases per state is {round(average)}.")