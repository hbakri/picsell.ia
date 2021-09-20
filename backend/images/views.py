from .serializers import ImageSerializer
from .models import Image
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import numpy as np
import cv2


def _grab_image(stream=None):
    # convert the image to a NumPy array and then read it into OpenCV format
    data = stream.read()
    image = np.asarray(bytearray(data), dtype="uint8")
    return cv2.imdecode(image, cv2.IMREAD_COLOR)

def compare_histogram(img1, img2):
    # Convert it to HSV
    img1_hsv = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)
    img2_hsv = cv2.cvtColor(img2, cv2.COLOR_BGR2RGB)
    
    # Calculate the histogram and normalize it
    hist_img1 = cv2.calcHist([img1_hsv], [0, 1, 2], None, [8, 8, 8], [0, 256, 0, 256, 0, 256])
    # hist_img1 = cv2.calcHist([img1_hsv], [0,1], None, [180,256], [0,180,0,256])
    cv2.normalize(hist_img1, hist_img1)
    # hist_img2 = cv2.calcHist([img2_hsv], [0,1], None, [180,256], [0,180,0,256])
    hist_img2 = cv2.calcHist([img2_hsv], [0, 1, 2], None, [8, 8, 8], [0, 256, 0, 256, 0, 256])
    cv2.normalize(hist_img2, hist_img2)
    
    # find the metric value
    return cv2.compareHist(hist_img1, hist_img2, cv2.HISTCMP_CORREL)

def match_template(img1, img2):
    return cv2.matchTemplate(img1, img2, cv2.TM_CCOEFF_NORMED)

class ImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Image.objects.all()
        serializer = ImageSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):

        error_indices = []
        
        uploaded_images = { index: _grab_image(stream=image) for index, image in request.data.items() }
        disk_images = [ _grab_image(stream=image.image) for image in Image.objects.all() ]

        for index, image in uploaded_images.items():

            # compare between all the uploaded images
            for index_bis, image_bis in uploaded_images.items():
                if index_bis != index:
                    print("upload img : ", compare_histogram(image, image_bis))
                    if compare_histogram(image, image_bis) > 0.9:
                        error_indices.append(index)

            # then compare with the images already on the disk
            for disk_image in disk_images:
                print("disk img : ", compare_histogram(image, disk_image))
                if compare_histogram(image, disk_image) > 0.9:
                    error_indices.append(index)

        # make our index error list containing unique values
        error_indices = list(set(error_indices))

        # save all uploaded images if there is no duplicate ones, neither in the uploaded ones or in the dataset
        if not error_indices:
            for index, image in request.data.items():
                image.seek(0)
                posts_serializer = ImageSerializer(data={ "title": image.name, "image": image })
                if posts_serializer.is_valid():
                    posts_serializer.save()
                else:
                    print('error', posts_serializer.errors)
                    return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        else:
            print(error_indices)
            return Response({"error_indices": error_indices})
