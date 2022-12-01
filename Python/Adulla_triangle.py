# Name: Ranvith Adulla
# Date: 11/18/2022
# Description: This program will determine if 3 given side lenghts can form a triangle, and will classify the triangle as equilateral, isosceles, or scalene.

# Input the side lengths.
side1 = float(input("Enter the length of side 1: "))
side2 = float(input("Enter the length of side 2: "))
side3 = float(input("Enter the length of side 3: "))

# Determine if the side lengths can form a triangle.
if side1 + side2 > side3 and side1 + side3 > side2 and side2 + side3 > side1:
    print("The side lengths can form a triangle.")
    
    # Determine if the triangle is equilateral, isosceles, or scalene.
    if side1 == side2 == side3:
        print("The triangle is equilateral.")
    elif side1 == side2 or side1 == side3 or side2 == side3:
        print("The triangle is isosceles.")
    else:
        print("The triangle is scalene.")