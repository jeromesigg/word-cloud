from flask import Flask, request, jsonify, make_response, send_file
from flask_cors import CORS  
from os import environ, path
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import os

from wordcloud import WordCloud, STOPWORDS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes



# create a test route
@app.route('/test', methods=['GET'])
def test():
  return jsonify({'message': 'The server is running'})
  
@app.route('/download', methods=['POST'])
def downloadFile ():
  try:
    data = request.get_json()
    text_input = data['text']
  # get data directory (using getcwd() is needed to support running example in generated IPython notebook)
    file = request.files
    d = path.dirname(__file__) if "__file__" in locals() else os.getcwd()

    # Read the whole text.
    # text_file = open(file).read()

    # read the mask image
    # taken from
    # http://www.stencilry.org/stencils/movies/alice%20in%20wonderland/255fk.jpg
    logo_mask = np.array(Image.open(path.join(d, "CEVILOGO_schwarz.png")))

    stopwords = set(STOPWORDS)
    stopwords.add("said")

    wc = WordCloud(background_color="white", max_words=2000, mask=logo_mask,
                  stopwords=stopwords)

    # generate word cloud
    if text_input:
      wc.generate(text_input)
    else:
      wc.generate(text_input)

    # store to file
    filepath = "wordcloud.png"
    wc.to_file(path.join(d, filepath))
    # return send_file(filepath, as_attachment=True)
    return file

  except Exception as e:
    return make_response(jsonify({'message': 'error creating wordcloud.', 'error': str(e)}), 500)