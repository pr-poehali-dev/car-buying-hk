import json
import os
import urllib.request
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Показывает Chat IDs для настройки Telegram бота
    Args: event - dict with httpMethod
          context - object with request_id
    Returns: HTML страница с Chat IDs
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    # Get Telegram bot token
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    
    if not bot_token:
        html_response = """
<!DOCTYPE html>
<html>
<head>
    <title>❌ Ошибка настройки</title>
    <style>body { font-family: Arial, sans-serif; margin: 40px; }</style>
</head>
<body>
    <h1>❌ TELEGRAM_BOT_TOKEN не настроен</h1>
    <p>Нужно сначала добавить токен бота в секреты проекта</p>
</body>
</html>"""
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'text/html; charset=utf-8'},
            'isBase64Encoded': False,
            'body': html_response
        }
    
    try:
        # Get updates from Telegram
        telegram_url = f"https://api.telegram.org/bot{bot_token}/getUpdates"
        
        with urllib.request.urlopen(telegram_url) as response:
            result = response.read().decode('utf-8')
            telegram_data = json.loads(result)
        
        if not telegram_data.get('ok'):
            html_response = f"""
<!DOCTYPE html>
<html>
<head>
    <title>❌ Ошибка Telegram</title>
    <style>body {{ font-family: Arial, sans-serif; margin: 40px; }}</style>
</head>
<body>
    <h1>❌ Ошибка Telegram API</h1>
    <p><strong>Описание:</strong> {telegram_data.get('description', 'Неизвестная ошибка')}</p>
    <p>Проверьте правильность токена бота</p>
</body>
</html>"""
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'text/html; charset=utf-8'},
                'isBase64Encoded': False,
                'body': html_response
            }
        
        updates = telegram_data.get('result', [])
        chats = []
        
        # Extract unique chats
        seen_chats = set()
        for update in updates:
            if 'message' in update and 'chat' in update['message']:
                chat = update['message']['chat']
                chat_id = chat['id']
                
                if chat_id not in seen_chats:
                    seen_chats.add(chat_id)
                    chats.append({
                        'chat_id': chat_id,
                        'type': chat.get('type', 'unknown'),
                        'title': chat.get('title', ''),
                        'username': chat.get('username', ''),
                        'first_name': chat.get('first_name', ''),
                        'last_name': chat.get('last_name', '')
                    })
        
        # Format response as HTML
        if chats:
            html_response = """
<!DOCTYPE html>
<html>
<head>
    <title>🤖 Telegram Chat IDs</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .chat { background: #e3f2fd; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #2196F3; }
        .chat-id { font-size: 20px; font-weight: bold; color: #1976D2; margin-bottom: 5px; }
        .info { color: #555; margin: 3px 0; }
        .instruction { background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800; }
        .copy-btn { background: #4CAF50; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-left: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🤖 Найденные Telegram чаты</h1>
        <p>Выберите нужный <strong>Chat ID</strong> и скопируйте его:</p>
"""
            for i, chat in enumerate(chats):
                name = chat.get('first_name', '') + ' ' + chat.get('last_name', '')
                if chat.get('username'):
                    name = f"@{chat['username']}"
                elif chat.get('title'):
                    name = chat['title']
                
                html_response += f"""
        <div class="chat">
            <div class="chat-id">Chat ID: {chat['chat_id']} <button class="copy-btn" onclick="copyToClipboard('{chat['chat_id']}')">Копировать</button></div>
            <div class="info">Тип: {chat['type']}</div>
            <div class="info">Имя: {name.strip() if name.strip() else 'Без имени'}</div>
        </div>
"""
            
            html_response += f"""
        <div class="instruction">
            <h3>📋 Инструкция:</h3>
            <ol>
                <li>Скопируйте Chat ID нужного чата (обычно это ваш личный чат)</li>
                <li>В проекте обновите секрет <strong>TELEGRAM_CHAT_ID</strong> этим значением</li>
                <li>После этого форма будет отправлять заявки в Telegram автоматически!</li>
            </ol>
            <p><strong>Всего найдено чатов:</strong> {len(chats)} | <strong>Сообщений:</strong> {len(updates)}</p>
        </div>
    </div>
    
    <script>
        function copyToClipboard(text) {{
            navigator.clipboard.writeText(text).then(function() {{
                alert('Chat ID скопирован: ' + text);
            }});
        }}
    </script>
</body>
</html>"""
        else:
            html_response = """
<!DOCTYPE html>
<html>
<head>
    <title>❌ Чаты не найдены</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .warning { background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #ff9800; }
    </style>
</head>
<body>
    <div class="container">
        <h1>❌ Чаты не найдены</h1>
        <div class="warning">
            <h3>Что нужно сделать:</h3>
            <ol>
                <li><strong>Найдите вашего Telegram бота</strong> (используйте токен из секретов)</li>
                <li><strong>Напишите боту</strong> команду /start или любое сообщение</li>
                <li><strong>Обновите эту страницу</strong></li>
            </ol>
            <p>Если у вас нет бота, создайте его через @BotFather в Telegram</p>
        </div>
    </div>
</body>
</html>"""
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'text/html; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': html_response
        }
        
    except Exception as e:
        html_response = f"""
<!DOCTYPE html>
<html>
<head>
    <title>❌ Ошибка</title>
    <style>body {{ font-family: Arial, sans-serif; margin: 40px; }}</style>
</head>
<body>
    <h1>❌ Произошла ошибка</h1>
    <p><strong>Описание:</strong> {str(e)}</p>
    <p>Попробуйте позже или проверьте настройки бота</p>
</body>
</html>"""
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'text/html; charset=utf-8'},
            'isBase64Encoded': False,
            'body': html_response
        }