# Name: Ranvith Adulla
# Date: 11/18/2022
# Description: This program will calculate a student's average grade.

numTests = int(input("Enter the number of tests: "))                    # Input the number of tests + convert to int
total = 0                                                               # Initialize total to 0
for i in range(numTests):# Loop numTests times
    score = float(input("Enter the score: "))                           # Input the score + convert to float
    total += score                                                      # Add the score to total
average = round(total / numTests)                                       # Calculate the average + round to 3 decimal places
print(average)                                                          # Print the result