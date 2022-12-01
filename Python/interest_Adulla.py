# Name: Ranvith Adulla
# Date: 11/18/2022
# Description: This program will compute and display a compound interest report.

# Input the initial investment, number of years, and interest rate.
initialInvestment = float(input("Enter the initial investment: "))
numYears = int(input("Enter the number of years: "))
interestRate = int(input("Enter the interest rate: "))

# Find the total interest earned, compounded once per year, and print a table with the rsults.
interestRate = interestRate / 100
totalInterest = 0.0
yearlyInvestment = initialInvestment
print("{0:>4}{1:>18}{2:>10}{3:>16}".format("Year", "Starting Balance", "Interest", "Ending Balance"))

for i in range(numYears):
    interest = yearlyInvestment * interestRate
    endBalance = yearlyInvestment + interest
    print("{0:>4}{1:>18.2f}{2:>10.2f}{3:>16.2f}".format(i + 1, yearlyInvestment, interest, endBalance))
    yearlyInvestment = endBalance
    totalInterest += interest

# Print out the ending balance.
print("The ending balance is ${}".format(round(totalInterest + initialInvestment, 2)))

# Print out the total interest earned.
print("The total interest earned is ${}".format(round(totalInterest, 2)))