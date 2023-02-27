import matplotlib.pyplot as plt
import os.path
import numpy as np

# Get the directory of this file
directory = os.path.dirname(os.path.abspath(__file__))
# Build an absolute filename from directory + filename
filename = os.path.join(directory, 'woman.jpg')
# Read the image data into an array
img = plt.imread(filename).copy()

# Create figure with 1 subplot
fig, ax = plt.subplots(1, 1)

height = len(img)
width = len(img[0])
for r in range(155):
    for c in range(width):
        if sum(img[r][c]) > 500:
            img[r][c] = [255, 0, 255]

for r in range(415, 470):
    for c in range(130, 165):
        if sum(img[r][c]) > 400:
            img[r][c] = [0, 255, 255]

# Show the image data in a subplot
ax.imshow(img, interpolation='none')
# Show the figure on the screen
plt.show()