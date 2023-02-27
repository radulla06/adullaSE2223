# Read and show an image
#import matplotlib
#matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import os.path
import numpy as np

# Read image data
# Get directory of the python script
directory = os.path.dirname(os.path.abspath(__file__))
# Build an absolute filename from directory + filename
filename = os.path.join(directory, 'Dolphins.jpg')
# Read the image data into an array
img = plt.imread(filename)

# Show the image data
# Create figure with 2 subplots
fig, ax = plt.subplots(1, 3)
# Show the image data in the first subplot
ax[0].imshow(img)
ax[1].imshow(img)
ax[2].imshow(img)
ax[0].set_xlim(145, 165)
ax[0].set_ylim(217, 200)
ax[1].set_xlim(130, 230)
ax[1].set_ylim(160, 50)
ax[2].set_xlim(365, 430)
ax[2].set_ylim(75, 25)
# ax[0].set_xlim(135, 165)
# ax[0].set_ylim(470, 420)
# ax[0].set_title('Image Title')
# ax[1].set_xlim(135, 165)
# ax[1].set_ylim(470, 420)
# ax[1].plot([111, 149, 211], [435, 440, 445], 'ro')
# ax[1].plot([111, 149, 211], [435, 440, 445], color='b', linestyle='--', linewidth=4)

# Show the figure on the screen
plt.show()