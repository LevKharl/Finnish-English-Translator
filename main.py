from flask import Flask, render_template, request, jsonify
from transformers import TranslationPipeline, MarianMTModel, MarianTokenizer

app = Flask(__name__)

model_name = 'Helsinki-NLP/opus-mt-en-fi'
model = MarianMTModel.from_pretrained(model_name)
tokenizer = MarianTokenizer.from_pretrained(model_name)
translation_pipeline = TranslationPipeline(model=model, tokenizer=tokenizer)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/translate', methods=['POST'])
def translate():
    text_to_translate = request.form['text_to_translate']

    translated_text = translation_pipeline(text_to_translate)[0]['translation_text']

    return jsonify({'translated_text': translated_text})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
