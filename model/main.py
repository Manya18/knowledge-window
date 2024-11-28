from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from llama_index.core import SimpleDirectoryReader
import os
from concurrent.futures import ThreadPoolExecutor
from flask_caching import Cache
from bs4 import BeautifulSoup
# from llama_index import VectorIndex

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


# def create_index_from_folder(folder_path):
#     documents = SimpleDirectoryReader(folder_path).load_data()
#     # Создание векторного индекса
#     index = VectorIndex.from_documents(documents)
#     return index


def generate_with_llama_parallel(prompt):
    url = 'http://localhost:11434/api/generate'
    headers = {'Content-Type': 'application/json'}
    data = {"model": "llama3.2", "prompt": prompt, "stream": False}

    with ThreadPoolExecutor() as executor:
        future = executor.submit(requests.post, url, json=data, headers=headers)
        response = future.result()

    if response.status_code == 200:
        response_data = response.json()
        return response_data.get('response', 'Ответ отсутствует в данных API') 
    else:
        return f"Ошибка: {response.status_code}, {response.text}"


# def generate_with_llama(prompt):
#     url = 'http://localhost:11434/api/generate'
#     headers = {'Content-Type': 'application/json'}
    
#     data = {
#         "model": "llama3.2",
#         "prompt": prompt,
#         "stream": False
#     }
    
#     try:
#         response = requests.post(url, json=data, headers=headers)
        
#         if response.status_code == 200:
#             response_data = response.json()
#             return response_data.get('response', 'Ответ отсутствует в данных API') 
#         else:
#             return f"Ошибка: {response.status_code}, {response.text}"
#     except requests.RequestException as e:
#         return f"Ошибка при запросе к LLaMA API: {e}"


# вернуть если что
@app.route('/api/query', methods=['OPTIONS', 'POST'])
def query_options():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response, 204
    
    if not request.is_json:
        return jsonify({"error": "Content-Type должен быть application/json"}), 415
    
    question = request.json.get('question')
    assistantName = request.json.get('assistantName')

    if not question:
        return jsonify({"error": "Вопрос не указан"}), 400
    
    folder_path = os.path.join('files', assistantName)
    if not os.path.exists(folder_path):
        return jsonify({"error": f"Папка {assistantName} не найдена"}), 404

    documents = SimpleDirectoryReader(folder_path).load_data()
    # documents = SimpleDirectoryReader('upload').load_data()
    full_text = "\n\n".join([doc.text for doc in documents])

    prompt = f"В тексте:\n{full_text}\n\nОтветьте на запрос: {question}"
    response = generate_with_llama_parallel(prompt)
    return jsonify({"response": response})
    
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

app.config['CACHE_TYPE'] = 'simple'
cache = Cache(app)

@cache.memoize(timeout=60) 
def generate_with_llama_cached(prompt):
    return generate_with_llama_parallel(prompt)


if __name__ == "__main__":
    app.run(debug=True)
