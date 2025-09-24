import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получает список чатов и chat_id для настройки Telegram бота
    Args: event - dict with httpMethod
          context - object with request_id
    Returns: HTTP response с списком чатов
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
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Get Telegram bot token
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    
    if not bot_token:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'TELEGRAM_BOT_TOKEN не настроен'})
        }
    
    try:
        # Get updates from Telegram
        telegram_url = f"https://api.telegram.org/bot{bot_token}/getUpdates"
        
        with urllib.request.urlopen(telegram_url) as response:
            result = response.read().decode('utf-8')
            telegram_data = json.loads(result)
        
        if not telegram_data.get('ok'):
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'error': 'Ошибка Telegram API',
                    'details': telegram_data.get('description', 'Неизвестная ошибка')
                })
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
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'chats': chats,
                'total_updates': len(updates),
                'message': 'Найдены чаты. Выберите нужный chat_id и добавьте в секреты проекта.'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': False,
                'error': f'Ошибка получения чатов: {str(e)}'
            })
        }