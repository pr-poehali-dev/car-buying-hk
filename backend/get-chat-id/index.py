import json
import urllib.request
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get Telegram Chat ID using bot token from query parameter
    Args: event with httpMethod and queryStringParameters
    Returns: HTML page with Chat IDs
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
            'body': ''
        }
    
    # Get bot token from query parameter
    params = event.get('queryStringParameters', {}) or {}
    bot_token = params.get('token', '')
    
    if not bot_token:
        html_response = """
<!DOCTYPE html>
<html>
<head>
    <title>🤖 Узнать Chat ID</title>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; }
        input { width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; box-sizing: border-box; }
        button { background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; width: 100%; }
        button:hover { background: #45a049; }
        .info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196F3; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🤖 Узнать Telegram Chat ID</h1>
        
        <div class="info">
            <strong>Инструкция:</strong>
            <ol>
                <li>Вставьте токен вашего бота ниже</li>
                <li>Убедитесь, что написали боту /start в Telegram</li>
                <li>Нажмите "Получить Chat ID"</li>
            </ol>
        </div>
        
        <form method="GET">
            <label><strong>Токен бота:</strong></label>
            <input type="text" name="token" placeholder="8395698194:AAHZhC9bBvq8TeYBRHaJJLS7P_keTU-o3Uc" required>
            <button type="submit">Получить Chat ID</button>
        </form>
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
    <title>❌ Ошибка</title>
    <meta charset="utf-8">
    <style>body {{ font-family: Arial, sans-serif; margin: 40px; }}</style>
</head>
<body>
    <h1>❌ Ошибка Telegram API</h1>
    <p><strong>Описание:</strong> {telegram_data.get('description', 'Неизвестная ошибка')}</p>
    <p>Проверьте правильность токена</p>
    <p><a href="?">← Назад</a></p>
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
    <title>✅ Chat ID найден!</title>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto; }
        .chat { background: #e8f5e9; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #4CAF50; }
        .chat-id { font-size: 28px; font-weight: bold; color: #2E7D32; margin-bottom: 10px; }
        .info { color: #555; margin: 5px 0; }
        .instruction { background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800; }
        .copy-btn { background: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-left: 10px; font-size: 16px; }
        .copy-btn:hover { background: #45a049; }
    </style>
</head>
<body>
    <div class="container">
        <h1>✅ Найденные Telegram чаты</h1>
"""
            for chat in chats:
                name = chat.get('first_name', '') + ' ' + chat.get('last_name', '')
                if chat.get('username'):
                    name = f"@{chat['username']}"
                elif chat.get('title'):
                    name = chat['title']
                
                html_response += f"""
        <div class="chat">
            <div class="chat-id">{chat['chat_id']} <button class="copy-btn" onclick="copyToClipboard('{chat['chat_id']}')">📋 Копировать</button></div>
            <div class="info"><strong>Тип:</strong> {chat['type']}</div>
            <div class="info"><strong>Имя:</strong> {name.strip() if name.strip() else 'Без имени'}</div>
        </div>
"""
            
            html_response += f"""
        <div class="instruction">
            <h3>📋 Что дальше?</h3>
            <ol>
                <li><strong>Скопируйте Chat ID</strong> выше (нажмите кнопку "Копировать")</li>
                <li><strong>Отправьте это число</strong> Юре в чат</li>
                <li>Юра добавит его в проект — всё заработает!</li>
            </ol>
            <p><strong>Найдено чатов:</strong> {len(chats)}</p>
        </div>
        
        <p><a href="?">← Проверить другой токен</a></p>
    </div>
    
    <script>
        function copyToClipboard(text) {{
            navigator.clipboard.writeText(text).then(function() {{
                alert('✅ Chat ID скопирован: ' + text);
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
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; }
        .warning { background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #ff9800; }
    </style>
</head>
<body>
    <div class="container">
        <h1>❌ Чаты не найдены</h1>
        <div class="warning">
            <h3>Что нужно сделать:</h3>
            <ol>
                <li><strong>Найдите вашего бота</strong> в Telegram (по username)</li>
                <li><strong>Напишите боту</strong> команду /start или любое сообщение</li>
                <li><strong>Обновите эту страницу</strong> (F5)</li>
            </ol>
            <p>Бот должен получить хотя бы одно сообщение от вас!</p>
        </div>
        <p><a href="?">← Назад</a></p>
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
    <meta charset="utf-8">
    <style>body {{ font-family: Arial, sans-serif; margin: 40px; }}</style>
</head>
<body>
    <h1>❌ Произошла ошибка</h1>
    <p><strong>Описание:</strong> {str(e)}</p>
    <p><a href="?">← Попробовать снова</a></p>
</body>
</html>"""
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'text/html; charset=utf-8'},
            'isBase64Encoded': False,
            'body': html_response
        }
