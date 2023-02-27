import matplotlib.pyplot as plt
import numpy as np

# PIL is no longer maintained -- it has been replaced with Pillow
# To maintain backwards compatibility, "PIL" name is used for imports
import PIL         

def make_mask(rows, columns, stripe_width):
    '''An example mask generator
    Makes slanted stripes of width stripe_width
    image
    returns an ndarray of an RGBA image rows by columns
    '''
    
    img = PIL.Image.new('RGBA', (columns, rows))
    image = np.array(img)
    for row in range(rows):
        for column in range(columns):
            if (column-row) // stripe_width % 3 == 0:
                image[row][column] = [0, 255, 0, 184] # green, alpha=0
            elif (column-row) // stripe_width % 3 == 1:
                image[row][column] = [255, 255, 0, 255] # yellow, alpha=255
            else:
                image[row][column] = [78, 133, 223, 148]
    return image
    
if __name__ == "__main__":
    image = make_mask(100,100,20)
    
    fig, ax = plt.subplots(1, 1)
    ax.imshow(image)
    plt.show()            
                       
              
