# Name: Ranvith Adulla
# Date: 11/18/2022
# Description: This program will calculate the mean and standard deviation of a list of values entered by the user.

def getInputs():
    # Create an empty list to store the values
    values = []
    
    # Input the first value
    value = input("Enter a value (type quit to quit): ")
    
    # Loop until the user presses enter
    while value != "quit":
        # Add the value to the list
        values.append(float(value))
        
        # Input the next value
        value = input("Enter a value (type quit to quit): ")
        
    return values

def xBar(values):
    # Set the total to 0 originally
    total = 0
    
    # Loop through the list
    for value in values:
        # Add the value to the total
        total += value
        
    # Calculate the mean
    mean = total / len(values)
    
    return mean

def stdDev(values):
    # Calculate the mean
    mean = xBar(values)
    
    # Set the total to 0 originally
    total = 0
    
    # Loop through the list
    for value in values:
        # Add the squared difference between the value and the mean to the total
        total += (value - mean) ** 2
        
    # Find the square root of the total divided by the number of values to get the standard deviation
    stDev = (total / len(values)) ** 0.5
    
    return stDev

def main():
    # Get the list of values
    values = getInputs()
    
    # Calculate the mean
    mean = xBar(values)
    
    # Calculate the standard deviation
    stDev = stdDev(values)
    
    # Print the mean and standard deviation, rounded to three decimal places
    print("The mean is {}.".format(round(mean, 3)))
    print("The standard deviation is {}.".format(round(stDev, 3)))

main()