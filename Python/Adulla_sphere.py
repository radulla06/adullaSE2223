"""
Name: Ranvith Adulla
Date: 11/18/2022

File: Adulla_sphere.py

Purpose: This program will calculate the diameter, circumference, surface area, and volume of a sphere.
"""

import math

# Input the radius of the sphere.
radius = float(input("Enter the radius of the sphere: "))

# Calculate the diameter, circumference, surface area, and volume of the sphere.
diameter = 2 * radius
circumference = 2 * math.pi * radius
surfaceArea = 4 * math.pi * radius ** 2
volume = (4 / 3) * math.pi * radius ** 3

# Print the results, rounded to two decimal places.
print("The diameter of the sphere is {}.".format(round(diameter, 2)))
print("The circumference of the sphere is {}.".format(round(circumference, 2)))
print("The surface area of the sphere is {}.".format(round(surfaceArea, 2)))
print("The volume of the sphere is {}.".format(round(volume, 2)))