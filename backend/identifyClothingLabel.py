from PIL import Image
from scipy.spatial import KDTree
from webcolors import (
    CSS3_HEX_TO_NAMES,
    hex_to_rgb,
)
from rembg import remove
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.models import load_model
import cv2, numpy as np
from sklearn.cluster import KMeans

# load and prepare the image
def load_image(filename):
	# load the image
	img = load_img(filename, color_mode = "grayscale", target_size=(28, 28))
	# convert to array
	img = img_to_array(img)
	# reshape into a single sample with 1 channel
	img = img.reshape(1, 28, 28, 1)
	# prepare pixel data
	img = img.astype('float32')
	img = img / 255.0
	return img

# edit the image to be white and on 28px by 28px black square
def edit_image_grayscale(img, filename):
	new_image = img.resize((28,28))
	new_image = new_image.convert('L')
	new_image.save(filename)
	return new_image

# predict the class
def predictClass(img):
 # load model
 model = load_model('final_model.h5')
 # predict the class
 result = model.predict(img)
 index = result[0].argmax()
 clothing = "ankle boot"
 if(index == 0):
    clothing = "t-shirt"
 elif(index == 1):
      clothing = "pants"
 elif(index == 2):
      clothing = "pullover"
 elif(index == 3):
      clothing = "dress"
 elif(index == 4):
      clothing = "jacket"
 elif(index == 5):
      clothing = "sandal"
 elif(index == 6):
      clothing = "shirt"
 elif(index == 7):
      clothing = "shoe"
 elif(index == 8):
      clothing = "bag"
 return clothing

color_key = {"darkgray": "gray", "black":"black","gray": "gray", "darkslategray": "gray", "slategray": "gray", "whitesmoke": "gray","silver": "gray", "gainsboro": "gray", "linen": "gray"}

def convert_rgb_to_names(rgb_tuple):
    # a dictionary of all the hex and their respective names in css3
    css3_db = CSS3_HEX_TO_NAMES
    print(css3_db)
    names = []
    rgb_values = []
    for color_hex, color_name in css3_db.items():
        names.append(color_name)
        rgb_values.append(hex_to_rgb(color_hex))
    
    kdt_db = KDTree(rgb_values)
    distance, index = kdt_db.query(rgb_tuple)
    return f'{color_key[names[index]]}'
 

# get dominant rgb

def visualize_colors(cluster, centroids):
    # Get the number of different clusters, create histogram, and normalize
    labels = np.arange(0, len(np.unique(cluster.labels_)) + 1)
    (hist, _) = np.histogram(cluster.labels_, bins = labels)
    hist = hist.astype("float")
    hist /= hist.sum()

    # Create frequency rect and iterate through each cluster's color and percentage
    rect = np.zeros((50, 300, 3), dtype=np.uint8)
    colors = sorted([(percent, color) for (percent, color) in zip(hist, centroids)])
    colors.sort()
    colors.pop()
    color = colors.pop()
    return color[1]

def getLabel(fileName):
     # Load image and convert to a list of pixels
     image = cv2.imread(fileName)
     image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
     reshape = image.reshape((image.shape[0] * image.shape[1], 3))

     # Find and display most dominant colors
     cluster = KMeans(n_clusters=5).fit(reshape)

     rgb = visualize_colors(cluster, cluster.cluster_centers_)

     common_color = convert_rgb_to_names(rgb)

     # Read Image
     img = Image.open(fileName)

     # Remove background
     img = remove(img)

     # Prepare image for model

     img = edit_image_grayscale(img, fileName)

     img = load_image(fileName)

     # Classify clothing item

     clothingName = predictClass(img)

     clothingLabel = common_color + " " + clothingName
     
     return clothingLabel
 


