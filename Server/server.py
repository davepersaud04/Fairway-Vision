from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

# Folder to save uploaded images
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_image():
    print("test")
    # Check if 'image' is part of the POST request
    if 'image' not in request.files:
        return jsonify({'error': 'No image file found'}), 400

    image = request.files['image']

    # If the user does not select a file
    if image.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    # Secure the filename and save it
    filename = secure_filename(image.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    image.save(filepath)

    # Do any additional processing here
    response = {
        'status': 'success',
        'filename': filename,
        'message': 'Image received successfully',
        'prediction': 'cat'  # just a dummy example
    }

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
