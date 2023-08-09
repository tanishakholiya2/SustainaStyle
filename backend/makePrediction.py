# make a prediction for a new image.
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.models import load_model
from rembg import remove
from PIL import Image
from PIL import ImageEnhance

#REQUIREMENTS FOR IMAGE:
#image must be turned white, and placed onto 28px by 28x black square

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
def edit_image(filename):
	img = remove(Image.open(filename))
	new_image = img.resize((28,28))
	new_image = new_image.convert('L')
	new_image.save(filename)
	new_image.show()
	return new_image

# load an image and predict the class
def run_example():
 # load the image
 img = edit_image('sample_image.png')
 img = load_image('sample_image.png')
 # load model
 model = load_model('final_model.h5')
 # predict the class
 result = model.predict(img)
 print(result[0].argmax())
	

# entry point, run the example
run_example()