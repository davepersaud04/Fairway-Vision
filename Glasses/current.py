import cv2
import base64
import time
from flask import Flask, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def connect():
    print('Client connected')

@socketio.on('disconnect')
def disconnect():
    print('Client disconnected')

@app.route('/testConn')
def test_connection():
    """Simple endpoint to verify server connection."""
    return jsonify({"status": "success","statusCode":"200", "message": "Flask server is running!"}), 200

def generate_frames():
    cap = cv2.VideoCapture(0)
    FRAME_WIDTH = 640
    FRAME_HEIGHT = 480
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, FRAME_WIDTH)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, FRAME_HEIGHT)
    FRAME_DELAY=1/100
    while True:
        success, frame = cap.read()
        if not success:
            break
        _, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 70])
        encoded_frame = base64.b64encode(buffer).decode('utf-8')
        socketio.emit('video_frame', {'data': encoded_frame})
        time.sleep(FRAME_DELAY)

if __name__ == '__main__':
    socketio.start_background_task(generate_frames)
    socketio.run(app, host='0.0.0.0', port=5000)