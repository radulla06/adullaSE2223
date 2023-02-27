import mask
import os
import PIL
import matplotlib.pyplot
import PIL.ImageDraw

# Cut a hole in the center of a PIL.Image
def cut_hole_in_image(original_image, hole_radius=0.15):
    # Original image must be a PIL.Image
    # Hole radius is a fraction of the image's shortest side
    # Returns a new PIL.Image with a hole in the center

    # Set the radius of the hole
    width, height = original_image.size
    radius = int(hole_radius * min(width, height)) # radius in pixels

    # Create a mask
    # Start with transparent mask
    hole_mask = PIL.Image.new('RGBA', (width, height), (127,0,127,0))
    drawing_layer = PIL.ImageDraw.Draw(hole_mask)

    # Overwrite the RGBA values with A=255.
    # The 127 for RGB values was used merely for visualizing the mask

    # Draw a filled circle of opaqueness
    drawing_layer.ellipse((width/2-radius, height/2-radius, width/2+radius, height/2+radius), fill=(0,127,127,255))
    # Apply the mask to the original image.
    result = PIL.Image.new('RGBA', original_image.size, (0,0,0,0))
    result.paste(original_image, (0,0), mask=hole_mask)
    return result


def alter_all_images(directory=None):
    # Use current directory if none specified
    if directory == None:
        directory = os.getcwd()
    # Create a new directory 'modified'
    new_directory = os.path.join(directory, 'altered')
    try:
        os.mkdir(new_directory)
    except OSError:
        pass    # if the directory already exists, proceed

    # Load all the images
    image_list, file_list = mask.get_images(directory)

    # Go through the images and save modified versions.
    # Alteration will be only showing a hole in the center of the image
    for i in range(len(image_list)):
        # Parse the filename
        filename, filetype = os.path.splitext(file_list[i])
        # Round the corners with default percent of radius
        new_image = cut_hole_in_image(image_list[i])
        # Save the altered image, suing PNG to retain transparency
        new_image_filename = os.path.join(new_directory, filename + '.png')
        new_image.save(new_image_filename)


def main():
    alter_all_images()

if __name__ == '__main__':
    main()