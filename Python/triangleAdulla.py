# Name: Ranvith Adulla
# Date: 11/18/2022
# Description: This program will calculate the area of a triangle.

base = float(input("Enter the base of the triangle: "))             # Input the triangle's base + convert to float
height = float(input("Enter the height of the triangle: "))         # Input the triangle's height + convert to float
area = round(0.5 * base * height, 3)                                # Calculate the area of the triangle + round to 3 decimal places
print(area)                                                         # Print the result